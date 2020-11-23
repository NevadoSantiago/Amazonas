import backendUrl from '../app/utils/backendUrl'

export const loadProducts = async (productos) => {
    var productosCargados = null
    if (!productos) {
      console.log("No hay productos para buscar")
    } else {
      const url = backendUrl + "/products/getByIds"
      await fetch(url, {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idProductos: productos
        })
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (rta) {
          productosCargados = rta
        }
        ).catch((e) => {
          console.log(e)
        })
    }
    return productosCargados
  }
  export const loadMunicipios = async (codProvincia)=>{

    const url = "https://apis.datos.gob.ar/georef/api/municipios?provincia="+ codProvincia +"&campos=id,nombre&max=1000"
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

  export const  loadProvincias = async () => {
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