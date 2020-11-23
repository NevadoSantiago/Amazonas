import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert   } from "react-native";
import { Input,  Icon, Button  } from "react-native-elements";
import backendUrl from "../../utils/backendUrl";
 export default function CrearUsuario({setRegistrarse}){

    const [nombre,setNombre] = useState("")
    const [apellido,setApellido] = useState("")
    const [direccion,setDireccion] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [password2,setPassword2] = useState("")
    const [puedeEnviar,setPuedeEnviar] = useState(false)
    const [hidePassword, setHidePassword] = useState(true);
    const [hidePassword2, setHidePassword2] = useState(true);

    useEffect(validarCampos,[nombre,apellido,direccion,email,password,password2])

    function validarCampos(){
        if (nombre && apellido && direccion && email && password && password2 && password == password2 && validateEmail(email)){
            setPuedeEnviar(true)
        }else{
            setPuedeEnviar(false)
        }
    }

    const register = async () => {
    
            const url = backendUrl+"/users/new"

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    nombre : nombre,
                    apellido : apellido,
                    direccion: direccion,
                    email: email,
                    password: password
                }
                )
            };
            
            await fetch(url, requestOptions)
            .then(response => {
                if(response.status == 200){
                    alerta('Excelente!','Usuario creado, ya podés loguearte!','Entendido')
                    volver()
                    return response.json()

                }else if(response.status == 409) {
                    alerta('Upss!!','El usuario ya existe', 'Entendido')

                }else{
                    alerta('Upss!!','Hubo un error con codigo: ' + response.status, 'Entendido')
                }
            })
        
    }

    function alerta (titulo, mensaje, boton){
        Alert.alert(titulo,mensaje, [
            {text: boton, onPress:() =>console.log("alerta cerrada")}
        ])
    }

    const  volver = () =>{
        setRegistrarse(false)

    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }   

    return(
        <View style={styles.viewForm}>
            <View style={styles.formContainer}>
                <ScrollView>    
                    <Input
                        placeholder="Nombre"
                        onChange={e => setNombre(e.nativeEvent.text)}
                    />
                    <Input
                        placeholder="Apellido"
                        onChange={e => setApellido(e.nativeEvent.text)}
                    />    
                    <Input
                        placeholder="Direccion"
                        onChange={e => setDireccion(e.nativeEvent.text)}
                    />  
                    <Input
                        placeholder="Email"
                        onChange={e => setEmail(e.nativeEvent.text)}
                    />
                    <Input
                        placeholder="Contraseña"
                        onChange={e => setPassword(e.nativeEvent.text)}
                        password={true}
                        secureTextEntry={hidePassword}
                        rightIcon={
                            <Icon
                                type="material-community"
                                name={hidePassword ? "eye-outline" : "eye-off-outline"}
                                iconStyle={styles.iconRight}
                                onPress={() => setHidePassword(!hidePassword)}
                            />
                            }

                    />                      
                    <Input
                        placeholder="Confirmar contraseña"
                        onChange={e => setPassword2(e.nativeEvent.text)}
                        password={true}
                        secureTextEntry={hidePassword2}
                        rightIcon={
                            <Icon
                                type="material-community"
                                name={hidePassword2 ? "eye-outline" : "eye-off-outline"}
                                iconStyle={styles.iconRight}
                                onPress={() => setHidePassword2(!hidePassword2)}
                            />
                            }
                    />  
                    <Button
                        title="Registrarse   Q('.'Q)"
                        containerStyle={styles.btnContainerRegister}
                        buttonStyle={styles.btnRegister}
                        disabled={!puedeEnviar}
                        onPress={register}
                        
                    />

<                   Button
                        title="Volver"
                        containerStyle={styles.btnContainerRegister}
                        buttonStyle={styles.btnRegister}
                        onPress={volver}
                    />

                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewForm: {
      marginTop: 30,
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
  