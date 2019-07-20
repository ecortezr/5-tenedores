import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Button, Image } from "react-native-elements";

export default class MyUserAccount extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { logout } = this.props;
    return (
      <View style={styles.viewBody}>
        <Image
          source={require("../../../assets/img/image-my-account-guest-01.jpg")}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />
        <Text style={styles.description}>¡Bienvenido!</Text>
        <Button
          buttonStyle={styles.btnViewProfile}
          title="Cerrar Sesión"
          onPress={() => logout()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30
  },
  image: {
    height: 300,
    marginBottom: 40
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10
  },
  description: {
    textAlign: "center"
  },
  btnViewProfile: {
    width: "100%",
    backgroundColor: "#00a680",
    marginTop: 20
  }
});
