import React, { Component } from "react"
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView
} from "react-native"
import { Text, Card, Image, Rating } from "react-native-elements"
import Toast from "react-native-easy-toast"

import { firebaseApp } from "../utils/firebase"
import firebase from "firebase/app"
import "firebase/firestore"
const db = firebase.firestore(firebaseApp)

export default class Top5 extends Component {
  constructor() {
    super()

    this.state = {
      top5: null
    }
  }

  componentDidMount() {
    this.loadTop5()
  }

  loadTop5 = async () => {
    await db
      .collection("restaurants")
      .orderBy("ratingAvg", "desc")
      .limit(5)
      .get()
      .then(querySnapshot => {
        const top5 = []
        querySnapshot.forEach(restaurant =>
          top5.push({
            id: restaurant.id,
            ...restaurant.data()
          })
        )

        this.setState({
          top5
        })
      })
      .catch(error => {
        console.log("Error cargando el Top 5. Error: ", error)
        this.refs.toast.show(
          "Ocurrió un error, recuperando el Top 5. Por favor, inténtelo de nuevo",
          1500
        )
      })
  }

  restaurantDetails = restaurant => {
    this.props.navigation.navigate("Restaurant", {
      restaurant
    })
  }

  /*   renderRow = restaurant => {
    const {
      id,
      name,
      city,
      address,
      description,
      image,
      ratingAvg,
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
            <View style={styles.viewTitleRating}>
              <Text style={styles.restaurantName}>{name}</Text>
              <Rating
                imageSize={10}
                readonly
                // style={{ position: 'absolute', right: 0 }} También serviría para posicionarlo a la derecha
                startingValue={ratingAvg}
              />
            </View>

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
      return (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={restaurants}
          renderItem={this.renderRow}
        />
      )
    } else {
      return (
        <View style={styles.loadingRestaurants}>
          <ActivityIndicator size="large" />
          <Text>Cargando el Top 5...</Text>
        </View>
      )
    }
  }
 */
  renderRestaurants = restaurants => {
    if (restaurants) {
      return (
        <View>
          {restaurants.map((restaurant, idx) => (
            <Card key={idx}>
              <Image
                resizeMode="cover"
                source={{ uri: restaurant.image }}
                style={styles.imageRestaurant}
              />
              <View style={styles.viewTitleRating}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Rating
                  imageSize={20}
                  readonly
                  // style={{ position: 'absolute', right: 0 }} También serviría para posicionarlo a la derecha
                  startingValue={restaurant.ratingAvg}
                />
              </View>
              <Text style={styles.restaurantDescription}>
                {restaurant.description}
              </Text>
            </Card>
          ))}
        </View>
      )
    } else {
      return (
        <View style={styles.loadingRestaurants}>
          <ActivityIndicator size="large" />
          <Text>Cargando el Top 5...</Text>
        </View>
      )
    }
  }

  render() {
    const { top5 } = this.state
    return (
      <ScrollView style={styles.viewBody}>
        {this.renderRestaurants(top5)}
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
    width: "100%",
    height: 200
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: "bold"
  },
  restaurantLocation: {
    paddingTop: 2,
    color: "grey"
  },
  restaurantDescription: {
    paddingTop: 10,
    color: "grey",
    textAlign: "justify"
  },
  viewTitleRating: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10
  }
})
