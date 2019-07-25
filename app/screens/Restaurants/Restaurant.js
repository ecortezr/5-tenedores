import React, { Component } from "react"
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList
} from "react-native"
import {
  Image,
  Icon,
  ListItem,
  Button,
  Text,
  Rating,
  Avatar
} from "react-native-elements"
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
      userReview: null,
      reviews: null,
      isLoading: true
    }
  }

  componentDidMount() {
    // Dispara la ejecución al iniciar. Se queda escuchando cambios en la autenticación
    this.checkLogin()
    this.checkAddReview()
    this.loadReviews()
  }

  checkLogin = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        login: user ? true : false
      })
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
        // console.log("userReview: ", userReview)
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
                id,
                loadReviews: this.loadReviews
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
        this.setState({
          userReview:
            querySnapshot.size > 0 ? querySnapshot.docs[0].data() : null
        })
      })
      .catch(error => {
        this.refs.toast.show(
          "Error comprobando las valoraciones del restaurant. Compruebe su conexión a internet y/o inténtelo más tarde",
          500,
          () => this.props.navigation.goBack()
        )
      })
  }

  loadReviews = async () => {
    const { restaurantId } = this.state
    let resultReviews = []
    await db
      .collection("reviews")
      .where("restaurantId", "==", restaurantId)
      .orderBy("createdAt", "desc")
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(review => resultReviews.push(review.data()))
          this.setState({
            reviews: resultReviews,
            startReview: querySnapshot.docs[querySnapshot.size - 1].data()
          })
        } else {
          this.setState({
            reviews: []
          })
        }
      })
      .catch(error => {
        console.log("Error cargando los reviews. Error: ", error)
        this.refs.toast.show(
          "Error cargando las valoraciones del restaurant. Compruebe su conexión a internet y/o inténtelo más tarde",
          1500
        )
      })
  }

  renderRow = reviewItem => {
    const {
      title,
      review,
      rating,
      uid,
      avatarUser,
      createdAt
    } = reviewItem.item
    const reviewDate = new Date(createdAt.seconds * 1000)
    const avatar =
      avatarUser || "https://api.adorable.io/avatars/285/abott@adorable.png"
    return (
      <View style={styles.viewReview}>
        <View style={styles.viewReviewImage}>
          <Avatar
            source={{
              uri: avatar
            }}
            size="large"
            rounded
            containerStyle="styles.imageAvatarUser"
          />
        </View>
        <View style={styles.viewReviewInfo}>
          <Text style={styles.reviewTitle}>{title}</Text>
          <Text style={styles.reviewDetails}>{review}</Text>
          <Rating readonly imageSize={15} startingValue={rating} />
          <Text style={styles.reviewDate}>
            {reviewDate.getDate()}/{reviewDate.getMonth() + 1}/
            {reviewDate.getFullYear()} - {reviewDate.getHours()}:
            {reviewDate.getMinutes()}
          </Text>
        </View>
      </View>
    )
  }

  renderFlatList = reviews => {
    if (reviews) {
      if (reviews.length === 0) {
        return (
          <View style={styles.loadingReviews}>
            <Text>No hay valoraciones para este restaurant</Text>
          </View>
        )
      } else {
        const { isLoading } = this.state
        return (
          <View>
            <Text style={styles.reviewsTitle}>Valoraciones</Text>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={reviews}
              renderItem={this.renderRow}
              onEndReachedThreshold={0}
              // onEndReached={this.handleLoadMore}
              // ListFooterComponent={() => this.renderFooter(isLoading)}
            />
          </View>
        )
      }
    } else {
      return (
        <View style={styles.loadingReviews}>
          <ActivityIndicator size="large" />
          <Text>Cargando valoraciones...</Text>
        </View>
      )
    }
  }

  /**
   * ES INNECESARIO, DADO A QUE SE IMPLEMENTÓ UNA RUTINA (MUY MALA, DEBIDO A QUE DEBIÓ HABER SIDO UNA TRANSACCIÓN)
   * PARA MANTENER LA MEDIA EN FIRESTORE
   */
  getMediaRating = () => {
    const { reviews } = this.state
    if (!reviews || reviews.length === 0) {
      return 0
    } else {
      return parseFloat(
        (
          this.state.reviews.reduce((a, b) => a + b.rating, 0) / reviews.length
        ).toFixed(2)
      )
    }
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
    const { reviews } = this.state
    return (
      <ScrollView style={styles.viewBody}>
        <View style={styles.viewImage}>
          <Image
            source={{ uri: image }}
            PlaceholderContent={<ActivityIndicator />}
            style={styles.restaurantImage}
          />
        </View>

        <View style={styles.viewBasicInfo}>
          <View style={styles.viewTitleRating}>
            <Text style={styles.restaurantName}>{name}</Text>
            <Rating
              imageSize={20}
              readonly
              // style={{ position: 'absolute', right: 0 }} También serviría para posicionarlo a la derecha
              startingValue={this.getMediaRating()}
            />
          </View>
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

        {this.renderFlatList(reviews)}

        <Toast
          ref="toast"
          position="bottom"
          positionValue={350}
          fadeInDuration={1000}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "#fff" }}
        />
      </ScrollView>
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
  },
  loadingReviews: {
    marginTop: 20,
    alignItems: "center"
  },
  viewReview: {
    flexDirection: "row",
    margin: 10,
    paddingBottom: 20,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1
  },
  viewReviewImage: {
    marginRight: 15
  },
  imageAvatarUser: {
    width: 50,
    height: 50
  },
  viewReviewInfo: {
    flex: 1,
    alignItems: "flex-start"
  },
  reviewTitle: {
    fontWeight: "bold"
  },
  reviewDetails: {
    paddingTop: 2,
    color: "grey",
    marginBottom: 5
  },
  reviewDate: {
    marginTop: 5,
    color: "grey",
    fontSize: 12
  },
  reviewsTitle: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 15,
    fontWeight: "bold"
  },
  viewTitleRating: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
})
