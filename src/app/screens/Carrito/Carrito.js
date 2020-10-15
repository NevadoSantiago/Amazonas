import React from "react";
import RegisterForm from "../Usuario/RegisterForm";
import MostrarCarrito from './MostrarCarrito'
import { connect } from 'react-redux';

class Carrito extends React.Component {

    render(){
        const {mailUsuario} = this.props
        return(
            mailUsuario ? <MostrarCarrito /> : <RegisterForm />
        )  
    }

}

  const mapStateToProps = state => {
    return{
        mailUsuario: state.user.mailUsuario
    }
  }


  
  export default connect(mapStateToProps, null)(Carrito)