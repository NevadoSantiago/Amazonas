import React from "react";
import { Icon } from "react-native-elements";

import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import CarritoScreenStacks from "./stacks/CarritoStacks";
import CatalogoScreenStacks from "./stacks/CatalogoStacks";
import UsuarioScreenStacks from "./stacks/UsuarioStacks";
import ComprasScreenStacks from "./stacks/ComprasStacks";

const NavigationStacks = createBottomTabNavigator(
  {
    Catalogo: {
      screen: CatalogoScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Catalogo",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="store"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
    Carrito: {
      screen: CarritoScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Carrito",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="cart"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
    Compras: {
      screen: ComprasScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Compras",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="format-list-bulleted"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
    Usuario: {
      screen: UsuarioScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Usuario",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="account"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: "Catalogo",
    order: ["Catalogo", "Carrito", "Compras", "Usuario"],
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680",
    },
  }
);

export default createAppContainer(NavigationStacks);
