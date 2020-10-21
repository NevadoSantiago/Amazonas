import React from "react";

export const calcularPrecioTotalCarrito = (productos) =>{
    var precioTotal = 0
    productos.forEach(producto => {
        precioTotal = producto.precio + precioTotal
      });

    return precioTotal
}

export const agregarProductoCarrito = (producto,store) =>{

  if(store){
    store.push(producto)
    return store;
  }else{
    return [producto]
  }

}
