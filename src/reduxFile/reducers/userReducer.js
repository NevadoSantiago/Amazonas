
import {CERRAR_SESION,INICIAR_SESION,SET_PRODUCTOS_CARRITO,SET_ACTUALIZAR_CARRITO} from '../../constantes/login'
import {ERROR} from '../../constantes/log'


const initialState={
    idUsuario:null,
    nombreUsuario:null,
    apellidoUsuario:null,
    direccionUsuario:null,
    mailUsuario:null,
    rol:null,
    token:null,
    contador:0,
    idProductos : null,
    productos : null,
    actualizarCarrito:false
};


const UserReducer = (state = initialState, action) => {
    var datos = action.data
    
    switch(action.type){   
        case(INICIAR_SESION):{
            const id = datos.id
            const nombre = datos.nombre
            const apellido = datos.apellido
            const direccion =datos.direccion
            const mail = datos.email
            const rol = datos.rol
            const token = datos.token
            const idProductos = datos.productos
            return{
                ...state,
                idUsuario: id,
                nombreUsuario:nombre,
                apellidoUsuario:apellido,
                direccionUsuario:direccion,
                mailUsuario: mail,
                rol : rol,
                token: token,
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
                productos:datos,
                actualizarCarrito:true
            }
        }
        case(SET_ACTUALIZAR_CARRITO):{
            return{
                ...state,
                actualizarCarrito:datos
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