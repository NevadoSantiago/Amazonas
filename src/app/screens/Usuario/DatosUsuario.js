import React from "react";

import store from '../../../reduxFile/store/store'
import {AsyncStorage,View,Text,Button} from 'react-native'
import {useDispatch} from 'react-redux'
import {CERRAR_SESION} from '../../../constantes/login'
import { Cache } from "react-native-cache";

const cache = new Cache({
    namespace: "myapp",
    policy: {
        maxEntries: 50000
    },
    backend: AsyncStorage
  });

export default function DatosUsuario() {

    const dispatch = useDispatch()
    const cerrarSesion = async () =>{
        await cache.remove("token")
        dispatch({type:CERRAR_SESION})
    } 

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