import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import { Overlay, Input, Button, Icon } from "react-native-elements"

export default class OverlayThreeInputs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ...props
    }
  }

  onChangeInputOne = inputData => {
    this.setState({
      inputValueOne: inputData
    })
  }
  onChangeInputTwo = inputData => {
    this.setState({
      inputValueTwo: inputData
    })
  }
  onChangeInputThree = inputData => {
    this.setState({
      inputValueThree: inputData
    })
  }

  update = () => {
    const newValueOne = this.state.inputValueOne
    const newValueTwo = this.state.inputValueTwo
    const newValueThree = this.state.inputValueThree
    this.state.updateFunction(newValueOne, newValueTwo, , newValueThree)

    // Cierra el Overlay
    this.setState({
      isVisibleOverlay: false
    })
  }

  close = () => {
    this.setState({
      isVisibleOverlay: false
    })
    this.state.updateFunction(null, null)
  }

  render() {
    const {
      isVisibleOverlay,
      placeholderOne,
      placeholderTwo,
      placeholderThree,
      inputValueOne,
      inputValueTwo,
      inputValueThree,
      havePassword
    } = this.state
    return (
      <Overlay
        isVisible={isVisibleOverlay}
        overlayBackgroundColor="transparent"
        overlayStyle={styles.overlayStyle}
      >
        <View style={styles.viewOverlay}>
          <Input
            style={styles.inputContainer}
            placeholder={placeholderOne}
            onChangeText={value => this.onChangeInputOne(value)}
            value={inputValueOne}
            password={havePassword}
            secureTextEntry={havePassword}
          />
          <Input
            style={styles.inputContainer}
            placeholder={placeholderTwo}
            onChangeText={value => this.onChangeInputTwo(value)}
            value={inputValueTwo}
            password={havePassword}
            secureTextEntry={havePassword}
          />
          <Input
            style={styles.inputContainer}
            placeholder={placeholderThree}
            onChangeText={value => this.onChangeInputThree(value)}
            value={inputValueThree}
            password={havePassword}
            secureTextEntry={havePassword}
          />
          <Button
            buttonStyle={styles.btnUpdate}
            title="Actualizar"
            onPress={() => this.update()}
          />
          <Icon
            containerStyle={styles.containerIconClose}
            type="material-community"
            name="close-circle-outline"
            color="#f00"
            onPress={() => this.close()}
          />
        </View>
      </Overlay>
    )
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
  },
  containerIconClose: {
    position: "absolute",
    right: 2,
    top: 2,
    backgroundColor: "#fff"
  }
})
