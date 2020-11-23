import React from "react";

import store from '../../../reduxFile/store/store'
import {AsyncStorage,View,Text,Button, StyleSheet} from 'react-native'
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
    const {nombreUsuario, apellidoUsuario, direccionUsuario, mailUsuario, rol} = state.user

    return(
        <View style={styles.todo}>
            <Text style={styles.titulo}>Bienvenido a los datos del usuario</Text>
            <Text style={styles.datos}>Nombre: {nombreUsuario}</Text>
            <Text style={styles.datos}>Apellido: {apellidoUsuario}</Text>
            <Text style={styles.datos}>Direccion: {direccionUsuario}</Text>
            <Text style={styles.datos}>Email: {mailUsuario}</Text>
            <Text style={styles.datos}>Rol: {rol}</Text>

            <Button 
                title="Cerrar Sesion" 
                onPress={(e)=>cerrarSesion()}
            />


        </View>
    )
}

const styles = StyleSheet.create({
    todo: {
        alignSelf: "center"
    },
    titulo:{
        fontSize:20
    },
    datos: {
        fontSize:16,
        alignSelf: "center",
        margin:5
    }
  })
  