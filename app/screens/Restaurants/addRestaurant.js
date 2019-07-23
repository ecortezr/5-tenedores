import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import t from "tcomb-form-native";
import {
  AddRestaurantOptions,
  AddRestaurantStruct
} from "../../forms/AddRestaurantForm";
const Form = t.form.Form;

export default class AddRestaurant extends Component {

  constructor(){
    super()

    this.state = {
      // Es opcional establecerle valores a cada campo. Puede ser un objeto vacío
      formData = {
        name: '',
        city:'',
        address:'',
        description:''
      }
    }
  }
  render() {
    return (
      <View style={styles.viewBody}>
        <View>
          <Form
            ref="addRestaurantForm"
            type={AddRestaurantStruct}
            options={AddRestaurantOptions}
            value={this.state.formData}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  }
});
