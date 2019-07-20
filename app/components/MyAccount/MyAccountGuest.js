import React, { Component } from "react";
import { StyleSheet, View, Text, Activityindicator } from "react-native";
import { Button, Image } from "react-native-elements";

export default class MyAccountGuest extends Component {
  render() {
    return (
      <View style={styles.viewBody}>
        <Text>My account guest</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
