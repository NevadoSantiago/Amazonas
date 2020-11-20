import React from 'react'
import {View,Text,ActivityIndicator,StyleSheet,ImageBackground,
  ScrollView,Modal,TouchableHighlight } from "react-native";
import {connect} from 'react-redux'
import RegisterForm from "../Usuario/RegisterForm";
import { calcularPrecioTotalCarrito } from '../../../functions/FuncionesCarrito'
import { Card,  Icon,Input,Button } from 'react-native-elements'
import FlipCard from 'react-native-flip-card'
import RNPickerSelect from 'react-native-picker-select';
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
  buildItemsPicker = () => {
    const {provincias} = this.state
    var items = []
    if(provincias){
      provincias.map((provincia,key) => {
        items.push({
          label: provincia.nombre,
          value: provincia.id,
        })
      })
    }

    return items
  }
  searchMunicipios = async (codProvincia) => {
    const municipios = await this.loadMunicipios(codProvincia)
    this.setState({
      municipios
    })
  }
  loadMunicipios = async (codProvincia)=>{
    this.setState({
      provinciaSeleccionada : codProvincia
    })
    const url = "https://apis.datos.gob.ar/georef/api/municipios?provincia="+ codProvincia +"&campos=id,nombre&max=1000"
    console.log(url)
    var municipios
    await fetch(url, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (rta) {
       municipios = rta
      }
      )
    return municipios

  }
  buildItemsPickerMunicipio = () =>{
    const {municipios} = this.state
    var items = []
    if(municipios){
      console.log("LOS MUNICIPIOS")
      console.log(municipios.municipios)
      municipios.municipios.map((municipio,key) => {
        items.push({
          label: municipio.nombre,
          value: municipio.nombre,
        })
      })
    }

    return items
  }
  showModal = () => {
    const { modalVisible,altura,municipios} = this.state
    const itemsPicker = this.buildItemsPicker()
    var itemsPickerMunicipios = []
    if(municipios){
       itemsPickerMunicipios = this.buildItemsPickerMunicipio()
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
  loadProvincias = async () => {
    const url = "https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre"
    var provincias
    await fetch(url, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (rta) {
        provincias = rta
      }
      )
    return provincias
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
    const provincias =await this.loadProvincias()
    this.setState({
      provincias : provincias.provincias
    })
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
showCard=()=>{
  return(
    <FlipCard 
     style={{marginTop:-200}}
     friction={15}
     perspective={4000}
     flipHorizontal={true}
     flipVertical={false}
     flip={this.state.flip}
     clickable={false}
     onFlipEnd={()=>{this.setState({flip:false})}}
     >
     {/* Face Side */}
     <View style={styles.face}>
         <ImageBackground style={styles.image} source={require('../../imagenes/Adverso.png')}>
         <View>
             <Text style={{marginLeft:50}}>
                 Hola
             </Text>
         </View>
         </ImageBackground>
     </View>
     {/* Back Side */}
     <View style={styles.back}>
         <ImageBackground style={styles.image}  source={require('../../imagenes/reverso.png')}>
             <View>
             <Input
               placeholder="Correo electronico"
               containerStyle={styles.inputForm}
               onChange={e => setEmail(e.nativeEvent.text)}
             />
             </View>
         </ImageBackground>
     </View>
     </FlipCard>
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
              {/* {this.showCard()} */}
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