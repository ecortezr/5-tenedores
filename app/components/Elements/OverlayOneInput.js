import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Overlay, Input, Button } from "react-native-elements";

export default class OverlayOneInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Overlay
        isVisible={true}
        overlayBackgroundColor="transparent"
        overlayStyle={styles.overlayStyle}
      >
        <View style={styles.viewOverlay}>
          <Input
            style={styles.inputContainer}
            placeholder="Texto..."
            onChangeText={value => console.log(value)}
            value=""
          />
          <Button buttonStyle={styles.btnUpdate} title="Actualizar" />
        </View>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  viewOverlay: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20
  },
  inputContainer: {
    // marginBottom: 20
  },
  btnUpdate: {
    backgroundColor: "#00a680",
    marginTop: 20
  }
});
