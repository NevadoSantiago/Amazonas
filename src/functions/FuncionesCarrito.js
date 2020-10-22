import React from "react";

export const calcularPrecioTotalCarrito = (productos) =>{
    var precioTotal = 0
    productos.forEach(producto => {
        precioTotal = producto.precio + precioTotal
      });

    return precioTotal
}

export const agregarProductoCarrito = (producto,store,cantidad) =>{

  if(store){
    for(var i =0; i<cantidad; i++){
      store.push(producto)
    }
    return store;
  }else{
    var storeCargado = []
    for(var i =0; i<cantidad; i++){
      storeCargado.push(producto)
    }
    return storeCargado
  }

}
