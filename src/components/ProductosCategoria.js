import React from "react";
import { ScrollView, Text, ActivityIndicator,View } from "react-native";
import { connect } from 'react-redux';
import backendUrl from '../app/utils/backendUrl'
//import {showProductCardCatalogo} from '../components/ProductCard'
import {SET_PRODUCTOS} from '../constantes/productos'
import { Card, Button, Icon } from 'react-native-elements'


class ProductosCategoria extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      productosCategoria: null
    }
  }

   showProductCardCatalogo = (product,logueado) => {
    return (
      <Card >
        <Card.Title style={{ fontSize: 20, marginRight: 25 }}>
          {product.nombre}
        </Card.Title>
        <View>
          <Card.Divider />
          <Card.Image style={{ width: 200, marginLeft: 60, height: 200, marginStart: 200 }} source={{ uri: product.url }} />
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ marginTop: 10, fontWeight: "bold", width: 50, marginLeft: 150, fontSize: 17 }}>
              ${product.precio}
            </Text>
            <View          
            style={{
              marginLeft:80,
              width:70
            }}>
            <Button
            buttonStyle={{
              borderRadius:8,
              color:"#008000",
              borderBottomColor:"#A6B4B4"
            }}
            disabled={!logueado}
            onPress={(e)=>{console.log(product.nombre)}}
            icon={<Icon
              type="material-community"
              name="cart"
              size={22}
            />}></Button>
            </View>
          </View>
          <Card.Divider />
        </View>
      </Card>
    )
  
  }

  showProducts = (productos) => {
    const {mailUsuario} = this.props
    var logueado
    if(mailUsuario){
      logueado = true
    }else{
      logueado = false
    }
    return (
      <ScrollView>
        {productos.map((producto, key) => {
          return (
            this.showProductCardCatalogo(producto,logueado)
          )
        })}
      </ScrollView>)
  }

    render() {
    const { productosCategoria } = this.props
    if (productosCategoria) {
      return(
        this.showProducts(productosCategoria)
      )
    } else {
      return (<ActivityIndicator />)
    }
  }

}



const mapStateToProps = state => {
  return {
    mailUsuario: state.user.mailUsuario,
    productos: state.catalogo.productos
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setProductsStore: (productos) => dispatch({ type: SET_PRODUCTOS, data: productos }),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProductosCategoria)
