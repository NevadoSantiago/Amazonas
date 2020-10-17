
import {CERRAR_SESION,INICIAR_SESION,SET_PRODUCTOS_CARRITO} from '../../constantes/login'
import {ERROR} from '../../constantes/log'


const initialState={
    idUsuario:null,
    nombreUsuario:null,
    rol:null,
    token:null,
    contador:0,
    mailUsuario:null,
    idProductos : null,
    productos : null
};


const UserReducer = (state = initialState, action) => {
    var datos = action.data
    
    switch(action.type){   
        case(INICIAR_SESION):{
            const id = datos.id
            const rol = datos.rol
            const token = datos.token
            const mail = datos.email
            const idProductos = datos.productos
            return{
                ...state,
                idUsuario: id,
                rol : rol,
                token: token,
                mailUsuario: mail,
                idProductos:idProductos
            }
        }
        case(CERRAR_SESION):{
            return{
                ...state,
                idUsuario:null,
                rol:null,
                nombreUsuario:null,
                token:null,
                mailUsuario:null,
                idProductos:null,
                productos:null
            }
        }
        case(SET_PRODUCTOS_CARRITO):{
            return{
                ...state,
                productos:datos
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