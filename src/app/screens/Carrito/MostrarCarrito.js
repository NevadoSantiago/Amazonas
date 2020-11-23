import React from "react";
import { View, Text, Button, ScrollView, ActivityIndicator, Image, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import backendUrl from '../../utils/backendUrl'
import { SET_PRODUCTOS_CARRITO } from "../../../constantes/login";
import { showProductCardCarrito } from '../../../components/ProductCard'
import { calcularPrecioTotalCarrito } from '../../../functions/FuncionesCarrito'
import { withNavigation } from "react-navigation";
import {loadProducts} from '../../../functions/FetchService'

class MostrarCarrito extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false
    }
  }


  async componentDidMount() {
    const { productos, idProductos, setProductsStore } = this.props
    if (!productos && idProductos) {
      const products = await loadProducts(idProductos)
      setProductsStore(products)
    }

  }


  render() {
    const { productos } = this.props
    if (productos && productos.length != 0) {
      var precioTotal = calcularPrecioTotalCarrito(productos)
      var tituloBoton = "Comprar   ( $" + precioTotal + ")"
      return (
        <React.Fragment>
          <ScrollView>

            {productos.map((producto, key) => {
              return (
                showProductCardCarrito(producto)
              )
            })}
          </ScrollView>
          <Button onPress={()=>{this.props.navigation.navigate("FinalizarCompra",{precioTotal:{precioTotal}})}} color="#008000" title={tituloBoton}></Button>
        </React.Fragment>
      )
    } else {
      return (
        <View>
          <Text style={{ width: '50%', fontSize: 25, marginLeft: '23%', marginTop: '50%' }}>Su carrito esta vacio</Text>
          <Button style={{ width: 10, marginTop: 125 }} color="green" title="Ir a comprar"></Button>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  stretch: {
    width: '100%',
    height: '50%',
    backgroundColor: "#FFFFFF"
    //resizeMode: 'stretch',
  },
});

const mapStateToProps = state => {
  return {
    productos: state.user.productos,
    idProductos: state.user.idProductos
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setProductsStore: (productos) => dispatch({ type: SET_PRODUCTOS_CARRITO, data: productos }),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(MostrarCarrito))