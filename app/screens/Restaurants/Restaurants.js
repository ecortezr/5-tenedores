import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
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
      login: false,
      restaurants: [],
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
    console.log("this.state.restaurants: ", this.state.restaurants);
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

  render() {
    return (
      <View style={styles.viewBody}>
        <Text>Restaurantes Screen...</Text>
        {this.loadActionButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});
