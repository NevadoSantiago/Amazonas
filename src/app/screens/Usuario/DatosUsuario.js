import React from "react";
import {View,Text,Button} from "react-native";
import store from '../../../reduxFile/store/store'
import {useDispatch} from 'react-redux'
import {CERRAR_SESION} from '../../../constantes/login'



export default function DatosUsuario() {

    const dispatch = useDispatch()
    const cerrarSesion = () => dispatch({type:CERRAR_SESION})

    const state = store.getState();
    const {mailUsuario,nombreUsuario} = state.user
    return(
        <View>
            <Text>Bienvenido a los datos del usuario</Text>
            <Text>{mailUsuario}</Text>
            <Text>{nombreUsuario}</Text>
            <Button title="Cerrar Sesion" onPress={(e)=>cerrarSesion()}></Button>

        </View>
    )
}