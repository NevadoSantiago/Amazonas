import React from "react";
import { Card, Button, Icon } from 'react-native-elements'
import { View, Text, } from "react-native";
import {useDispatch} from 'react-redux'
import store from '../reduxFile/store/store'

const state = store.getState();
//const dispatch = useDispatch()

function addProductCarrito(product,props){
 
  const {productos} = state.user
  const {setProductsStore} = props
  productos.push(product)
  setProductsStore(productos)
}

export const showProductCardCarrito = (product) => {
  return (
    <Card >
      <Card.Title style={{ fontSize: 20, marginRight: 25 }}>
        {product.nombre}
      </Card.Title>
      <View>
        <Card.Divider />
        <Card.Image style={{ width: 200, marginLeft: 60, height: 200, marginStart: 200 }} source={{ uri: product.url }} />
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text style={{ marginTop: 10, fontWeight: "bold", width: 50, marginLeft: 0, fontSize: 17 }}>
            ${product.precio}
          </Text>
        </View>
        <Card.Divider />
      </View>
    </Card>
  )

}