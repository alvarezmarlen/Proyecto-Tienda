

import { articulosJSON } from './main.js';




let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");


// INICIO DEL ADAPTADOR DE CARRITO EN LOCAL STORAGE DESDE CATÁLOGO, DESTACADOS Y DETALLE //

function aCarritoMinimo(lista) {
  const map = new Map(); // id -> cantidad

  for (const item of (Array.isArray(lista) ? lista : [])) {
    const id = Number(item.productID ?? item.produtID ?? item.id);
    if (!Number.isFinite(id)) continue;

    const cantidad = Number(item.cantidad ?? 1);
    const cantidadSegura = Number.isFinite(cantidad) && cantidad > 0 ? cantidad : 1;

    map.set(id, (map.get(id) ?? 0) + cantidadSegura);
  }

  // esto devuelve un array mínimo (con ambos nombres de ID para compatibilidad)
  return [...map.entries()].map(([id, cantidad]) => ({
    productID: id, // para catalogo.js
    produtID: id,  // para detalle.js
    cantidad
  }));
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}


// OBTENER PRODUCTO REAL DESDE MAIN


function getId(item) {
  return Number(item.productID ?? item.produtID);
}

function getProductoPorId(id) {
  return articulosJSON.find(p => Number(p.produtID ?? p.productID) === id);
}

// IGUALADOR DE DIRECTORIOS DE IMÁGENES


function resolverImagen(path) {
  if (!path) return "";

  if (
    path.startsWith("http") ||
    path.startsWith("/") ||
    path.startsWith("../") ||
    path.startsWith("./")
  ) return path;

  if (!path.includes("assets")) return `../assets/${path}`;
  return `../${path}`;
}


//////////////////////////////////////////////////////////////////



// ELEMENTOS DEL DOM

const divisa = '€';
const DOMitems = document.querySelector('#cart-items');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#btn-empty');
const DOMbotonCheckout = document.querySelector('#btn-checkout');

// RENDER Y CÁLCULOS

function renderizarCarrito() {
  if (!DOMitems || !DOMtotal) return;

  DOMitems.textContent = '';

  carrito.forEach((compra) => {
    const id = getId(compra);
    const producto = getProductoPorId(id);

    // Si por alguna razón no existe el producto en main.js, mostramos algo “seguro”
    const nombre = producto?.productName ?? `Producto #${id}`;
    const precio = Number(producto?.precio ?? 0);
    const stock = Number(producto?.stock ?? 999999);
    const imagen = resolverImagen(producto?.imagen ?? "");

    // Tarjeta
    const miProductoCard = document.createElement('div');
    miProductoCard.classList.add('cart-item');

    const miProductoName = document.createElement('h5');
    miProductoName.classList.add('cart-items-name');
    miProductoName.textContent = nombre;

    const miProductoImagen = document.createElement('img');
    miProductoImagen.classList.add('cart-items-image');
    miProductoImagen.setAttribute('src', imagen);
    miProductoImagen.setAttribute('alt', nombre);

    const miProductoPrecio = document.createElement('p');
    miProductoPrecio.classList.add('cart-items-precio');
    miProductoPrecio.textContent = `${precio.toFixed(2)}${divisa}`;

    // Botones cantidad
    const btnRestar = document.createElement('button');
    btnRestar.textContent = '-';
    btnRestar.classList.add('quantity-button');
    btnRestar.dataset.id = String(id);
    btnRestar.addEventListener('click', disminuirCantidad);

    const btnSumar = document.createElement('button');
    btnSumar.textContent = '+';
    btnSumar.classList.add('quantity-button');
    btnSumar.dataset.id = String(id);
    btnSumar.addEventListener('click', aumentarCantidad);

    const cantidadEnCarrito = document.createElement('span');
    cantidadEnCarrito.textContent = String(compra.cantidad);
    cantidadEnCarrito.classList.add('quantity-display');

    // Subtotal: se calcula con precio desde main.js
    const miProductoSubtotal = document.createElement('p');
    miProductoSubtotal.classList.add('item-subtotal');
    miProductoSubtotal.textContent =
      (precio * Number(compra.cantidad)).toFixed(2) + ` ${divisa}`;

    // Eliminar
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar del carrito';
    btnEliminar.classList.add('remove-btn');
    btnEliminar.dataset.id = String(id);
    btnEliminar.addEventListener('click', eliminarItem);

    // Montaje
    miProductoCard.appendChild(miProductoImagen);
    miProductoCard.appendChild(miProductoName);
    miProductoCard.appendChild(miProductoPrecio);

    miProductoCard.appendChild(btnRestar);
    miProductoCard.appendChild(cantidadEnCarrito);
    miProductoCard.appendChild(btnSumar);

    miProductoCard.appendChild(miProductoSubtotal);
    miProductoCard.appendChild(btnEliminar);

    DOMitems.appendChild(miProductoCard);

    // (Opcional) Si quieres evitar que alguien supere stock si stock existe:
    if (Number(compra.cantidad) > stock) {
      compra.cantidad = stock;
      guardarCarrito();
      cantidadEnCarrito.textContent = String(compra.cantidad);
      miProductoSubtotal.textContent =
        (precio * Number(compra.cantidad)).toFixed(2) + ` ${divisa}`;
    }
  });

  DOMtotal.textContent = calcularTotal();
}

function calcularTotal() {
  return carrito
    .reduce((acc, compra) => {
      const id = getId(compra);
      const producto = getProductoPorId(id);
      const precio = Number(producto?.precio ?? 0);
      return acc + precio * Number(compra.cantidad);
    }, 0)
    .toFixed(2);
}

// BOTONES DE COLUMNA IZQUIERDA

function aumentarCantidad(event) {
  const id = Number(event.target.dataset.id);
  if (!Number.isFinite(id)) return;

  const compra = carrito.find(i => getId(i) === id);
  if (!compra) return;

  const producto = getProductoPorId(id);
  const stock = Number(producto?.stock ?? 999999);

  if (compra.cantidad < stock) {
    compra.cantidad++;
    guardarCarrito();
    renderizarCarrito();
  }
}

function disminuirCantidad(event) {
  const id = Number(event.target.dataset.id);
  if (!Number.isFinite(id)) return;

  const compra = carrito.find(i => getId(i) === id);
  if (!compra) return;

  if (compra.cantidad > 1) {
    compra.cantidad--;
  } else {
    carrito = carrito.filter(i => getId(i) !== id);
  }

  guardarCarrito();
  renderizarCarrito();
}

function eliminarItem(event) {
  const id = Number(event.target.dataset.id);
  if (!Number.isFinite(id)) return;

  carrito = carrito.filter(i => getId(i) !== id);
  guardarCarrito();
  renderizarCarrito();
}

// BOTONES DE COLUMNA DERECHA

if (DOMbotonVaciar) {
  DOMbotonVaciar.addEventListener('click', () => {
    carrito = [];
    localStorage.removeItem('carrito');
    renderizarCarrito();
  });
}

if (DOMbotonCheckout) {
  DOMbotonCheckout.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    window.location.href = "/pages/checkout.html";
  });
}

// RENDER

renderizarCarrito();