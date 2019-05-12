import React, { Component } from "react";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Products from "../Products/products";
import Cart from "../Cart/cart";
import { Feather, Ionicons } from "@expo/vector-icons";

const BottomTabNav = createBottomTabNavigator({
  Main: {
    screen: Products,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Feather name="home" size={24} color={tintColor} />
      )
    }
  },
  Cart: {
    screen: Cart,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-cart" size={24} color={tintColor} />
      )
    }
  }
});

export default createAppContainer(BottomTabNav);
