import React from 'react';
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
import {pruebaRedux} from '../../reduxFile/actions'
import { Button, Text,View,StyleSheet } from 'react-native';
import RegisterForm from '../screens/Usuario/RegisterForm';
import TabBarContainer from '../Navigator';

class Home extends React.Component{

    render(){
        const estaLogeado = false;
        return(
            estaLogeado ? <RegisterForm /> : <TabBarContainer />
        )      
    }

}

const styles = StyleSheet.create({
    textoContador: {
        textAlign: 'center',
        fontWeight:"bold",
        marginTop: 50,
        fontSize: 50

    },
  });

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        pruebaRedux: pruebaRedux
    },dispatch)
  }
  const mapStateToProps = state => {
    return{
        contador: state.user.contador
    }
  }


  
  export default connect(mapStateToProps, mapDispatchToProps)(Home)