import {combineReducers} from 'redux'
import UserReducer from '../reducers/userReducer'
import CatalogoReducer from '../reducers/catalogoReducer'

export default combineReducers({
    user : UserReducer,
    catalogo:CatalogoReducer
})