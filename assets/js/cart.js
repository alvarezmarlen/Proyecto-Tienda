
// 1. el carrito no guarda toda la info del producto (solo "id + cantidad"),
// obtiene los datos que están almacenados como objetos JSON en el main:


import { articulosJSON } from './main.js';


// 2.1. al abrir la página, se lee el carrito que ya está guardado en Local Storage, ya sea desde el catálogo o desde la ventana de detalles, y pasa de ser un JSON a ser un array de JavaScript:

let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

// 2.2. debe "normalizarlo" para que funcione bien, debido a discordancias de nomenclaturas en las fuentes que guardan el carrito en el Local Storage (catálogo, detalle):

carrito = normalizarCarrito(carrito);
guardarCarrito();

// 2.3. con este map, saca el 'id' de todos los items y lo convierte en un número 
// para evitar datos duplicados, limpiar cantidades raras (0, negativas):

function normalizarCarrito(lista) {
  const map = new Map();

  for (const item of (Array.isArray(lista) ? lista : [])) {
    const id = Number(item.productID ?? item.produtID ?? item.id);
    if (!Number.isFinite(id)) continue;

    const cantidad = Number(item.cantidad ?? 1);
    const cantidadSegura = Number.isFinite(cantidad) && cantidad > 0 ? cantidad : 1;

    map.set(id, (map.get(id) ?? 0) + cantidadSegura);
  }

  // 2.4. esto devuelve el array "normalizado", ya con ambos nombres de 'id' igualados:
  
  return [...map.entries()].map(([id, cantidad]) => ({
    productID: id, // para catalogo.js
    produtID: id,  // para detalle.js
    cantidad
  }));
}

// 3. GUARDA EL CARRITO EN LOCAL STORAGE, CONVIRTIENDO EL ARRAY ANTERIOR EN UN STRING JSON:

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// 4. AQUÍ SE CONECTA EL CARRITO CON EL CATÁLOGO:

// 4.1. empieza sacando el 'id' sin importar cómo se llame la forma en que fue guardado en el origen:

function getId(item) {
  return Number(item.productID ?? item.produtID);
}

// 4.2. busca el producto real en articulosJSON, es decir, busca en el catálogo el objeto que tenga ese id:

function getProductoPorId(id) {
  return articulosJSON.find(p => Number(p.produtID ?? p.productID) === id);
}



// 5. ESTA FUNCIÓN ES PARA RESOLVER DISCREPANCIAS ENTRE FORMATOS Y RUTAS DE LAS IMÁGENES

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


// 6. AQUÍ SE RECOGEN LOS ELEMENTOS DEL DOM:

const divisa = '€';
const DOMitems = document.querySelector('#cart-items');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#btn-empty');
const DOMbotonCheckout = document.querySelector('#btn-checkout');



// 7. RENDERIZAR:

// 7.1. acá busca que el sistema no trabaje si en el DOM no existen #cart-items o #total:

function renderizarCarrito() {
  if (!DOMitems || !DOMtotal) return;

// 7.2. acá vacía el contenedor, para que no se dupliquen productos al volver a renderizar:
  DOMitems.textContent = '';

// 7.3. de cada 'compra' indicada por el usuario obtiene el id, busca el producto real y crea una tarjeta (div)

  carrito.forEach((compra) => {
    const id = getId(compra);
    const producto = getProductoPorId(id);

// 7.4. esto pone un nombre y precio seguros si el producto no está en el catálogo, para no romper las operaciones de los botones:
    const nombre = producto?.productName ?? `Producto #${id}`;
    const precio = Number(producto?.precio ?? 0);
 
 // 7.5. si acaso no se establece un stock, se asume uno enorme para no bloquear las sumas:
    const stock = Number(producto?.stock ?? 999999);

  // 7.6. acá se activa la resolución de conflictos en origen de imágenes de productos:
    const imagen = resolverImagen(producto?.imagen ?? "");

  // 7.7. crea las tarjetas:
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
    btnRestar.dataset.id = String(id); // se usa 'dataset.id' para que el botón sepa qué producto está tocando, según su id.
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

    // Evitar que alguien supere stock si stock existe:
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

// 8. CALCULA EL TOTAL, multiplicando precio por cantidad de cada item y ajustándolo a dos decimales:

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

// 9. BOTONES DE COLUMNA IZQUIERDA (PRODUCTOS SELECCIONADOS):

// 9.1. botón para aumentar (lee el id, busca la compra en carrito, y si hay stock disponible aumenta la cantidad en 1):

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

// 9.2. botón para disminuir (lee el id, si la cantidad actual es mayor que 1 lo resta, si es 1 lo elimina):

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

// 9.3. botón para eliminar el item completo:

function eliminarItem(event) {
  const id = Number(event.target.dataset.id);
  if (!Number.isFinite(id)) return;

  carrito = carrito.filter(i => getId(i) !== id);
  guardarCarrito();
  renderizarCarrito();
}

// 10. BOTONES DE COLUMNA DERECHA (SUMARIO)

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

// 11. RENDER 

renderizarCarrito();