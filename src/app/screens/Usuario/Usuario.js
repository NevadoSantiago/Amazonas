import React from "react";
import RegisterForm from "./RegisterForm";
import DatosUsuario from "./DatosUsuario";
import { connect } from 'react-redux';

class UsuarioScreen extends React.Component {

    render(){
        const {mailUsuario} = this.props
        return(
            mailUsuario ? <DatosUsuario /> : <RegisterForm />
        )  
    }

}



  const mapStateToProps = state => {
    return{
        mailUsuario: state.user.mailUsuario
    }
  }


  
  export default connect(mapStateToProps, null)(UsuarioScreen)