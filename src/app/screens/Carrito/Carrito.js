import React from "react";
import RegisterForm from "../Usuario/RegisterForm";
import { ActivityIndicator } from "react-native";
import MostrarCarrito from './MostrarCarrito'
import { connect } from 'react-redux';
import { SET_ACTUALIZAR_CARRITO } from "../../../constantes/login";

class Carrito extends React.Component {



    render() {
        const { mailUsuario, productos, carritoDesactualizado, actualizarCarrito } = this.props
        if (carritoDesactualizado) {
            actualizarCarrito(false)
            return (<ActivityIndicator></ActivityIndicator>)
        } else if (mailUsuario) {
            return (
                <MostrarCarrito predito={productos} />
            )
        } else {
            return (
                <RegisterForm />
            )

        }

    }

}

const mapStateToProps = state => {
    return {
        productos: state.user.productos,
        mailUsuario: state.user.mailUsuario,
        carritoDesactualizado: state.user.actualizarCarrito
    }
}
const mapDispatchToProps = dispatch => {
    return {
        actualizarCarrito: (actualizar) => dispatch({ type: SET_ACTUALIZAR_CARRITO, data: actualizar }),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Carrito)