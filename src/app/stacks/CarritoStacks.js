import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import CarritoScreen from "../screens/Carrito/Carrito";

const CarritoScreenStacks = createStackNavigator({
  Carrito: {
    screen: CarritoScreen
  },
});

export default CarritoScreenStacks;
