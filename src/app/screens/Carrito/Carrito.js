import React from "react";
import RegisterForm from "../Usuario/RegisterForm";
import MostrarCarrito from './MostrarCarrito'
import { connect } from 'react-redux';

class Carrito extends React.Component {

    render(){
        const {mailUsuario,productos} = this.props
        return(
            mailUsuario ? <MostrarCarrito productos={productos} /> : <RegisterForm />
        )  
    }

}

  const mapStateToProps = state => {
    return{
        productos: state.user.productos,
        mailUsuario: state.user.mailUsuario
    }
  }


  
  export default connect(mapStateToProps, null)(Carrito)