import React from 'react';
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
import {pruebaRedux} from '../../reduxFile/actions'
import { Button, Text,View,StyleSheet } from 'react-native';
import RegisterForm from '../RegisterForm';

class Home extends React.Component{

    render(){
        return(
            <View>
                <RegisterForm />
            </View>
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