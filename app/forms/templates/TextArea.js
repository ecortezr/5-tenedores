import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Input } from "react-native-elements";

export default (textAreaTemplate = locals => {
  return (
    <View style={styles.viewContainer}>
      <Input
        inputContainerStyle={styles.inputContainer}
        placeholder={locals.config.placeholder}
        multiline
        onChangeText={value => locals.onChange(value)}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  viewContainer: {
    margin: 12,
    width: "100%",
    height: 50
  },
  inputContainer: {
    position: "absolute",
    height: 50,
    width: "100%",
    padding: 0,
    margin: 0
  }
});
