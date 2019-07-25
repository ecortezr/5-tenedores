import React, { Component } from "react"
import { StyleSheet, View, Text } from "react-native"
import { SearchBar } from "react-native-elements"

export default class Search extends Component {
  constructor() {
    super()

    this.state = {
      search: ""
    }
  }

  searchRestaurants = search => {
    this.setState({
      search
    })
  }

  render() {
    const { search } = this.state
    return (
      <View style={styles.viewBody}>
        <SearchBar
          placeholder="Buscar restaurants..."
          onChangeText={value => this.searchRestaurants(value)}
          value={search}
          containerStyle={styles.searchBar}
          lightTheme={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  searchBar: {
    marginBottom: 20
  }
})
