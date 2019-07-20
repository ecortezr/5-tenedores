import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Overlay, Input, Button } from "react-native-elements";

export default class OverlayOneInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props
    };
  }

  onChangeInput = inputData => {
    this.setState({
      inputValue: inputData
    });
  };
  update = () => {
    const newValue = this.state.inputValue;
    this.state.updateFunction(newValue);

    // Cierra el Overlay
    this.setState({
      isVisibleOverlay: false
    });
  };

  render() {
    const {
      isVisibleOverlay,
      placeholder,
      inputValue,
      updateFunction
    } = this.state;
    return (
      <Overlay
        isVisible={isVisibleOverlay}
        overlayBackgroundColor="transparent"
        overlayStyle={styles.overlayStyle}
      >
        <View style={styles.viewOverlay}>
          <Input
            style={styles.inputContainer}
            placeholder={placeholder}
            onChangeText={value => this.onChangeInput(value)}
            value={inputValue}
          />
          <Button
            buttonStyle={styles.btnUpdate}
            title="Actualizar"
            onPress={() => this.update()}
          />
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
    padding: 20,
    borderWidth: 2,
    borderColor: "#00a680"
  },
  inputContainer: {
    // marginBottom: 20
  },
  btnUpdate: {
    backgroundColor: "#00a680",
    marginTop: 20
  }
});
