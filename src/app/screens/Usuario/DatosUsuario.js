import React from "react";
import {View,Text} from "react-native";

export default function DatosUsuario() {
    const nombre = "Juan"; //TODO: que lo traiga del store?
    const apellido = "Perez"; //TODO: que lo traiga del store?
    
    return(
        <View>
            <Text>Bienvenido a los datos del usuario</Text>
            <Text>{nombre}</Text>
            <Text>{apellido}</Text>
        </View>
    )
}