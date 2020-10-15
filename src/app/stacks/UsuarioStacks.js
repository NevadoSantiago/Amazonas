import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import UsuarioScreen from "../screens/Usuario/Usuario";

const UsuarioScreenStacks = createStackNavigator({
  Usuario: {
    screen: UsuarioScreen
  },
});

export default UsuarioScreenStacks;
