import React from "react";

export const calcularPrecioTotalCarrito = (productos) =>{
    var precioTotal = 0
    productos.forEach(producto => {
        precioTotal = producto.precio + precioTotal
      });

    return precioTotal
}
