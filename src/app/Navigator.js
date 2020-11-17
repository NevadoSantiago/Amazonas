import React from "react";
import { Icon,withBadge ,Badge,View } from "react-native-elements";

import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";


import {AsyncStorage} from "react-native"
import { Cache } from "react-native-cache";
import CarritoScreenStacks from "./stacks/CarritoStacks";
import CatalogoScreenStacks from "./stacks/CatalogoStacks";
import UsuarioScreenStacks from "./stacks/UsuarioStacks";
import ComprasScreenStacks from "./stacks/ComprasStacks";
import store from '../reduxFile/store/store'

const state = store.getState();
const {idProductos} = state.user
var cantidadProductosEnCarrito = 0
if(idProductos){
  cantidadProductosEnCarrito=idProductos.lenght
}


const cache = new Cache({
  namespace: "myapp",
  policy: {
      maxEntries: 50000
  },
  backend: AsyncStorage
});

const NavigationStacks = createBottomTabNavigator(
   {
    Catalogo: {
      screen: CatalogoScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Catalogo",
        tabBarIcon: ({ tintColor }) => {
          return(
            <Icon
              type="material-community"
              name="store"
              size={22}
              color={tintColor}
              />
          )

        },
      }),
    },
    Carrito: {
      screen: CarritoScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Carrito",
        tabBarIcon: ({ tintColor }) => 
          {
            return(
            <React.Fragment>
              <Badge value={cantidadProductosEnCarrito} status="error" />
              <Icon
              type="material-community"
              name="cart"
              size={22}
              color={tintColor}
            />
            </React.Fragment>
            )
          }
        ,
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
/* class Navigator extends React.Component{

  render(){
    return(
      createAppContainer(NavigationStacks)
    )
  }

} */

export default createAppContainer(NavigationStacks) ;
