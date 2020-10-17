import React from "react";
import {Card} from 'react-native-elements'
import {View,Text,Button} from "react-native";

export default showProductCard = (product) => {
    return(
        <Card >
          <Card.Title style={{fontSize:20, marginRight:25}}>{product.nombre}</Card.Title>
          <Card.Divider/>
          <View>
          <Card.Image style={{width:200, marginLeft:60, height:200,marginStart:200}} source={{uri:product.url}} />
          <Text style={{marginTop: 10, fontWeight:"bold", width:50, marginLeft:140, fontSize:17 }}>
                ${product.precio}
          </Text>
          </View>
        </Card>
      )

}