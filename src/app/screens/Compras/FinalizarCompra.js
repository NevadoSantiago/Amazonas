import React from 'react'
import {View,Text,ActivityIndicator,StyleSheet,ImageBackground,
  ScrollView,Modal,TouchableHighlight } from "react-native";
import {connect} from 'react-redux'
import RegisterForm from "../Usuario/RegisterForm";
import { calcularPrecioTotalCarrito } from '../../../functions/FuncionesCarrito'
import { Card,  Icon,Input,Button } from 'react-native-elements'
import FlipCard from 'react-native-flip-card'
import RNPickerSelect from 'react-native-picker-select';
import {loadMunicipios,loadProvincias} from '../../../functions/FetchService'
import {buildItemsPicker, buildItemsPickerMunicipio} from '../../../functions/Utils'
const longitudDesdeadaInput = {
  numeroTarjetaInput:16,
  vencimientoInput:5,
  codigoSeguridadInput:3
}

class FinalizarCompra extends React.Component{
  constructor(props){
    super(props)
    this.state={
      flip:false,
      precioCompra:null,
      impuesto:null,
      envio:null,
      precioTotal:null,
      numeroTarjeta:"",
      vencimiento:"",
      nombreTitular:"",
      codigoSeguridad:"",
      modalVisible:false,
      direccion:null,
      altura:null,
      provincias:null,
      municipios:null,
      provinciaSeleccionada:null,
      municipioSeleccionado:null
    }
  }
  async componentDidMount (){
    const {productos} = this.props
    const precioCompra =calcularPrecioTotalCarrito(productos)
    const impuesto = precioCompra * 0.06
    const envio = 450
    const precioTotal = precioCompra + impuesto+envio
    this.setState({
      precioCompra,
      impuesto,
      envio,
      precioTotal,
    })
    const provincias =await loadProvincias()
    this.setState({
      provincias : provincias.provincias
    })
  }

  searchMunicipios = async (codProvincia) => {
    this.setState({
      provinciaSeleccionada : codProvincia
    })
    const municipios = await loadMunicipios(codProvincia)
    this.setState({
      municipios
    })
  }


