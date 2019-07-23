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
          buttonStyle={styles.btnCloseSession}
          titleStyle={styles.btnCloseSessionText}
          title="Cerrar Sesión"
          onPress={() => logout()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewBody: {
    backgroundColor: "#f2f2f2",
    height: "100%"
  },
  btnCloseSession: {
    borderRadius: 0,
    backgroundColor: "#fff",
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    paddingVertical: 10
  },
  btnCloseSessionText: {
    color: "#00a680"
  }
})
