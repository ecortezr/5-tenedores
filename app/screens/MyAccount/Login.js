import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Button, Text, Image } from "react-native-elements";
import Toast from "react-native-easy-toast";
import t from "tcomb-form-native";

const Form = t.form.Form;
import { LoginStruct, LoginOptions } from "../../forms/Login";

import * as firebase from "firebase";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginStruct: LoginStruct,
      loginOptions: LoginOptions,
      formData: {
        email: "",
        password: ""
      },
      formErrorMessage: ""
    };
  }

  login = () => {
    console.log("logueando con...", this.state.formData);
    const validate = this.refs.loginForm.getValue();
    if (validate) {
      this.setState({
        formErrorMessage: ""
      });
      console.log("Datos válidos");
      firebase
        .auth()
        .signInWithEmailAndPassword(validate.email, validate.password)
        .then(resolve => {
          console.log("Acceso correcto: ", resolve);
          this.refs.toast.show(`!Bienvenido, ${validate.email}!`, 150, () => {
            this.props.navigation.navigate("MyAccount");
            // this.props.navigation.goBack();
          });
        })
        .catch(error => {
          console.log(error);
          console.log(`Error accediendo: ${error}`);
          this.refs.toast.show(
            "!Credenciales erradas! Verifique que las ha escrito correctamente",
            2000
          );
        });
    } else {
      this.setState({
        formErrorMessage: "Datos inválidos"
      });
    }
  };

  onChangeFormLogin = formData => {
    this.setState({
      formData
    });
  };

  render() {
    const { loginOptions, loginStruct, formErrorMessage } = this.state;
    return (
      <View style={styles.viewBody}>
        <Image
          source={require("../../../assets/img/ /assets/img/5-tenedores-letras-icono-logo.png")}
          style={styles.logo}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />
        <Form
          ref="loginForm"
          type={loginStruct}
          options={loginOptions}
          value={this.state.formData}
          onChange={values => this.onChangeFormLogin(values)}
        />
        <Button
          buttonStyle={styles.buttonLoginContainer}
          title="Acceder"
          onPress={() => this.login()}
        />
        <Text style={styles.formErroMessage}>{formErrorMessage}</Text>
        <Toast
          ref="toast"
          style={{ backgroundColor: "red" }}
          position="top"
          positionValue={50}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "#fff" }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 40,
    marginTop: 40
  },
  buttonLoginContainer: {
    backgroundColor: "#00a680",
    marginHorizontal: 10
  },
  formErroMessage: {
    color: "#ff0000",
    textAlign: "center",
    marginTop: 30
  },
  logo: {
    width: 300,
    height: 150
  }
});
