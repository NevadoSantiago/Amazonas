import React, { useCallback, useState, useEffect } from "react";
import { StyleSheet, View,AsyncStorage, Alert  } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import backendUrl from "../../utils/backendUrl";
import { withNavigation } from "react-navigation";
import {useDispatch} from 'react-redux'
import {INICIAR_SESION} from '../../../constantes/login'
import { Cache } from "react-native-cache";
import CrearUsuario from "./CrearUsuario"

const cache = new Cache({
  namespace: "myapp",
  policy: {
      maxEntries: 50000
  },
  backend: AsyncStorage
});

function alerta (titulo, mensaje, boton){
  Alert.alert(titulo,mensaje, [
      {text: boton, onPress:() =>console.log("alerta cerrada")}
  ])
}

function RegisterForm(props) {
    const dispatch = useDispatch()
    const { navigation } = props;
    const [hidePassword, setHidePassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registrarse, setRegistrarse] = useState(false)
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
          case 401: alerta("Email incorrecto", "La dirección de email es incorrecta o inexistente, reintentá!", "OK")
          break
          //ver como manejar los otros errores para hacerlo mas personalizado
          case 402: alerta("Datos incorrectos!", "Revisar el Email o Contraseña ingresadas!", "OK")
          break
          default: alerta("", "Ocurrió un error. "+ response.status)
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
    registrarse? 
    <CrearUsuario setRegistrarse={setRegistrarse}/> 
    : 
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
            title="Logearse"
            containerStyle={styles.btnContainerRegister}
            buttonStyle={styles.btnRegister}
            onPress={login}
        />

          <Button
            title="Registrarse"
            containerStyle={styles.btnContainerRegister}
            buttonStyle={styles.btnRegister}
            onPress={()=>{
              setRegistrarse(true)
            }}
        />
        </View>
      </View>
  );
}
export default withNavigation(RegisterForm);

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
