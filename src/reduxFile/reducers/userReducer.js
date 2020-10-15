import { addons } from "react-native";
import {CERRAR_SESION,INICIAR_SESION,PRUEBA_REDUX} from '../../constantes/login'
import {ERROR} from '../../constantes/log'


const initialState={
    idUsuario:null,
    nombreUsuario:null,
    rol:null,
    token:null,
    contador:0,
    mailUsuario:null,
    productos : null,
};


const UserReducer = (state = initialState, action) => {
    var datos = action.data
    
    switch(action.type){   
        case(INICIAR_SESION):{
            const id = datos.id
            const rol = datos.rol
            const token = datos.token
            const mail = datos.email
            const productos = datos.productos
            return{
                ...state,
                idUsuario: id,
                rol : rol,
                token: token,
                mailUsuario: mail,
                productos:productos
            }
        }
        case(CERRAR_SESION):{
            return{
                ...state,
                idUsuario:null,
                nombreUsuario:null,
                token:null,
                mailUsuario:null,
            }
        }
        case(PRUEBA_REDUX):{
            return{
                ...state,
                contador: action.data
            }
        }
        case(ERROR):{
            console.log(action.message)
            return{
                ...state
            }
        }
    }
    return{
        ...state
    }
}
export default UserReducer