import React, { Component } from "react"
import t from "tcomb-form-native"
import inputTemplate from "./templates/Input"
import textAreaTemplate from "./templates/TextArea"

export const AddReviewStruct = t.struct({
  title: t.String,
  review: t.String
})

export const AddReviewOptions = {
  fields: {
    title: {
      template: inputTemplate,
      config: {
        placeholder: "Título de la valoración",
        iconType: "material-community",
        iconName: "silverware"
      }
    },
    review: {
      template: textAreaTemplate,
      config: {
        placeholder: "Permítanos leer su opinión"
      }
    }
  }
}
