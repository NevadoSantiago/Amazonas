import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import ComprasScreen from "../screens/Compras/Compras";

const ComprasScreenStacks = createStackNavigator({
  Compras: {
    screen: ComprasScreen
  },
});

export default ComprasScreenStacks;
