import React from "react";
import {View,Text,Button,ScrollView,ActivityIndicator,Image,StyleSheet  } from "react-native";
import { connect } from 'react-redux';
import backendUrl from '../../utils/backendUrl'
import { SET_PRODUCTOS_CARRITO } from "../../../constantes/login";
import ShowProductCard from '../../../components/ProductCard'

class MostrarCarrito extends React.Component{

    loadProducts = async (productos) =>{
        var productosCargados = null
            if (!productos) {
              console.log("No hay productos para buscar")
            }else{
           const url = backendUrl+"/products/getByIds"
            await fetch(url, {
              method:"POST",
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },             
              body: JSON.stringify({
                idProductos : productos
              })
            })
            .then(function(response){
              return response.json()             
            })
            .then(function(rta){
                productosCargados = rta
            }
            ).catch((e)=>{
              console.log(e)
            })
          }
          return productosCargados
    }
   async componentDidMount(){
     const {productos,idProductos,setProductsStore} = this.props
     if(!productos && idProductos){
       const products = await this.loadProducts(idProductos)
       setProductsStore(products)
     }
      
    }
    calcularPrecioTotalCarrito = (productos) => {
      var precioTotal = 0
      productos.forEach(producto => {
        precioTotal = producto.precio + precioTotal
      });
      return precioTotal
    }

    render(){
      const {productos} = this.props
      if(productos && productos.lenght != 0){
        var precioTotal = this.calcularPrecioTotalCarrito(productos)
        var tituloBoton = "Comprar   ( $"+precioTotal+")"
        return(
        <React.Fragment>
          <ScrollView>
            {productos.map((producto) =>
             {
               return(
                 ShowProductCard(producto)
                 )})}
          </ScrollView>
               <Button color="#008000" title={tituloBoton}></Button>
        </React.Fragment>
        )
      }else{
          return(
            <View>
              <Text style={{width:'50%',fontSize:25, marginLeft:'23%', marginTop:'50%'}}>Su carrito esta vacio</Text>
              <Button style={{width:10, marginTop:125}} color="green" title="Ir a comprar"></Button>
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
        backgroundColor:"#FFFFFF"
        //resizeMode: 'stretch',
      },
    });

const mapStateToProps = state => {
    return{
        productos: state.user.productos,
        idProductos:state.user.idProductos
    }
  }
  const mapDispatchToProps = dispatch => {
    return {     
      setProductsStore: (productos) => dispatch({type:SET_PRODUCTOS_CARRITO,data:productos}),
    }
  }


  
  export default connect(mapStateToProps, mapDispatchToProps)(MostrarCarrito)