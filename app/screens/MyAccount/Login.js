import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Button, Divider, SocialIcon, Image } from "react-native-elements";
import Toast from "react-native-easy-toast";
import t from "tcomb-form-native";

const Form = t.form.Form;
import { LoginStruct, LoginOptions } from "../../forms/Login";

import * as Facebook from "expo-facebook";
import { facebookApi } from "../../utils/Social";

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
            // this.props.navigation.navigate("MyAccount");
            this.props.navigation.goBack();
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

  loginFacebook = async () => {
    console.log("Trying facebook login with: ", facebookApi);
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      facebookApi.application_id,
      { permissions: facebookApi.permissions }
    );
    console.log("type and token: ", type, token);
    if (type === "success") {
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      console.log("Credenciales devueltas por Firebase: ", credentials);
      firebase
        .auth()
        .signInWithCredential(credentials)
        .then(resolve => {
          console.log("Acceso correcto con facebook: ", resolve);
          this.refs.toast.show(`!Bienvenido!`, 150, () => {
            // this.props.navigation.navigate("MyAccount");
            this.props.navigation.goBack();
          });
        })
        .catch(error => {
          console.log(error);
          console.log(`Error accediendo con facebook: `, error);
          this.refs.toast.show("Error intentando acceder con Facebook", 2000);
        });
    } else if (type === "cancel") {
      this.refs.toast.show("Inicio de sesión con Facebook, cancelada", 2000);
    } else {
      this.refs.toast.show(
        "Error desconocido. Inténtelo de nuevo y si el problema persiste, inténtelo más tarde",
        2000
      );
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
          source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
          containerStyle={styles.containerLogo}
          style={styles.logo}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />
        <View style={styles.viewForm}>
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

          <Divider style={styles.divider} />

          <SocialIcon
            title="Iniciar sesión con Facebook"
            button
            type="facebook"
            onPress={() => this.loginFacebook()}
          />
        </View>
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
    marginHorizontal: 40,
    marginTop: 40
  },
  containerLogo: {
    alignItems: "center"
  },
  viewForm: {
    marginTop: 50
  },
  buttonLoginContainer: {
    backgroundColor: "#00a680",
    marginTop: 20,
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
  },
  divider: {
    backgroundColor: "#00a680",
    marginBottom: 20
  }
});
