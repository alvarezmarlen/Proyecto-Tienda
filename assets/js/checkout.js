

import { articulosJSON } from './main.js';




let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

carrito = aCarritoMinimo(carrito);
guardarCarrito();

function aCarritoMinimo(lista) {
  const map = new Map(); // id -> cantidad

  for (const item of (Array.isArray(lista) ? lista : [])) {
    const id = Number(item.productID ?? item.produtID ?? item.id);
    if (!Number.isFinite(id)) continue;

    const cantidad = Number(item.cantidad ?? 1);
    const cantidadSegura = Number.isFinite(cantidad) && cantidad > 0 ? cantidad : 1;

    map.set(id, (map.get(id) ?? 0) + cantidadSegura);
  }

    return [...map.entries()].map(([id, cantidad]) => ({
    productID: id, // para catalogo.js
    produtID: id,  // para detalle.js
    cantidad
  }));
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