  showModal = () => {
    const { modalVisible,altura,municipios,provincias} = this.state
    const itemsPicker = buildItemsPicker(provincias)
    var itemsPickerMunicipios = []
    if(municipios){
       itemsPickerMunicipios = buildItemsPickerMunicipio(municipios)
    }
    if (modalVisible) {
      return (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            visible={modalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View>
                  <Text>Provincia</Text>
                  <RNPickerSelect       
                    placeholder={{
                    label:"Seleccione una provincia",
                    value:null
                    }                
                    }         
                  onValueChange={(value) =>
                    this.searchMunicipios(value)
                  }
                  items={itemsPicker}
                />
                <Text>Municipio</Text>
                 <RNPickerSelect  
                 placeholder={{
                  label:"Seleccione un municipio",
                  value:null
                 }                
                 }    
                 disabled={itemsPickerMunicipios.length==0}             
                  onValueChange={(value) =>
                    console.log(value)
                  }
                  items={itemsPickerMunicipios}
                />
                  <Input
                    placeholder="Calle Falsa 123"
                    label="Direccion"
                    containerStyle={styles.inputUbicacion}
                    onChange={e => this.setState({
                      direccion : e.nativeEvent.text
                    })}
                  />
                    <Input
                    placeholder="NNN"
                    label="Altura"
                    containerStyle={styles.inputUbicacion}
                    onChange={e => this.setState({
                      altura : e.nativeEvent.text
                    })}
                  />
                </View>
                <Button
                buttonStyle={styles.botonComprar}
                disabled={altura==null}
                title="Comprar"
                onPress={()=>this.setState({modalVisible:true})}>
                </Button>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#EC7063"  }}
                  onPress={() => {
                    this.setState({modalVisible:false});
                  }}
                >
                  <Text style={styles.textStyle}>Cerrar</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
      );
    }

  }
  chequearDatosIngresados = ()=>{
    const {numeroTarjeta,vencimiento,nombreTitular,codigoSeguridad} = this.state
    const {numeroTarjetaInput, vencimientoInput, codigoSeguridadInput} = longitudDesdeadaInput
    if(numeroTarjeta.length==numeroTarjetaInput && 
      vencimiento.length == vencimientoInput&& 
      nombreTitular && 
      codigoSeguridad.length==codigoSeguridadInput){
      return false
    } else return true
  }


  showFormDataCard=()=>{
    const {numeroTarjetaInput, vencimientoInput, codigoSeguridadInput} = longitudDesdeadaInput
    return(
      <View style={{marginTop:30,flex:2,flexDirection:"column"}}>
        <View style={{flex:0,flexDirection:"row"}}>
          <Input
          maxLength={numeroTarjetaInput}
          placeholder="0000-0000-0000-0000"
          label="Numero tarjeta"
          containerStyle={styles.inputNumeroTarjeta}
          onChange={e => this.setState({
            numeroTarjeta : e.nativeEvent.text
          })}
        />
        <Input
          maxLength={vencimientoInput}
          placeholder="00/00"
          label="Vencimiento"
          containerStyle={styles.inputVencimiento}
          onChange={e => this.setState({
            vencimiento : e.nativeEvent.text
          })}
        />
        </View>
        <View style={{flex:1,flexDirection:"row"}}>
          <Input
          maxLength={40}
          placeholder="Bob Esponja"
          label="Nombre titular"
          containerStyle={styles.inputTitular}
          onChange={e => this.setState({
            nombreTitular : e.nativeEvent.text
          })}
        />
        <Input
          maxLength={codigoSeguridadInput}
          placeholder="***"
          label="Codigo Seguridad"
          containerStyle={styles.inputCodigo}
          onChange={e => this.setState({
            codigoSeguridad : e.nativeEvent.text
          })}
        />
        </View>
        </View>

      

    )

  }
  showTotalCard=()=>{
    const{precioTotal,envio,impuesto,precioCompra} = this.state

    return (
        <Card >
          <Card.Title style={{ fontSize: 20, marginRight: 25 }}>
            Total de la compra
          </Card.Title>
          <View>
            
            <View className="row">
                <View>
                    <Text > 
                        Compra:  ${precioCompra}
                    </Text>
                </View>
                <View>
                    <Text >
                        Impuesto  ${impuesto}
                    </Text>
                </View>
                <View>
                    <Text>
                        Envio  ${envio}
                    </Text>
                </View>
            </View>
            <Card.Divider />
            <Text style={{ marginTop: 10, fontWeight: "bold", width: 500, marginLeft: 0, fontSize: 17 }}>
              Total = ${precioTotal}
              </Text>
          </View>
        </Card>
        
      )
  }


    render(){
        const {productos,mailUsuario} = this.props
       
        if(!mailUsuario){
            return(
                <RegisterForm></RegisterForm>
            )
        }else if(productos && productos.length > 0){
          var botonHabilitado = this.chequearDatosIngresados()
          return(
            <React.Fragment>
              <ScrollView >
              {this.showModal()}
              {this.showTotalCard()}
              {this.showFormDataCard()}
              </ScrollView>
                <Button 
                buttonStyle={styles.botonSiguiente}
                disabled={botonHabilitado}
                title="Siguiente"
                onPress={()=>this.setState({modalVisible:true})}
                ></Button>

            </React.Fragment>
           
          )
         
        }else if( productos && productos.length > 0) {
            return(<View>
              <Text>
                No hay productos
              </Text>
            </View>)
        }else{
          return(<ActivityIndicator></ActivityIndicator>)

        }

    }
}
const mapStateToProps = state => {
    return {
      productos: state.user.productos,
      mailUsuario: state.user.mailUsuario,
      idProductos: state.user.idProductos
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      setProductsStore: (productos) => dispatch({ type: SET_PRODUCTOS_CARRITO, data: productos }),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(FinalizarCompra)

  const styles = StyleSheet.create({
    inputUbicacion:{
      width:300
    },
    botonSiguiente:{
      width:"80%",
      marginLeft:"10%",
      marginBottom:20,
      borderRadius:10,
      backgroundColor:"#5499C7"
      
    },
    botonComprar:{
      borderRadius: 10,
      padding: 10,
      elevation: 2,
      width: 300,
      marginTop:10,
      backgroundColor:"#2ECC71"
      
    },
    back: {
        height: 250,
    },
    face: {
      height: 250
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
    card: {
      marginTop: 20,
      alignSelf: "center"
    },
    inputForm:{
      marginTop: 20,
      alignSelf: "center"
    },
    textoNumeroTarjeta:{
      marginLeft:8,
      marginTop:10,
      fontSize:25
    },
    inputNumeroTarjeta:{
      width:"50%"
    },
    inputVencimiento:{
      marginLeft:"10%",
      width:"30%"
    },
    inputTitular:{
      width:"50%"
    },
    inputCodigo:{
      marginLeft:"10%",
      width:"40%",
      textAlign:"center"
    },
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
      width: 350,
      height: 600,
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
      backgroundColor: "#EC7063",
      borderRadius: 10,
      padding: 10,
      elevation: 2,
      width: 300,
      marginTop:10
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      fontWeight: "bold",
      fontSize: 30,
      marginBottom: 15,
      textAlign: "center"
    }
    
  })