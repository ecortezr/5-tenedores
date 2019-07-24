import React, { Component } from "react"
import { StyleSheet, View, ActivityIndicator } from "react-native"
import { Icon, Image, Button, Text, Overlay } from "react-native-elements"
import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"
import Toast from "react-native-easy-toast"

import { uploadImage } from "../../utils/UploadImage"
import { firebaseApp } from "../../utils/firebase"
import firebase from "firebase/app"
import "firebase/firestore"
const db = firebase.firestore(firebaseApp)

import t from "tcomb-form-native"
import {
  AddRestaurantOptions,
  AddRestaurantStruct
} from "../../forms/AddRestaurantForm"
const Form = t.form.Form

export default class AddRestaurant extends Component {
  constructor(props) {
    super(props)

    // this.props.navigation.state.params (Contiene todos los parámetros que se pasaron, al llamar a la screen)

    this.state = {
      loading: false,
      imageUriRestaurant: null,
      // Es opcional establecerle valores a cada campo. Puede ser un objeto vacío
      formData: {
        name: "",
        city: "",
        address: "",
        description: ""
      }
    }
  }

  imageRestaurant = image => {
    if (image) {
      return (
        <Image source={{ uri: image }} style={{ width: 500, height: 200 }} />
      )
    } else {
      return (
        <Image
          source={require("../../../assets/img/no-image.png")}
          style={{ width: 500, height: 200 }}
        />
      )
    }
  }

  uploadImage = async () => {
    console.log("Subiendo imagen...")
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    )
    if (resultPermissions.status === "denied") {
      this.refs.toast.show("No ha dado permiso, para acceder a la galería", 500)
    } else {
      // Pedir que selecione una  imagen
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      })
      if (result.cancelled) {
        this.refs.toast.show(
          "No ha seleccionado ninguna imagen de la galería",
          500
        )
      } else {
        // Subir la imagen
        console.log("result: ", result)
        this.setState({
          imageUriRestaurant: result.uri
        })
      }
    }
  }

  onChangeForm = formData => {
    this.setState({
      formData
    })
  }

  addRestaurant = async () => {
    console.log("this.state: ", this.state)
    const { imageUriRestaurant } = this.state
    const { name, city, address, description } = this.state.formData

    if (!imageUriRestaurant || !name || !city || !address) {
      this.refs.toast.show(
        "Los datos deben estar completos, incluyendo la imagen",
        500
      )
    } else {
      this.setState({
        loading: true
      })
      // Sube los datos a Firestore
      const data = {
        name,
        city,
        address,
        description,
        image: "",
        createdAt: new Date()
      }
      db.collection("restaurants")
        .add(data)
        .then(async docRef => {
          const restaurantId = docRef.id
          const imageURL = await uploadImage(
            imageUriRestaurant,
            restaurantId,
            "restaurants"
          ).catch(error => {
            console.log("Error: ", error)
            this.setState({
              loading: false
            })
            this.refs.toast.show(
              "No se ha podido cargar la imagen del restaurant. Compruebe su conexión a internet y/o inténtelo más tarde",
              500
            )

            return
          })
          db.collection("restaurants")
            .doc(restaurantId)
            .update({
              image: imageURL
            })
            .then(() => {
              this.setState({
                loading: false
              })
              this.refs.toast.show(
                "¡Restaurant agregado, exitosamente!",
                1000,
                () => {
                  // Ejecuta la función que carga los restaurants, al agregar uno nuevo
                  this.props.navigation.state.params.loadRestaurants()
                  this.props.navigation.goBack()
                }
              )
            })
            .catch(error => {
              this.setState({
                loading: false
              })
              this.refs.toast.show(
                "No fue posible incorporar la imagen al restaurant",
                500
              )
            })
        })
        .catch(err => {
          this.setState({
            loading: false
          })
          this.refs.toast.show(
            "Error agregando el restaurant. Compruebe su conexión a internet y/o inténtelo más tarde",
            500
          )
        })
    }
  }

  render() {
    const { loading, imageUriRestaurant } = this.state
    return (
      <View style={styles.viewBody}>
        <View style={styles.viewPhoto}>
          {this.imageRestaurant(imageUriRestaurant)}
        </View>
        <View>
          <Form
            ref="addRestaurantForm"
            type={AddRestaurantStruct}
            options={AddRestaurantOptions}
            value={this.state.formData}
            onChange={values => this.onChangeForm(values)}
          />
        </View>
        <View style={styles.viewIconUploadPhoto}>
          <Icon
            name="camera"
            type="material-community"
            color="#7a7a7a"
            iconStyle={styles.addPhotoIcon}
            onPress={() => this.uploadImage()}
          />
        </View>
        <View style={styles.viewBtnAdd}>
          <Button
            title="Agregar Restaurant"
            onPress={() => this.addRestaurant()}
            buttonStyle={styles.btnAdd}
          />
        </View>
        <Overlay
          overlayStyle={styles.overlayLoading}
          isVisible={loading}
          width="auto"
          height="auto"
        >
          <View>
            <Text style={styles.overlayLoadingText}>Creando restaurant...</Text>
            <ActivityIndicator size="large" color="#00a680" />
          </View>
        </Overlay>
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
  viewBody: {
    flex: 1
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 10
  },
  viewIconUploadPhoto: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 12
  },
  addPhotoIcon: {
    backgroundColor: "#e3e3e3",
    padding: 17,
    paddingBottom: 14,
    margin: 0
  },
  viewBtnAdd: {
    flex: 1,
    justifyContent: "flex-end"
  },
  btnAdd: {
    backgroundColor: "#00a680",
    margin: 10
  },
  overlayLoading: {
    padding: 20
  },
  overlayLoadingText: {
    color: "#00a680",
    marginBottom: 20,
    fontSize: 20
  }
})
