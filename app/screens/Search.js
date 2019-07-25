import React, { Component } from "react"
import { StyleSheet, View, Text } from "react-native"
import { SearchBar } from "react-native-elements"

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

    console.log(this.state)
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
