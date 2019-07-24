import React, { Component } from "react"
import { StyleSheet, View, Text } from "react-native"
import { AirbnbRating, Button } from "react-native-elements"
import Toast from "react-native-easy-toast"

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
    if (ratingValue === 0) {
      this.refs.toast.show(
        "Seleccione la cantidad de estrellas que mejor representan su valoración",
        1500
      )
    } else {
      // Estableció un rating. Se valida el formulario
      const validate = this.refs.addReviewForm.getValue()
      if (!validate) {
        this.refs.toast.show(
          "Completa el formulario, para que sea válida tu valoración",
          1500
        )
      } else {
        // Validación correcta
      }
    }
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
        <Toast
          ref="toast"
          position="bottom"
          positionValue={350}
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
