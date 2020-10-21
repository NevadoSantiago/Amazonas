import React from "react";
import { connect } from 'react-redux';
import { ADD_PRODUCT_CARRITO, SET_PRODUCTOS } from '../constantes/productos'
import { Card, Button, Icon } from 'react-native-elements'
import { agregarProductoCarrito } from '../functions/FuncionesCarrito'
import store from '../reduxFile/store/store'
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { Slider } from 'react-native-elements';
import { Divider } from '@material-ui/core';


class ProductosCategoria extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      productosCategoria: null,
      modalVisible: false,
      productoSeleccionado: null,
      value: 1
    }
  }
  setModalVisible = (visibilidad) => {
    this.setState({
      modalVisible: visibilidad
    })
  }

  showModal = () => {
    const { modalVisible, productoSeleccionado } = this.state
    if (modalVisible) {
      return (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{productoSeleccionado.nombre}</Text>
                <Text style={{fontSize:15}}>{productoSeleccionado.descripcion}</Text>
                <Image
                  style={styles.tinyLogo}
                  source={{ uri: productoSeleccionado.url }}>

                </Image>
                <Text style={{ fontWeight: "bold", fontSize: 30 }}>Cantidad: {this.state.value}</Text>
                <Slider
                  style={{ width: "100%" }}
                  value={this.state.value}
                  onValueChange={(value) => this.setState({ value })}
                  thumbStyle={{ height: 20, width: 20, backgroundColor: "#2196F3" }}
                  maximumValue={10}
                  minimumValue={1}
                  step={1}

                />
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                  }}
                >

                  <Text style={styles.textStyle}>Agregar</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
      );
    }

  }

  agregarProductoCarritoStoreYBack = (product) => {
    var state = store.getState();
    const { setProductsStore } = this.props
    const storeCargado = agregarProductoCarrito(product, state.user.productos)
    setProductsStore(storeCargado)
    console.log(this.props)
  }

  showProductCardCatalogo = (product, logueado) => {
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
                marginLeft: 80,
                width: 70
              }}>
              <Button
                buttonStyle={{
                  borderRadius: 8,
                  borderBottomColor: "#A6B4B4"
                }}
                disabled={!logueado}
                //onPress={(e)=>{this.agregarProductoCarritoStoreYBack(product)}}
                onPress={(e) => {
                  this.setState({
                    modalVisible: true,
                    productoSeleccionado: product
                  })
                }}
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
    const { mailUsuario } = this.props
    var logueado
    if (mailUsuario) {
      logueado = true
    } else {
      logueado = false
    }
    return ( 
        <ScrollView>
        {productos.map((producto, key) => {
          producto.key = key
          return (
            this.showProductCardCatalogo(producto, logueado)
          )
        })}
      </ScrollView>
      )
  }

  render() {
    const { productosCategoria } = this.props

    if (productosCategoria) {
      return (
        <View style={{marginBottom:110}}>
          {this.showModal()}
          {this.showProducts(productosCategoria)}
        </View>

      )
    } else {
      return (<ActivityIndicator />)
    }
  }

}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
  modalView: {
    width: 400,
    height: 500,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 300,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontWeight: "bold",
    fontSize: 50,
    marginBottom: 15,
    textAlign: "center"
  }
});



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
