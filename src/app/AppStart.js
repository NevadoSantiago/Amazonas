import React from 'react'
import Navigator from './Navigator'
import {connect} from 'react-redux'
import { Cache } from "react-native-cache";
import {AsyncStorage} from "react-native"
import backendUrl from './utils/backendUrl'
import { INICIAR_SESION } from '../constantes/login';

const cache = new Cache({
    namespace: "myapp",
    policy: {
        maxEntries: 50000
    },
    backend: AsyncStorage
  });

class AppStart extends React.Component {
    
    loginToken =async (token) =>{
        const {iniciarSesion} = this.props
        const url = backendUrl + '/users/login/token'
        await fetch(url, {
            method:"POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token
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
            iniciarSesion(rta)
          }
          )
    }

async componentDidMount(){
    const token = await cache.get("token");
    if(token){
        this.loginToken(token)
    }
}

    render() {
        return (
            <Navigator />
        )
    }
}

const mapStateToProps = state => {
    return {
      mailUsuario: state.user.mailUsuario,
      productos: state.catalogo.productos
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      setProductsStore: (productos) => dispatch({ type: SET_PRODUCTOS_CARRITO, data: productos }),
      iniciarSesion:(datos) => dispatch({type:INICIAR_SESION, data:datos})
    }
  }
  
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(AppStart)