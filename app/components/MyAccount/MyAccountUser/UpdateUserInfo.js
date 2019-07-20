import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { ListItem } from "react-native-elements";
// import * as firebase from "firebase";

import Menu from "./menuConfig";
import OverlayOneInput from "../../Elements/OverlayOneInput";

export default class UpdateUserInfo extends Component {
  constructor() {
    super();

    /* this.state = {
      menuItems: [
        {
          title: "Cambiar nombre de usuario",
          iconType: "material-community",
          iconNameRight: "chevron-right",
          iconColorRight: "#ccc",
          iconNameLeft: "account-circle",
          iconColorLeft: "#ccc",
          onPress: () => console.log("Click en cambiar nombre de usuario")
        },
        {
          title: "Cambiar email",
          iconType: "material-community",
          iconNameRight: "chevron-right",
          iconColorRight: "#ccc",
          iconNameLeft: "at",
          iconColorLeft: "#ccc",
          onPress: () => console.log("Click en cambiar email")
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
    }; */
  }

  componentDidMount = () => {};

  render() {
    // const { menuItems } = this.state;
    return (
      <View style={styles.updateUserInfo}>
        {Menu.map((item, idx) => (
          // <Text key={idx}>{item.title}</Text>
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
        <OverlayOneInput />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  updateUserInfo: {},
  contentContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3d3"
  }
});
