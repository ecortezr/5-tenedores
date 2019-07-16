import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";

import t from "tcomb-form-native";

const Form = t.form.Form;
import { RegisterStruct, RegisterOptions } from "../../forms/Register";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      registerStruct: RegisterStruct,
      registerOptions: RegisterOptions,
      formData: {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
      }
    };
  }

  register = () => {
    const { password, passwordConfirmation } = this.state.formData;

    if (password === passwordConfirmation) {
      console.log("Registrando con...", this.state.formData);
      const validate = this.refs.registerForm.getValue();
      if (validate) {
        console.log("Datos válidos");
      } else {
        console.log("Datos inválidos");
      }
    } else {
      console.log("Las contraseñas no coinciden");
    }
  };

  onChangeFormRegister = formData => {
    this.setState({
      formData
    });
  };

  render() {
    const { registerOptions, registerStruct } = this.state;
    return (
      <View style={styles.viewBody}>
        <Form
          ref="registerForm"
          type={RegisterStruct}
          options={registerOptions}
          value={this.state.formData}
          onChange={values => this.onChangeFormRegister(values)}
        />
        <Button title="Unirse" onPress={() => this.register()} />
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
