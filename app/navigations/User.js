import React from "react"
import { Icon } from "react-native-elements"
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation"

// Screens
import Top5Screen from "../screens/Top5"
import SearchScreen from "../screens/Search"

// MyAccount screens
import MyAccountScreen from "../screens/MyAccount/MyAccount"
import RegisterScreen from "../screens/MyAccount/Register"
import LoginScreen from "../screens/MyAccount/Login"

// Screens
import RestaurantsScreen from "../screens/Restaurants/Restaurants"
import RestaurantScreen from "../screens/Restaurants/Restaurant"
import AddRestaurantScreen from "../screens/Restaurants/AddRestaurant"
import AddReviewRestaurantScreen from "../screens/Restaurants/AddReviewRestaurant"

const restaurantsScreenStack = createStackNavigator({
  Restaurants: {
    screen: RestaurantsScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Home"
    })
  },
  AddRestaurant: {
    screen: AddRestaurantScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Agregar Restaurant"
    })
  },
  Restaurant: {
    screen: RestaurantScreen,
    navigationOptions: ({ navigation }) => {
      const item = navigation.state.params.restaurant.item
      return {
        title: item.name
      }
    }
  },
  AddReviewRestaurant: {
    screen: AddReviewRestaurantScreen,
    navigationOptions: ({ navigation }) => {
      const title = navigation.state.params.name
      return {
        title
      }
    }
  }
})

const top5ScreenStack = createStackNavigator({
  Top5: {
    screen: Top5Screen,
    navigationOptions: ({ navigation }) => ({
      title: "Top 5 de Restaurantes"
    })
  }
})

const searchScreenStack = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Buscar"
    })
  }
})

const myAccountScreenStack = createStackNavigator({
  MyAccount: {
    screen: MyAccountScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Mi Cuenta"
    })
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Registro"
    })
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Login"
    })
  }
})

const RootStack = createBottomTabNavigator(
  {
    Restaurants: {
      screen: restaurantsScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Inicio",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            size={22}
            color={tintColor}
            name="compass-outline"
          />
        )
      })
    },
    Top5: {
      screen: top5ScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Top 5",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            size={22}
            color={tintColor}
            name="star-outline"
          />
        )
      })
    },
    Search: {
      screen: searchScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Buscar",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            size={22}
            color={tintColor}
            name="magnify"
          />
        )
      })
    },
    MyAccount: {
      screen: myAccountScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Mi Cuenta",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            size={22}
            color={tintColor}
            name="home-outline"
          />
        )
      })
    }
  },
  {
    initialRouteName: "Search", // Opcional
    order: ["Restaurants", "Top5", "Search", "MyAccount"], // Opcional
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680"
    }
  }
)

export default createAppContainer(RootStack)
