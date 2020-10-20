import React from "react";
import { connect } from "react-redux"
import { Text, View} from "react-native";
import { SET_CATEGORIAS, SET_PRODUCTOS } from '../../../constantes/productos'
import backendUrl from '../../utils/backendUrl'
import ProductosCategoria from '../../../components/ProductosCategoria'
import RNPickerSelect from 'react-native-picker-select';
import { SearchBar } from 'react-native-elements';

var productosMostradosConFiltro = null

class CatalogoScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      categoriaSeleccionada: null,
      productosCategoria: null,
      productosMostrados:null,
      search: null,
      categoriaSeleccionada:null
    }
  }

  loadCategorias = async () => {
    var categoriasCargadas

    const url = backendUrl + "/categorias/"
    await fetch(url, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (rta) {
        categoriasCargadas = rta
      }
      )

    return categoriasCargadas
  }
  cargarProductosYCaracteristicasStore = async () => {
    const { setCategorias, categorias, setProductsStore } = this.props
    if (!categorias) {
      const categoriasBack = await this.loadCategorias()
      const productosBack = await this.getProducts()
      const guardarStore = {
        categorias: categoriasBack,
        productos: productosBack
      }
      this.setState({
        productosCategoria: productosBack,
        productosMostrados: productosBack
      })
      setCategorias(guardarStore);
      // setProductsStore(productosBack);


    }
  }

  async componentDidMount() {
    await this.cargarProductosYCaracteristicasStore();
  }
  getProducts = async () => {
    const url = backendUrl + '/products/'
    var productosCargados
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
        productosCargados = rta
      }
      )
    return productosCargados
  }
  buildItemsPicker = (categorias) => {
    var items = []
    items.push({
      label:"Mostrar todo",
      value:"Todo"
    })
    categorias.map((categoria) => {
      items.push({
        label: categoria.categoria,
        value: categoria.categoria,
        filtro:{
          porNombre:null,
          porCategoria:null
        }
      })
    })
    return items
  }

   loadProductosCaracteristica(categoriaSeleccionada) {
    const { productos } = this.props
    if(categoriaSeleccionada == "Todo"){
      this.setState({
        productosCategoria:productos,
        productosMostrados: productos
      })
    }else{
      var productosFiltrados = productos.filter((producto) => producto.categoria == categoriaSeleccionada)
      this.setState({
        productosCategoria:productosFiltrados,
        productosMostrados: productosFiltrados
      })
    }

    

  }
  filtroBusqueda(filtro) {
    const { productosCategoria } = this.state
    if(filtro.length == 0){
      this.setState({
        productosMostrados: productosCategoria
      })
    }else{
        var productosFiltrados = productosCategoria.filter((producto)=> producto.nombre.toUpperCase().startsWith(filtro.toUpperCase()))
      this.setState({
        productosMostrados: productosFiltrados
      })

    }

  }

  searchBar = () => {
    const { search } = this.state
    return (
      <SearchBar
        placeholder="Filtrar por nombre"
        onChangeText={(e) => this.filtroBusqueda(e)}
        value={search}
        lightTheme={true}
        platform="android"
      />
    );
  }

  render() {
    const { categorias } = this.props
    const { productosMostrados } = this.state
    if (categorias && productosMostrados) {
      const items = this.buildItemsPicker(categorias)
      return (
        <React.Fragment>
          <RNPickerSelect
            onValueChange={(value) =>
              this.loadProductosCaracteristica(value)
            }
            items={items}
          />
          {this.searchBar()}
          <ProductosCategoria productosCategoria={productosMostrados} />
        </React.Fragment>
      )
    }
    else {
      return (<Text>Hola</Text>)
    }

  }
}


const mapStateToProps = state => {
  return {
    categorias: state.catalogo.categorias,
    productos: state.catalogo.productos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCategorias: (categorias) => dispatch({ type: SET_CATEGORIAS, data: categorias }),
    setProductsStore: (productos) => dispatch({ type: SET_PRODUCTOS, data: productos }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogoScreen)