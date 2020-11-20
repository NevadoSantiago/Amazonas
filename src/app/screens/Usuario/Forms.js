import React, { useCallback, useState, useEffect } from "react";
import { StyleSheet, View,AsyncStorage  } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import backendUrl from "../../utils/backendUrl";
import { withNavigation } from "react-navigation";
import {useDispatch} from 'react-redux'
import {INICIAR_SESION} from '../../../constantes/login'
import { Cache } from "react-native-cache";


    const cache = new Cache({
  namespace: "myapp",
  policy: {
      maxEntries: 50000
  },
  backend: AsyncStorage
});
export function LoginForm(props) {
    const dispatch = useDispatch()
    const { navigation } = props;
    const [hidePassword, setHidePassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

     const iniciarSesion = (datos) => dispatch({type:INICIAR_SESION, data:datos})
    

    const register = async () => {
      if (!email || !password) {
        console.log("ERROR todos los campos son obligatorios")
      }else{
      const url = backendUrl+"/users/new"
      await fetch(url, {
        method:"POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email:email ,
          pass: password,
        })
      })
      .then(function(response){
        return {
                status: response.status,
                respuesta: response.json()
              }
      })
      .then(function(rta){
        switch(rta.status){
          case 201: console.log("Creado")
          break;
          case 401: console.log("Mail usado")
          break
          default: console.log("ERROR codigo: " + status)
        }
      }
      ).catch(()=>{
        console.log("ERROR DESCONOCIDO")
      })
    }
  }
}


export function RegisterFormm(props) {
    const dispatch = useDispatch()
    const { navigation } = props;
    const [hidePassword, setHidePassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

     const iniciarSesion = (datos) => dispatch({type:INICIAR_SESION, data:datos})


    const login = async () => {
      if (!email || !password) {
        console.log("ERROR todos los campos son obligatorios")
      }else{
      const url = backendUrl+"/users/login"
      await fetch(url, {
        method:"POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email:email ,
          pass: password,
        })
      })
      .then(function(response){
        switch(response.status){
          case 201: return response.json()
          break;
          case 401: console.log("Mail incorrecto")
          break
          case 402: console.log("Contrasena incorrecta")
          break
          default: console.log("ERROR codigo: " + status)
        }
        
      })
      .then(async function(rta){
        await cache.set("token", rta.token);
        iniciarSesion(rta)
      }
      ).catch((e)=>{
        console.log(e)
      })
    }
  }

  return (
      <View style={styles.viewForm}>
        
        <View style={styles.formContainer}>
        <Input
            placeholder="Correo electronico"
            containerStyle={styles.inputForm}
            onChange={e => setEmail(e.nativeEvent.text)}
            rightIcon={
            <Icon
                type="material-community"
                name="at"
                iconStyle={styles.iconRight}
            />
            }
        />
        <Input
            placeholder="Contraseña"
            password={true}
            secureTextEntry={hidePassword}
            containerStyle={styles.inputForm}
            onChange={e => setPassword(e.nativeEvent.text)}
            rightIcon={
            <Icon
                type="material-community"
                name={hidePassword ? "eye-outline" : "eye-off-outline"}
                iconStyle={styles.iconRight}
                onPress={() => setHidePassword(!hidePassword)}
            />
            }
        />
        <Button
            title="Registrarse"
            containerStyle={styles.btnContainerRegister}
            buttonStyle={styles.btnRegister}
           // onPress={register}
           onPress={(ew) => {navigation.navigate("Catalogo")}}
        />
        <Button
            title="Logearse"
            containerStyle={styles.btnContainerRegister}
            buttonStyle={styles.btnRegister}
            onPress={login}
        />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  viewForm: {
    marginTop: 80,
    marginRight: 40,
    marginLeft: 40,
  },
  iconRight: {
    color: "#c1c1c1"
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
    alignSelf: "center"
  },
})