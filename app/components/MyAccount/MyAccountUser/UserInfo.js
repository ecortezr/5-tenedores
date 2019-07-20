import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";

import UpdateUserInfo from "./UpdateUserInfo";

export default class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {}
    };
  }

  componentDidMount = () => {
    this.getUserInfo();
  };

  getUserInfo = async () => {
    const user = await firebase.auth().currentUser;
    // console.log("user: ", user);
    user.providerData.forEach(userInfo => {
      this.setState({
        userInfo
      });
    });
  };

  updateUserDisplayName = newDisplayName => {
    console.log("newDisplayName: ", newDisplayName);
  };

  returnUpdateUserInfoComponent = userInfoData => {
    if (userInfoData.hasOwnProperty("uid")) {
      return (
        <UpdateUserInfo
          userInfo={this.state.userInfo}
          updateUserDisplayName={this.updateUserDisplayName}
        />
      );
    }
  };

  render() {
    const { displayName, email, photoURL } = this.state.userInfo;
    const avatar =
      photoURL || "https://api.adorable.io/avatars/285/abott@adorable.png";
    return (
      <View>
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
        {this.returnUpdateUserInfoComponent(this.state.userInfo)}
        {/* <UpdateUserInfo
          userInfo={this.state.userInfo}
          updateUserDisplayName={this.updateUserDisplayName}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewUserInfo: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    paddingVertical: 30
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
