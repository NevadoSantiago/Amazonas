import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import FinalizarCompra from "../screens/Compras/FinalizarCompra";

const FinalizarCompraStack = createStackNavigator({
  FinalizarCompra: {
    screen: FinalizarCompra
  },
});

export default FinalizarCompraStack;
