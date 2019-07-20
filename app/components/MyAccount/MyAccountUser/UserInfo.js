import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";

export default class UserInfor extends Component {
  constructor(state) {
    super(state);

    this.state = {
      userInfo: {}
    };
  }

  componentDidMount = () => {
    this.getUserInfo();
  };

  getUserInfo = async () => {
    const user = await firebase.auth().currentUser;
    console.log("user: ", user);
    user.providerData.forEach(userInfo => {
      console.log("userInfo: ", userInfo);
      this.setState({
        userInfo
      });
    });
    console.log("state: ", this.state.userInfo);
  };

  render() {
    const { displayName, email, photoURL } = this.state.userInfo;
    const avatar =
      photoURL || "https://api.adorable.io/avatars/285/abott@adorable.png";
    return (
      <View style={styles.viewUserInfo}>
        <Avatar
          rounded
          size="large"
          source={{
            uri: avatar
          }}
          containerStyle={styles.userInfoAvatar}
        />
        <Text style={styles.displayName}>{displayName}</Text>
        <Text>{email}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewUserInfo: {
    // flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 30
    // justifyContent: "center",
    // paddingHorizontal: 30
  },
  userInfoAvatar: {
    marginRight: 20
  },
  displayName: {
    fontWeight: "bold"
  }
});
