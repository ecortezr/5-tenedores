import React, { Component } from "react"
import { StyleSheet, View, Text } from "react-native"
import ActionButton from "react-native-action-button"
import Icon from "react-native-vector-icons/Ionicons"

export default class Restaurants extends Component {
  render() {
    return (
      <View style={styles.viewBody}>
        <Text>Restaurantes Screen...</Text>
        <ActionButton
          buttonColor="#00a680"
          onPress={() => console.log("Agregar")}
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
    backgroundColor: "#fff"
  }
})
