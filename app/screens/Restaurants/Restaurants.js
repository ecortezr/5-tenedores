import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator
} from "react-native";
import { Image } from "react-native-elements";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default class Restaurants extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      login: false,
      restaurants: null,
      startRestaurants: 0,
      limitRestaurants: 5
    };
  }

  componentDidMount() {
    this.checkLogin();
    this.loadRestaurants();
  }

  checkLogin = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          login: true
        });
      } else {
        this.setState({
          login: false
        });
      }
    });
  };

  goToScreen = nameScreen => {
    this.props.navigation.navigate(nameScreen);
  };

  loadRestaurants = async () => {
    const { limitRestaurants } = this.state;

    const resultRestaurants = [];
    const restaurantsRef = db
      .collection("restaurants")
      .orderBy("createdAt", "desc")
      .limit(limitRestaurants);
    await restaurantsRef.get().then(snapshot => {
      this.setState({
        startRestaurants: snapshot.docs[snapshot.docs.length - 1]
      });

      snapshot.forEach(doc => {
        resultRestaurants.push({
          id: doc.id,
          ...doc.data()
        });
      });
    });
    this.setState({
      restaurants: resultRestaurants
    });
  };

  loadActionButton = () => {
    const { login } = this.state;
    if (login) {
      return (
        <ActionButton
          buttonColor="#00a680"
          onPress={() => this.goToScreen("AddRestaurant")}
        />
      );
    }
  };

  renderRow = restaurants => {
    console.log("restaurants.item: ", restaurants.item);
    const {
      name,
      city,
      address,
      description,
      image,
      createdAt
    } = restaurants.item;
    return (
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
    );
  };

  renderFlatList = restaurants => {
    if (restaurants) {
      return (
        <FlatList
          keyExtractor={(iten, index) => index.toString()}
          data={restaurants}
          renderItem={this.renderRow}
        />
      );
    } else {
      return (
        <View style={styles.loadingRestaurants}>
          <ActivityIndicator size="large" />
          <Text>Cargando restaurants...</Text>
        </View>
      );
    }
  };

  render() {
    const { restaurants, isLoading } = this.state;
    return (
      <View style={styles.viewBody}>
        {this.renderFlatList(restaurants)}
        {this.loadActionButton()}
      </View>
    );
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
  }
});
