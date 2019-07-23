import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

import * as firebase from "firebase";

export default class Restaurants extends Component {
  constructor() {
    super();

    this.state = {
      login: false
    };
  }

  componentDidMount() {
    this.checkLogin();
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
    console.log("goToScreen");
    this.props.navigation.navigate(nameScreen);
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
