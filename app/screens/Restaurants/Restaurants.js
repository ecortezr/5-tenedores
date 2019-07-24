import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native"
import { Image } from "react-native-elements"
import Toast from "react-native-easy-toast"
import ActionButton from "react-native-action-button"

import { firebaseApp } from "../../utils/firebase"
import firebase from "firebase/app"
import "firebase/firestore"

const db = firebase.firestore(firebaseApp)

export default class Restaurants extends Component {
  constructor() {
    super()

    this.state = {
      isLoading: true,
      login: false,
      restaurants: null,
      startRestaurants: 0,
      limitRestaurants: 5
    }
  }

  componentDidMount() {
    this.checkLogin()
    this.loadRestaurants()
  }

  checkLogin = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          login: true
        })
      } else {
        this.setState({
          login: false
        })
      }
    })
  }

  loadRestaurants = async () => {
    const { limitRestaurants } = this.state

    const resultRestaurants = []
    const restaurantsRef = db
      .collection("restaurants")
      .orderBy("createdAt", "desc")
      .limit(limitRestaurants)
    await restaurantsRef.get().then(snapshot => {
      this.setState({
        startRestaurants: snapshot.docs[snapshot.docs.length - 1]
      })

      snapshot.forEach(doc => {
        resultRestaurants.push({
          id: doc.id,
          ...doc.data()
        })
      })
    })
    this.setState({
      restaurants: resultRestaurants
    })
  }

  loadActionButton = () => {
    const { login } = this.state
    if (login) {
      return (
        <ActionButton
          buttonColor="#00a680"
          onPress={() =>
            this.props.navigation.navigate("AddRestaurant", {
              loadRestaurants: this.loadRestaurants
            })
          }
        />
      )
    }
  }

  restaurantDetails = restaurant => {
    this.props.navigation.navigate("Restaurant", {
      restaurant
    })
  }

  handleLoadMore = async () => {
    console.log("Cargando más...")
    const { restaurants, limitRestaurants, startRestaurants } = this.state
    let resultRestaurants = [...restaurants]
    console.log("resultRestaurants: ", resultRestaurants)
    const restaurantsRef = db
      .collection("restaurants")
      .orderBy("createdAt", "desc")
      .startAfter(startRestaurants.data().createdAt)
      .limit(limitRestaurants)
    await restaurantsRef
      .get()
      .then(snapshot => {
        console.log("snapshot.size: ", snapshot.size)
        if (snapshot.size > 0) {
          snapshot.forEach(doc => {
            resultRestaurants.push({
              id: doc.id,
              ...doc.data()
            })
          })
          this.setState({
            startRestaurants: snapshot.docs[snapshot.docs.length - 1],
            restaurants: resultRestaurants
          })
        } else {
          this.setState({
            isLoading: false
          })
        }
        console.log("this.state.isLoading: ", this.state.isLoading)
      })
      .catch(error => {
        console.log("Error recargando en el loading infinito: ", error)
        this.refs.toast.show(
          "Error cargando más restaurants. Inténtelo de nuevo",
          1000
        )
      })
  }

  renderFooter = isLoading => {
    console.log("isLoading en renderFooter: ", isLoading)
    if (isLoading) {
      return (
        <View style={styles.loaderRestaurants}>
          <ActivityIndicator size="large" />
        </View>
      )
    } else {
      return (
        <View style={styles.noMoreRestaurants}>
          <Text>¡No quedan restaurantes por cargar!</Text>
        </View>
      )
    }
  }

  renderRow = restaurant => {
    const {
      id,
      name,
      city,
      address,
      description,
      image,
      createdAt
    } = restaurant.item
    return (
      <TouchableOpacity onPress={() => this.restaurantDetails(restaurant)}>
        <View style={styles.viewRestaurant}>
          <View style={styles.viewImageRestaurant}>
            <Image
              resizeMode="cover"
              source={{ uri: image }}
              style={styles.imageRestaurant}
            />
          </View>
          <View>
            <Text style={styles.restaurantName}>{name}</Text>
            <Text style={styles.restaurantLocation}>
              {city}, {address}
            </Text>
            <Text style={styles.restaurantDescription}>
              {description.substr(0, 60)}...
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderFlatList = restaurants => {
    if (restaurants) {
      const { isLoading } = this.state
      return (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={restaurants}
          renderItem={this.renderRow}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
          ListFooterComponent={() => this.renderFooter(isLoading)}
        />
      )
    } else {
      return (
        <View style={styles.loadingRestaurants}>
          <ActivityIndicator size="large" />
          <Text>Cargando restaurants...</Text>
        </View>
      )
    }
  }

  render() {
    const { restaurants } = this.state
    return (
      <View style={styles.viewBody}>
        {this.renderFlatList(restaurants)}
        {this.loadActionButton()}
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
  loadingRestaurants: {
    marginTop: 20,
    alignItems: "center"
  },
  viewRestaurant: {
    flexDirection: "row",
    margin: 10
  },
  viewImageRestaurant: {
    marginRight: 15
  },
  imageRestaurant: {
    width: 80,
    height: 80
  },
  restaurantName: {
    fontWeight: "bold"
  },
  restaurantLocation: {
    paddingTop: 2,
    color: "grey"
  },
  restaurantDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300
  },
  loaderRestaurants: {
    marginVertical: 10
  },
  noMoreRestaurants: {
    marginVertical: 10,
    alignItems: "center"
  }
})
