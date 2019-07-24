import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Image, Icon, ListItem } from "react-native-elements";

export default class Restaurant extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      name,
      city,
      address,
      description,
      image,
      createdAt
    } = this.props.navigation.state.params.restaurant.item;
    const listExtraInfo = [
      {
        text: `${city}, ${address}`,
        iconName: "map-marker",
        iconType: "material-community",
        action: null
      }
    ];
    return (
      <View style={styles.viewBody}>
        <View style={styles.viewImage}>
          <Image
            source={{ uri: image }}
            PlaceholderContent={<ActivityIndicator />}
            style={styles.restaurantImage}
          />
        </View>

        <View style={styles.viewBasicInfo}>
          <Text style={styles.restaurantName}>{name}</Text>
          <Text style={styles.restaurantDescription}>{description}</Text>
        </View>

        <View style={styles.viewLocation}>
          <Text style={styles.restaurantLocation}>
            Ubicación del Restaurant
          </Text>
          {listExtraInfo.map((item, idx) => (
            <ListItem
              key={idx}
              title={item.text}
              leftIcon={<Icon name={item.iconName} type={item.iconType} />}
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewImage: {
    width: "100%"
  },
  restaurantImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover"
  },
  viewBasicInfo: {
    margin: 15
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: "bold"
  },
  restaurantDescription: {
    marginTop: 5,
    color: "grey"
  },
  viewLocation: {
    margin: 15,
    marginTop: 25
  },
  restaurantLocation: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10
  }
});
