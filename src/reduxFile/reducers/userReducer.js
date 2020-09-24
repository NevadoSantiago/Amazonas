import { addons } from "react-native";
import {CERRAR_SESION,INICIAR_SESION,PRUEBA_REDUX} from '../../constantes/login'
import {ERROR} from '../../constantes/log'


const initialState={
    idUsuario:null,
    nombreUsuario:null,
    token:null,
    contador:0,
};


const UserReducer = (state = initialState, action) => {
    var datos = action.data
    
    switch(action.type){   
        case(INICIAR_SESION):{
            const nombre = data.nombre
            const id = data.id
            const token = data.token
            return{
                ...state,
                idUsuario: id,
                nombreUsuario: nombre,
                token: token
            }
        }
        case(CERRAR_SESION):{
            return{
                ...state,
                idUsuario:null,
                nombreUsuario:null,
                token:null,
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