import React, { Component } from "react"
import { StyleSheet, View, Text, ActivityIndicator } from "react-native"
import { ListItem } from "react-native-elements"
import Toast from "react-native-easy-toast"

import OverlayOneInput from "../../Elements/OverlayOneInput"
import OverlayTwoInputs from "../../Elements/OverlayTwoInputs"
import OverlayThreeInputs from "../../Elements/OverlayThreeInputs"

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
          onPress: () =>
            this.openOverlayThree(
              "Contraseña actual",
              "Nueva contraseña",
              "Repita la contraseña",
              this.updateUserPassword
            )
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

  updateUserPassword = async (
    oldPassword,
    newPassword,
    newPasswordConfirmation
  ) => {
    console.log(
      "Passwords: ",
      oldPassword,
      newPassword,
      newPasswordConfirmation
    )
    if (!oldPassword || !newPassword || !newPasswordConfirmation) {
      this.refs.toast.show("Debe incluir todos los valores", 300)
    } else if (newPassword !== newPasswordConfirmation) {
      this.refs.toast.show("Las contraseñas no coinciden", 300)
    } else if (oldPassword === newPassword) {
      this.refs.toast.show(
        "La nueva contraseña no puede ser la misma que la actual",
        300
      )
    } else {
      this.state.updateUserPassword(oldPassword, newPassword)
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

  openOverlayThree = (
    placeholderOne,
    placeholderTwo,
    placeholderThree,
    updateFunction
  ) => {
    this.setState({
      overlayComponent: (
        <OverlayThreeInputs
          placeholderOne={placeholderOne}
          placeholderTwo={placeholderTwo}
          placeholderThree={placeholderThree}
          updateFunction={updateFunction}
          inputValueOne=""
          inputValueTwo=""
          inputValueThree=""
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
        <Toast
          ref="toast"
          position="center"
          positionValue={0}
          fadeInDuration={1000}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "#fff" }}
        />
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
