export const buildItemsPicker = (provincias) => {
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

  export const buildItemsPickerMunicipio = (municipios) =>{
    var items = []
    if(municipios){
      municipios.municipios.map((municipio,key) => {
        items.push({
          label: municipio.nombre,
          value: municipio.nombre,
        })
      })
    }

    return items
  }