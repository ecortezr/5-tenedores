import React, { Component } from "react"
import { StyleSheet, View, Text } from "react-native"
import { AirbnbRating, Button } from "react-native-elements"

import t from "tcomb-form-native"
const Form = t.form.Form
import { AddReviewStruct, AddReviewOptions } from "../../forms/AddReviewForm"

export default class AddReviewRestaurant extends Component {
  constructor(props) {
    super(props)

    this.state = {
      review: 0,
      formData: {}
    }
  }

  addReview = () => {
    const ratingValue = this.refs.rating.state.position
    console.log("Agregando valoración de: ", ratingValue)
  }

  render() {
    const { id, name } = this.props.navigation.state.params
    return (
      <View style={styles.viewBody}>
        <View style={styles.viewRating}>
          <AirbnbRating
            ref="rating"
            count={5}
            reviews={[
              "Pésimo",
              "Deficiente",
              "Normal",
              "Muy Bueno",
              "Excelente"
            ]}
            defaultRating={0}
            size={35}
          />
        </View>
        <View style={styles.formReview}>
          <Form
            ref="addReviewForm"
            type={AddReviewStruct}
            options={AddReviewOptions}
          />
        </View>
        <View style={styles.viewBtnAdd}>
          <Button
            title="Enviar Valoración"
            onPress={() => this.addReview()}
            buttonStyle={styles.btnAdd}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewRating: {
    height: 110,
    backgroundColor: "#f2f2f2"
  },
  formReview: {
    margin: 10,
    marginTop: 40
  },
  viewBtnAdd: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 30,
    marginHorizontal: 10
  },
  btnAdd: {
    backgroundColor: "#00a680"
  }
})
