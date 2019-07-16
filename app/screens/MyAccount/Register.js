import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import t from "tcomb-form-native";

const Form = t.form.Form;
import { RegisterStruct, RegisterOptions } from "../../forms/Register";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      registerStruct: RegisterStruct,
      registerOptions: RegisterOptions
    };
  }
  render() {
    const { registerOptions, registerStruct } = this.state;
    return (
      <View style={styles.viewBody}>
        <Form
          ref="registerForm"
          type={RegisterStruct}
          options={registerOptions}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 40
  }
});
