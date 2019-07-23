import React, { Component } from "react";
import t from "tcomb-form-native";
import inputTemplate from "./templates/Input";
import textAreaTemplate from "./templates/TextArea";

export const AddRestaurantStruct = t.struct({
  name: t.String,
  city: t.String,
  address: t.String,
  description: t.String
});

export const AddRestaurantOptions = {
  fields: {
    name: {
      template: inputTemplate,
      config: {
        placeholder: "Nombre del Restaurant",
        iconType: "material-community",
        iconName: "silverware"
      }
    },
    city: {
      template: inputTemplate,
      config: {
        placeholder: "Ciudad",
        iconType: "material-community",
        iconName: "city"
      }
    },
    address: {
      template: inputTemplate,
      config: {
        placeholder: "Dirección",
        iconType: "material-community",
        iconName: "map-marker"
      }
    },
    description: {
      template: textAreaTemplate,
      config: {
        placeholder: "Descripción"
      }
    }
  }
};
