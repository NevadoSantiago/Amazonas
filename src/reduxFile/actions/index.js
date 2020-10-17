import {INICIAR_SESION, CERRAR_SESION,SET_PRODUCTOS_CARRITO} from '../../constantes/login'
import {ERROR} from '../../constantes/log'

export const iniciarSesion = (data) =>{
    if(data.nombre != null && data.id != null){
        return {
            type: INICIAR_SESION,
            data:{
                nombre: data.nombre,
                id: data.id,
                token: data.token
            }
        }
    }else{
        return{
            type: ERROR,
            data:{
                message: "Error al iniciar sesion. Nombre o Id invalidos"
            }
        }
    }
}

export const cerrarSesion = () =>{
    return{
        type: CERRAR_SESION
    }
}
//BORRAR DESPUES DE PROBARLO
export const pruebaRedux = (incrementar,acumulador) =>{

    return{
        type: PRUEBA_REDUX,
        data: incrementar + acumulador

    }
}

export const setProductosCarrito = (productos) =>{

    return{
        type:SET_PRODUCTOS_CARRITO,
        data:productos
    }
}