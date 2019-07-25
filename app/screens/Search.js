import React, { Component } from "react"
import { StyleSheet, View, ActivityIndicator, ScrollView } from "react-native"
import {
  SearchBar,
  Text,
  ListItem,
  Icon,
  TouchableOpacity
} from "react-native-elements"

import { firebaseApp } from "../utils/firebase"
import firebase from "firebase/app"
import "firebase/firestore"
const db = firebase.firestore(firebaseApp)

import { FireSQL } from "firesql"
const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" })

export default class Search extends Component {
  constructor() {
    super()

    this.state = {
      search: "",
      searchResults: null
    }
  }

  searchRestaurants = async search => {
    this.setState({
      search
    })
    // Buscar en Firestore, usando Firesql
    const restaurantQuery = fireSQL.query(`
    select *
    from restaurants
    WHERE name LIKE '${search}%'
    `)

    let results = []
    await restaurantQuery
      .then(queryResults => {
        results = queryResults
      })
      .catch(err => {})
    this.setState({
      searchResults: results
    })
  }

  restaurantDetails = restaurant => {
    this.props.navigation.navigate("Restaurant", {
      restaurant: { item: restaurant }
    })
  }

  renderListRestaurants = restaurants => {
    if (restaurants && restaurants.length > 0) {
      return (
        <View style={styles.noSearch}>
          {restaurants.map((restaurant, idx) => (
            <ListItem
              key={idx}
              title={restaurant.name}
              leftAvatar={{ source: { uri: restaurant.image } }}
              rightIcon={
                <Icon type="material-community" name="chevron-right" />
              }
              onPress={() => this.restaurantDetails(restaurant)}
            />
          ))}
        </View>
      )
    } else {
      return (
        <View style={styles.noSearch}>
          <Text>
            Usa la barra de arriba, para buscar tus restaurantes favoritos...
          </Text>
        </View>
      )
    }
  }

  render() {
    const { search, searchResults } = this.state
    return (
      <ScrollView style={styles.viewBody}>
        <SearchBar
          placeholder="Buscar restaurants..."
          onChangeText={value => this.searchRestaurants(value)}
          value={search}
          containerStyle={styles.searchBar}
          lightTheme={true}
        />
        {this.renderListRestaurants(searchResults)}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  searchBar: {
    marginBottom: 20
  },
  noSearch: {
    textAlign: "center",
    marginHorizontal: 10
  }
})
