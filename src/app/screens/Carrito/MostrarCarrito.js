import React from "react";
import {View,Text} from "react-native";
import store from '../../../reduxFile/store/store'
import { connect } from 'react-redux';

/* export default function mostrarCarrito() {

    const state = store.getState();
    const {mailUsuario,nombreUsuario} = state.user
    return(
        <View>
            <Text>Bienvenido al buen carro</Text>
            <Text>{mailUsuario}</Text>
            <Text>{nombreUsuario}</Text>
        </View>
    )
} */

class MostrarCarrito extends React.Component{

    loadProducts = async () =>{
        const {productos} = this.props
        console.log(productos)

    }

   async componentDidMount(){
       console.log("Hola")
        this.loadProducts()
    }

    render(){
        return(
            <View>
                <Text>Carroncio</Text>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return{
        productos: state.user.productos
    }
  }


  
  export default connect(mapStateToProps, null)(MostrarCarrito)