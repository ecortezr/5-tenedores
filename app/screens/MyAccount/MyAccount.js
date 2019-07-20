import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as firebase from "firebase";
import MyUserAccount from "../../components/MyAccount/MyUserAccount";
import MyAccountGuest from "../../components/MyAccount/MyAccountGuest";

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
      } else {
        this.setState({
          login: false
        });
      }
    });
  }

  goToScreen = nameScreen => {
    console.log(nameScreen);
    this.props.navigation.navigate(nameScreen);
  };

  logout = async () => {
    await firebase.auth().signOut();
  };

  render() {
    const { login } = this.state;
    if (login) {
      return <MyUserAccount logout={this.logout} />; // Sistema de burbujeo (le envío la función, para que la pueda ejecutar dentro del componente)
      /* return <View style={styles.viewBody}>
          <Text>Bienvenido...</Text>
          <Button title="Cerrar Sesión" onPress={() => this.logout()} />
        </View> */
    } else {
      return <MyAccountGuest goToScreen={this.goToScreen} />; // Sistema de burbujeo (le envío la función, para que la pueda ejecutar dentro del componente)
      /* return (
        <View style={styles.viewBody}>
          <Text>MyAccount Screen...</Text>
          <Button
            title="Registro"
            onPress={() => this.goToScreen("Register")}
          />
          <Button title="Login" onPress={() => this.goToScreen("Login")} />
        </View>
      ); */
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
