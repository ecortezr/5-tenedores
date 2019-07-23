import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Image } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-easy-toast";

import t from "tcomb-form-native";
import {
  AddRestaurantOptions,
  AddRestaurantStruct
} from "../../forms/AddRestaurantForm";
const Form = t.form.Form;

export default class AddRestaurant extends Component {
  constructor() {
    super();

    this.state = {
      imageUriRestaurant: null,
      // Es opcional establecerle valores a cada campo. Puede ser un objeto vacío
      formData: {
        name: "",
        city: "",
        address: "",
        description: ""
      }
    };
  }

  imageRestaurant = image => {
    if (image) {
      return (
        <Image
          source={{ uri: imageUriRestaurant }}
          style={{ width: 500, height: 200 }}
        />
      );
    } else {
      return (
        <Image
          source={require("../../../assets/img/no-image.png")}
          style={{ width: 500, height: 200 }}
        />
      );
    }
  };

  uploadImage = async () => {
    console.log("Subiendo imagen...");
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (resultPermissions.status === "denied") {
      this.refs.toast.show(
        "No ha dado permiso, para acceder a la galería",
        500
      );
    } else {
      // Pedir que selecione una  imagen
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      });
      if (result.cancelled) {
        this.refs.toast.show(
          "No ha seleccionado ninguna imagen de la galería",
          500
        );
      } else {
        // Subir la imagen
        console.log("result: ", result);
        this.setState({
          imageUriRestaurant: result.uri
        });
      }
    }
  };
  render() {
    const { imageUriRestaurant } = this.state;
    return (
      <View style={styles.viewBody}>
        <View style={styles.viewPhoto}>
          {this.imageRestaurant(imageUriRestaurant)}
        </View>
        <View>
          <Form
            ref="addRestaurantForm"
            type={AddRestaurantStruct}
            options={AddRestaurantOptions}
            value={this.state.formData}
          />
        </View>
        <View style={styles.viewIconUploadPhoto}>
          <Icon
            name="camera"
            type="material-community"
            color="#7a7a7a"
            iconStyle={styles.addPhotoIcon}
            onPress={() => this.uploadImage()}
          />
        </View>
        <Toast
          ref="toast"
          position="bottom"
          positionValue={250}
          fadeInDuration={1000}
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
    flex: 1
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20
  },
  viewIconUploadPhoto: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 12
  },
  addPhotoIcon: {
    backgroundColor: "#e3e3e3",
    padding: 17,
    paddingBottom: 14,
    margin: 0
  }
});
