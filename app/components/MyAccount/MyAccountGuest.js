import React, { Component } from "react"
import { StyleSheet, View, Text, ActivityIndicator } from "react-native"
import { Button, Image } from "react-native-elements"

export default class MyAccountGuest extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { goToScreen } = this.props
    return (
      <View style={styles.viewBody}>
        <Image
          source={require("../../../assets/img/image-my-account-guest-01.jpg")}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />
        <Text style={styles.title}>Consulta tu perfil de 5 tenedores</Text>
        <Text style={styles.description}>
          ¿Cómo describirías tu mejor restaurant? Busca y visualiza los mejores
          restaurantes de una forma sencilla. Vota por el que te ha gustado más
          y comenta cómo ha sido tu experiencia.
        </Text>
        <Button
          buttonStyle={styles.btnViewProfile}
          title="Ver Perfil"
          onPress={() => goToScreen("Login")}
        />
      </View>
    )
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
})
