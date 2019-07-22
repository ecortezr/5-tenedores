import React, { Component } from "react"
import { StyleSheet, View, Text, ActivityIndicator } from "react-native"
import { Button, Image } from "react-native-elements"

import UserInfo from "./UserInfo"

export default class MyAccountUser extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { logout } = this.props
    return (
      <View style={styles.viewBody}>
        <UserInfo />
        <Button
          buttonStyle={styles.btnViewProfile}
          title="Cerrar Sesión"
          onPress={() => logout()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btnViewProfile: {
    width: "100%",
    backgroundColor: "#00a680",
    marginTop: 20
  }
})
