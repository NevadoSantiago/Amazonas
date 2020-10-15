import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import CatalogoScreen from "../screens/Catalogo/Catalogo";

const CatalogoScreenStacks = createStackNavigator({
  Catalogo: {
    screen: CatalogoScreen
  },
});

export default CatalogoScreenStacks;
