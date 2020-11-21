import React from "react";
import {View,Text, Button, StyleSheet, TouchableOpacity, Linking} from "react-native";

export default function ComprasScreen() {
    return(
        <>
        <View>
            <Text> Esto es la lista de compras </Text>
        </View>
        <TouchableOpacity
          style={styles.loginScreenButton}
          underlayColor='#fff'
          onPress={initiateWhatsapp}>
          <Text style={styles.loginText}>Contactanos! Q('.'Q)</Text>
        </TouchableOpacity>
    </>

    )
}

const initiateWhatsapp = async () =>{
    var number = '1159246486'
    var msg = "Hola, tengo una consulta sobre una compra realizada! Q('.'Q)"
    let url =
      'whatsapp://send?text=' + 
      msg +
      '&phone=+54' + number;
    await Linking.openURL(url)
      .then((data) => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Make sure Whatsapp installed on your device');
      });
  

}

const styles = StyleSheet.create({
    loginScreenButton:{
        width: '100%',
        alignSelf:'center',
        position: 'absolute',
        height: '8%',
        bottom: 0,
        backgroundColor:'#1E6738',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent:'center',
        marginBottom: 20
      },
      loginText:{
          color:'#fff',
          textAlign: 'center',
          paddingLeft : 10,
          paddingRight : 10
      }
})