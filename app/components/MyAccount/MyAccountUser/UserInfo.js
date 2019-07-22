import React, { Component } from "react"
import { StyleSheet, View, Text, ActivityIndicator } from "react-native"
import { Avatar } from "react-native-elements"
import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"
import Toast from "react-native-easy-toast"
import * as firebase from "firebase"

import UpdateUserInfo from "./UpdateUserInfo"

export default class UserInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInfo: {}
    }
  }

  componentDidMount = () => {
    this.getUserInfo()
  }

  getUserInfo = async () => {
    const user = await firebase.auth().currentUser
    // console.log("user: ", user);
    user.providerData.forEach(userInfo => {
      this.setState({
        userInfo
      })
    })
  }

  reAuthenticate = async currentPassword => {
    const user = await firebase.auth().currentUser
    const credentials = await firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    )

    return user.reauthenticateWithCredential(credentials)
  }

  updateUserDisplayName = async newDisplayName => {
    console.log("newDisplayName: ", newDisplayName)
    await firebase.auth().currentUser.updateProfile({
      displayName: newDisplayName
    })

    this.getUserInfo()
  }

  updateUserEmail = (newEmail, password) => {
    console.log("newEmail: ", newEmail)
    console.log("password: ", password)
    this.reAuthenticate(password)
      .then(() => {
        firebase
          .auth()
          .currentUser.updateEmail(newEmail)
          .then(() => {
            console.log("Email cambiado")
            this.refs.toast.show(
              "Email cambiado. Vuelva a iniciar sesión",
              1000,
              () => {
                // Se desloguea
                firebase.auth().signOut()
              }
            )

            // Con esto, deberían actualizarse los datos Y re-dibujarse el UpdateUserInfo (NO lo está haciendo)
            // this.getUserInfo()
          })
          .catch(error => {
            console.log("Error intentando cambiar el email: ", error)
            this.refs.toast.show("Error intentando cambiar el email", 1500)
          })
      })
      .catch(error => {
        console.log("Password incorrecto")
        this.refs.toast.show("Password incorrecto", 1500)
      })
  }

  updateUserAvatar = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    )
    console.log("resultPermissions: ", resultPermissions)
    if (resultPermissions.status === "denied") {
      this.refs.toast.show(
        "Debe concederle el permiso a la app, para poder acceder a su galería de imágenes",
        1500
      )
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      })
      console.log("result: ", result)
      if (result.cancelled) {
        this.refs.toast.show("No se ha seleccionado ninguna imagen", 1500)
      } else {
        // Se sube la imagen a firebase (storage)
        const { uid } = this.state.userInfo
        this.uploadImage(result.uri, uid)
          .then(async resolve => {
            const ref = firebase
              .storage()
              .ref()
              .child("avatar/")
            const uploaded = await ref.put(resolve)
            console.log("uploaded: ", uploaded)

            firebase
              .storage()
              .ref("avatar/" + uid)
              .getDownloadURL()
              .then(async url => {
                await firebase.auth().currentUser.updateProfile({
                  photoURL: url
                })

                this.getUserInfo()
              })
              .catch(error => {
                this.refs.toast.show(
                  "Ha ocurrido un error, al intentar recuperar el avatar, desde el servidor",
                  1500
                )
              })
            this.refs.toast.show("Avatar actualizado, correctamente", 1500)
          })
          .catch(error => {
            this.refs.toast.show(
              "Error subiendo la imagen al servidor. Inténtelo luego",
              1500
            )
          })
      }
    }
  }

  uploadImage = async (uri, nameImage) => {
    console.log(`uri: ${uri} nameImage: ${nameImage}`)
    // con un return fetch(uri) sería más que suficiente, pero expo tiene un bug
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.onerror = reject
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response)
        }
      }

      xhr.open("GET", uri)
      xhr.responseType = "blob"
      xhr.send()
    })
  }

  returnUpdateUserInfoComponent = userInfoData => {
    if (userInfoData.hasOwnProperty("uid")) {
      return (
        <UpdateUserInfo
          userInfo={userInfoData}
          updateUserDisplayName={this.updateUserDisplayName}
          updateUserEmail={this.updateUserEmail}
        />
      )
    }
  }

  render() {
    const { displayName, email, photoURL } = this.state.userInfo
    const avatar =
      photoURL || "https://api.adorable.io/avatars/285/abott@adorable.png"
    return (
      <View>
        <View style={styles.viewUserInfo}>
          <Avatar
            rounded
            size="large"
            source={{
              uri: avatar
            }}
            containerStyle={styles.userInfoAvatar}
            showEditButton
            onEditPress={() => this.updateUserAvatar()}
          />
          <View>
            <Text style={styles.displayName}>{displayName}</Text>
            <Text>{email}</Text>
          </View>
        </View>
        {this.returnUpdateUserInfoComponent(this.state.userInfo)}
        <Toast
          ref="toast"
          position="bottom"
          positionValue={250}
          fadeInDuration={1000}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "#fff" }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewUserInfo: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    paddingVertical: 30
    // justifyContent: "center",
    // paddingHorizontal: 30
  },
  userInfoAvatar: {
    marginRight: 20
  },
  displayName: {
    fontWeight: "bold"
  }
})
