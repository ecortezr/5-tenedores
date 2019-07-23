import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class Restaurant extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      name,
      city,
      address,
      description,
      image,
      createdAt
    } = this.props.navigation.state.params.restaurant.item;
    return (
      <View style={styles.viewBody}>
        <Text>Restaurante: {name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  }
});
