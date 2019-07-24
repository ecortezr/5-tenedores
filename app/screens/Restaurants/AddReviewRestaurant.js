import React, { Component } from "react"
import { StyleSheet, View, Text } from "react-native"

export default class AddReviewRestaurant extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { id, name } = this.props.navigation.state.params
    return (
      <View style={styles.viewBody}>
        <View>
          <Text>Add review...</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  }
})
