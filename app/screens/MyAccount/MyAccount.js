import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";

export default class MyAccount extends Component {
  constructor() {
    super();

    this.state = {
      login: false
    };
  }

  async componentDidMount() {
    await firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({
          login: true
        });
      }
    });
  }

  goToScreen = nameScreen => {
    console.log(nameScreen);
    this.props.navigation.navigate(nameScreen);
  };

  render() {
    const { login } = this.state;
    if (login) {
      return (
        <View style={styles.viewBody}>
          <Text>Bienvenido...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.viewBody}>
          <Text>MyAccount Screen...</Text>
          <Button
            title="Registro"
            onPress={() => this.goToScreen("Register")}
          />
          <Button title="Login" onPress={() => this.goToScreen("Login")} />
        </View>
      );
    }
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
