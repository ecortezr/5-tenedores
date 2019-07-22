import React, { Component } from "react"
import { StyleSheet, View, Text, ActivityIndicator } from "react-native"
import { ListItem } from "react-native-elements"
// import * as firebase from "firebase";

import OverlayOneInput from "../../Elements/OverlayOneInput"
import OverlayTwoInputs from "../../Elements/OverlayTwoInputs"

export default class UpdateUserInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ...props,
      overlayComponent: null,
      menuItems: [
        {
          title: "Cambiar nombre de usuario",
          iconType: "material-community",
          iconNameRight: "chevron-right",
          iconColorRight: "#ccc",
          iconNameLeft: "account-circle",
          iconColorLeft: "#ccc",
          onPress: () =>
            this.openOverlay(
              "Nombre de usuario",
              this.updateUserDisplayName,
              props.userInfo.displayName
            )
        },
        {
          title: "Cambiar email",
          iconType: "material-community",
          iconNameRight: "chevron-right",
          iconColorRight: "#ccc",
          iconNameLeft: "at",
          iconColorLeft: "#ccc",
          onPress: () =>
            this.openOverlayTwo(
              "Nuevo email",
              "Contraseña",
              this.updateUserEmail,
              props.userInfo.email
            )
        },
        {
          title: "Cambiar contraseña",
          iconType: "material-community",
          iconNameRight: "chevron-right",
          iconColorRight: "#ccc",
          iconNameLeft: "lock-reset",
          iconColorLeft: "#ccc",
          onPress: () => console.log("Click en cambiar contraseña")
        }
      ]
    }
  }

  updateUserDisplayName = async newDisplayName => {
    if (newDisplayName) {
      this.state.updateUserDisplayName(newDisplayName)
    }
    this.setState({
      overlayComponent: null
    })
  }

  updateUserEmail = async (newEmail, password) => {
    const oldEmail = this.state.userInfo.email
    if (newEmail && oldEmail !== newEmail) {
      this.state.updateUserEmail(newEmail, password)
    }
    this.setState({
      overlayComponent: null
    })
  }

  componentDidMount = () => {
    // console.log("state en componentDidMount: ", this.state)
  }

  openOverlay = (placeholder, updateFunction, inputValue) => {
    this.setState({
      overlayComponent: (
        <OverlayOneInput
          placeholder={placeholder}
          updateFunction={updateFunction}
          inputValue={inputValue}
          isVisibleOverlay={true}
        />
      )
    })
  }

  openOverlayTwo = (
    placeholderOne,
    placeholderTwo,
    updateFunction,
    inputValue
  ) => {
    this.setState({
      overlayComponent: (
        <OverlayTwoInputs
          placeholderOne={placeholderOne}
          placeholderTwo={placeholderTwo}
          updateFunction={updateFunction}
          inputValueOne={inputValue}
          inputValueTwo=""
          havePassword={true}
          isVisibleOverlay={true}
        />
      )
    })
  }

  render() {
    const { menuItems, overlayComponent } = this.state
    return (
      <View style={styles.updateUserInfo}>
        {menuItems.map((item, idx) => (
          <ListItem
            key={idx}
            title={item.title}
            leftIcon={{
              type: item.iconType,
              name: item.iconNameLeft,
              color: item.iconColorLeft
            }}
            rightIcon={{
              type: item.iconType,
              name: item.iconNameRight,
              color: item.iconColorRight
            }}
            onPress={item.onPress}
            containerStyle={styles.contentContainerStyle}
          />
        ))}
        {overlayComponent}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  updateUserInfo: {},
  contentContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3d3"
  }
})
