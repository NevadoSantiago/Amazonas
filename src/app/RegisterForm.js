import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import backendUrl from "../app/utils/backendUrl";

export default function RegisterForm() {
    const [hidePassword, setHidePassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
  
      if (!email || !password) {
        console.log("ERROR todos los campos son obligatorios")
      } else {
        await fetch(`${backendUrl}/api/users`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
          })
        }).then((response) => (response.status))
        .then(status => {
          if (status===201){
            console.log("Usuario creado correctamente");
          }
          else if (status===409){
            console.log("Ya existe este correo, intente con otro");
          }
          else if (status===400){
            console.log("Bad request");
          }
        })
          .catch(() => {
            console.log("Error desconocido, intente más tarde");
          }); 
      }
        
    }

    const login = async () => {
  
      if (!email || !password) {
        console.log("ERROR todos los campos son obligatorios")
      } else {
        await fetch(`${backendUrl}/api/users`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
          })
        }).then((response) => (response.status))
        .then(status => {
          if (status===200){
            console.log("Logeado correctamente");
          }
          else if (status===401){
            console.log("Contraseña incorrecta");
          }
          else if (status===400){
            console.log("Bad request");
          }
        })
          .catch(() => {
            console.log("Error desconocido, intente más tarde");
          }); 
      }
    }
  

  return (
    <KeyboardAwareScrollView>
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
            onPress={register}
        />
        <Button
            title="Logearse"
            containerStyle={styles.btnContainerRegister}
            buttonStyle={styles.btnRegister}
            onPress={login}
        />
        </View>
      </View>
    </KeyboardAwareScrollView>
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
