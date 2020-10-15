import React from "react";
import {View,Text} from "react-native";
import store from '../../../reduxFile/store/store'

export default function DatosUsuario() {
    const nombre = "Juan"; //TODO: que lo traiga del store?
    const apellido = "Perez"; //TODO: que lo traiga del store?

    const state = store.getState();
    const {mailUsuario,nombreUsuario} = state.user
    return(
        <View>
            <Text>Bienvenido a los datos del usuario</Text>
            <Text>{mailUsuario}</Text>
            <Text>{nombreUsuario}</Text>
        </View>
    )
}