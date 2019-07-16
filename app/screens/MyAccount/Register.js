import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";

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
      },
      formErrorMessage: ""
    };
  }

  register = () => {
    const { password, passwordConfirmation } = this.state.formData;

    console.log("Registrando con...", this.state.formData);
    if (password === passwordConfirmation) {
      const validate = this.refs.registerForm.getValue();
      if (validate) {
        this.setState({
          formErrorMessage: ""
        });
        console.log("Datos válidos");
      } else {
        this.setState({
          formErrorMessage: "Datos inválidos"
        });
      }
    } else {
      this.setState({
        formErrorMessage: "Las contraseñas no coinciden"
      });
    }
  };

  onChangeFormRegister = formData => {
    this.setState({
      formData
    });
  };

  render() {
    const { registerOptions, registerStruct, formErrorMessage } = this.state;
    return (
      <View style={styles.viewBody}>
        <Form
          ref="registerForm"
          type={RegisterStruct}
          options={registerOptions}
          value={this.state.formData}
          onChange={values => this.onChangeFormRegister(values)}
        />
        <Button
          buttonStyle={styles.buttonRegisterContainer}
          title="Unirse"
          onPress={() => this.register()}
        />
        <Text style={styles.formErroMessage}>{formErrorMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 40
  },
  buttonRegisterContainer: {
    backgroundColor: "#00a680",
    marginHorizontal: 10
  },
  formErroMessage: {
    color: "#ff0000",
    textAlign: "center",
    marginTop: 30
  }
});
