import React, { Component } from "react"
import { StyleSheet, View, ActivityIndicator } from "react-native"
import { AirbnbRating, Button, Text, Overlay } from "react-native-elements"
import Toast from "react-native-easy-toast"

import t from "tcomb-form-native"
const Form = t.form.Form
import { AddReviewStruct, AddReviewOptions } from "../../forms/AddReviewForm"

import { firebaseApp } from "../../utils/firebase"
import firebase from "firebase/app"
import "firebase/firestore"
const db = firebase.firestore(firebaseApp)

export default class AddReviewRestaurant extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  addReview = async () => {
    const ratingValue = this.refs.rating.state.position
    const user = await firebase.auth().currentUser
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
        // Enviar data a firestore
        this.setState({
          loading: true
        })
        const { uid } = await firebase.auth().currentUser
        const restaurantId = this.props.navigation.state.params.id
        const { title, review } = validate
        const data = {
          uid,
          avatarUser: user.photoURL,
          restaurantId,
          title,
          review,
          rating: ratingValue,
          createdAt: new Date()
        }

        db.collection("reviews")
          .add(data)
          .then(docRef => {
            const restaurantRef = db.collection("restaurants").doc(restaurantId)
            restaurantRef.get().then(docRef => {
              let { ratingTotal, votesTotal } = docRef.data()
              ratingTotal += ratingValue
              votesTotal++

              const ratingAvg = ratingTotal / votesTotal
              docRef
                .update({
                  ratingTotal,
                  votesTotal,
                  ratingAvg
                })
                .then(() => {
                  this.refs.toast.show(
                    "Valoración enviada! Gracias por su valiosa opinión",
                    500,
                    () => {
                      this.props.navigation.state.params.loadReviews()
                      this.props.navigation.goBack()
                    }
                  )
                })
                .catch(error => {
                  this.refs.toast.show(
                    "Ocurrió un error, enviando su valoración. Por favor, inténtelo de nuevo",
                    1500
                  )
                })
            })
          })
          .catch(error => {
            this.refs.toast.show(
              "Ocurrió un error, enviando su valoración. Por favor, inténtelo de nuevo",
              1500
            )
          })
          .then(() => {
            this.setState({
              loading: false
            })
          })
      }
    }
  }

  render() {
    const { id, name } = this.props.navigation.state.params
    const { loading } = this.state
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
        <Overlay
          overlayStyle={styles.overlayLoading}
          isVisible={loading}
          width="auto"
          height="auto"
        >
          <View>
            <Text style={styles.overlayLoadingText}>
              Enviando valoración...
            </Text>
            <ActivityIndicator size="large" color="#00a680" />
          </View>
        </Overlay>
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
  },
  overlayLoading: {
    padding: 20
  },
  overlayLoadingText: {
    color: "#00a680",
    marginBottom: 20,
    fontSize: 20
  }
})
