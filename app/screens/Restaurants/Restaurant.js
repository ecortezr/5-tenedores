import React, { Component } from "react"
import { StyleSheet, View, Text, ActivityIndicator } from "react-native"
import { Image, Icon, ListItem, Button } from "react-native-elements"
import Toast from "react-native-easy-toast"

import { firebaseApp } from "../../utils/firebase"
import firebase from "firebase/app"
import "firebase/firestore"
const db = firebase.firestore(firebaseApp)

export default class Restaurant extends Component {
  constructor(props) {
    super(props)

    this.state = {
      restaurantId: this.props.navigation.state.params.restaurant.item.id,
      login: false,
      userReview: null
    }
  }

  componentDidMount() {
    // Dispara la ejecución al iniciar. Se queda escuchando cambios en la autenticación
    this.checkLogin()
    this.checkAddReview()
  }

  checkLogin = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          login: true,
          uid: user.uid
        })
      } else {
        this.setState({
          login: false,
          uid: null
        })
      }
    })
  }

  loadReviewButton = () => {
    const { login, userReview } = this.state
    if (login) {
      if (userReview) {
        /**
         * Con la información de userReview se pudiese mostrar la revisión que hizo el usuario,
         * en su momento e inclusive, darle la oportunidad de editarla o eliminarla
         */
        console.log("userReview: ", userReview)
        return <Text>Ya has emitido una valoración para este restaurant</Text>
      } else {
        const { id, name } = this.props.navigation.state.params.restaurant.item
        return (
          <Button
            title="Agregar Valoración"
            buttonStyle={styles.btnAddReview}
            onPress={() =>
              this.props.navigation.navigate("AddReviewRestaurant", {
                name,
                id
              })
            }
          />
        )
      }
    } else {
      return (
        <Text>
          Para realizar una valoración, debes{" "}
          <Text
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            Iniciar Sesión
          </Text>
        </Text>
      )
    }
  }

  /* goToScreenAddReview = () => {
    this.checkAddReview().then(result => {
      doReview = result
    })
  } */

  checkAddReview = async () => {
    const { restaurantId } = this.state
    const uid = await firebase.auth().currentUser.uid
    console.log("uid y restaurantId: ", uid, restaurantId)

    let result = false
    db.collection("reviews")
      .where("uid", "==", uid)
      .where("restaurantId", "==", restaurantId)
      .get()
      .then(querySnapshot => {
        console.log("querySnapshot.size > 0", querySnapshot.size > 0)
        this.setState({
          userReview:
            querySnapshot.size > 0 ? querySnapshot.docs[0].data() : null
        })
        // result = querySnapshot.size > 0
      })
      .catch(error => {
        this.refs.toast.show(
          "Error comprobando las valoraciones del restaurant. Compruebe su conexión a internet y/o inténtelo más tarde",
          500
        )
      })
    /* console.log("result: ", result)
    return result */
  }

  render() {
    const {
      id,
      name,
      city,
      address,
      description,
      image,
      createdAt
    } = this.props.navigation.state.params.restaurant.item
    const listExtraInfo = [
      {
        text: `${city}, ${address}`,
        iconName: "map-marker",
        iconType: "material-community",
        action: null
      }
    ]
    return (
      <View style={styles.viewBody}>
        <View style={styles.viewImage}>
          <Image
            source={{ uri: image }}
            PlaceholderContent={<ActivityIndicator />}
            style={styles.restaurantImage}
          />
        </View>

        <View style={styles.viewBasicInfo}>
          <Text style={styles.restaurantName}>{name}</Text>
          <Text style={styles.restaurantDescription}>{description}</Text>
        </View>

        <View style={styles.viewLocation}>
          <Text style={styles.restaurantLocation}>
            Ubicación del Restaurant
          </Text>
          {listExtraInfo.map((item, idx) => (
            <ListItem
              key={idx}
              title={item.text}
              leftIcon={<Icon name={item.iconName} type={item.iconType} />}
            />
          ))}
        </View>
        <View style={styles.viewBtnReview}>{this.loadReviewButton()}</View>
        <Toast
          ref="toast"
          position="bottom"
          positionValue={350}
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
  viewImage: {
    width: "100%"
  },
  restaurantImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover"
  },
  viewBasicInfo: {
    margin: 15
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: "bold"
  },
  restaurantDescription: {
    marginTop: 5,
    color: "grey"
  },
  viewLocation: {
    margin: 15,
    marginTop: 25
  },
  restaurantLocation: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10
  },
  viewBtnReview: {
    margin: 20
  },
  btnAddReview: {
    backgroundColor: "#00a680"
  },
  loginText: {
    color: "#00a680",
    fontWeight: "bold"
  }
})
