
import {SET_CATEGORIAS,SET_PRODUCTOS} from '../../constantes/productos'
import {ERROR} from '../../constantes/log'


const initialState={
    categorias:null,
    productos:null,

};


const CatalogoReducer = (state = initialState, action) => {
    var datos = action.data
    
    switch(action.type){   
        case(SET_CATEGORIAS):{
            return{
                ...state,
                categorias:datos.categorias,
                productos:datos.productos
            }
        }
        case(SET_PRODUCTOS):{
            return{
                ...state,
                productos:datos
            }
        }
        
    }
    return{
        ...state
    }
}
export default CatalogoReducer