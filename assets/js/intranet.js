/* Esta parte permite que los productos que estan en database.Json  
 se plasmen en la pagina Panel de Administracion en la tabla, 
 exactamente en el cuerpo de la tabla */
const url = "http://localhost:8000/productos";
const DOMitems = document.querySelector(".productos-items");

let productos = [];

fetch(url)
  .then(res => res.json())
  .then(data => {
    productos = data; 
<<<<<<< HEAD
    pintarProductos();
=======
    renderizarAdmin();
    modificarAdmin();
>>>>>>> 7dee8c32034e0c40af3f03f1cfa897a3ef556b26
  })
  .catch(function(error) {
    console.log(error);
  });

function pintarProductos() {
  DOMitems.innerHTML = ""; 

  productos.forEach(producto => {
    const card = document.createElement("div");
    card.style.border = "3px solid #ccc";
    card.style.margin = "10px";
    card.style.padding = "10px";
    card.style.display = "flex";
    card.style.gap = "10px";

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.productName}" width="80">

      <div>

        <h3>${producto.productName}</h3>
<div>
        <label>ID: ${producto.produtID}</label>
        <input type= "text" placeholder="${producto.produtID}">
               
        <label>Categoria: ${producto.categoria}</label>
        <input type= "text" placeholder="${producto.categoria}">

        <label>Nombre de producto: ${producto.productName}</label>
        <input type= "text" placeholder="${producto.productName}">

        <label>Precio: ${producto.precio}</label>
        <input type= "number" placeholder="${producto.precio}">

</div>

<div>

        <label>Descripción: ${producto.descripcion}</label>
        <input type= "textarea" placeholder="${producto.descripcion}">

        <label>Talla: ${producto.talla}</label>
        <input type= "text" placeholder="${producto.talla}">

        <label>Stock: ${producto.stock}</label>
        <input type= "text" placeholder="${producto.stock}">

        <label>Imagnen: ${producto.imagen}</label>
        <input type= "img" placeholder="${producto.imagen}">

</div>        

        <button id="btnModificar" type="submit">Modificar</button>
        <button id="btnBorrar" type="submit">Borrar</button>
        
      </div>
    `;

    DOMitems.appendChild(card);
  });
}

//MODIFICAR

const botonModificar = document.getElementById('btnModificar')



function modificarAdmin() {



}


//BORRAR

const botonBorrar = document.getElementById('btnBorrar')



function BorrarAdmin() {



}



botonModificar.addEventListener('click', modificarAdmin);

botonBorrar.addEventListener('click', BorrarAdmin);













/* function normalizarCarrito(carritoSinOrdenar) {
  const map = new Map();

    for (const item of (Array.isArray(carritoSinOrdenar) ? carritoSinOrdenar : [])) {
    const id = Number(item.productID ?? item.produtID ?? item.id);

    const cantidad = Number(item.cantidad);

    map.set(id, (map.get(id) ?? 0) + cantidad);
  }

  return [...map.entries()].map(([id, cantidad]) => ({
    produtID: id,
    cantidad
  }));
}
//

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}









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



function getId(item) {
  return Number(item.produtID);
}







const divisa = '€';
const DOMitems = document.querySelector('#cart-items');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#btn-empty');
const DOMbotonCheckout = document.querySelector('#btn-checkout');

 */





// Resumen: total de carrito.
/* function calcularTotal() {
  return carrito
    .reduce((acc, compra) => {
      const id = getId(compra);
      const producto = getProductoPorId(id);
      const precio = Number(producto.precio);
      return acc + precio * Number(compra.cantidad);
    }, 0)
    .toFixed(2);
}
 */
/* function aumentarCantidad(event) {
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
} */

//Resumen: Vaciar carrito
/* if (DOMbotonVaciar) {
  DOMbotonVaciar.addEventListener('click', () => {
    carrito = [];
    localStorage.removeItem('carrito');
    renderizarCarrito();
  });
}
 */

//Resumen: Pago - Checkout
/* if (DOMbotonCheckout) {
  DOMbotonCheckout.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    window.location.href = "/pages/checkout.html";
  });
}

 */



/* let catalogoActual = [];


const url="http://localhost:8000/productos"

fetch(url)
  .then(response => response.json())
  .then(articulosJSON => {
    catalogoActual = articulosJSON;
    renderizarCarrito();



  });


function getProductoPorId(id) {
  return catalogoActual.find(p => Number(p.produtID) === id);
}
 */



/* 

function renderizarCarrito() {


 DOMitems.textContent = '';

  carrito.forEach((productoEnCarrito) => {
    const id = getId(productoEnCarrito);
    const producto = getProductoPorId(id);

    const nombre = producto.productName;
    const precio = Number(producto.precio);
    const stock = Number(producto.stock);
    const imagen = resolverImagen(producto.imagen);




    const miProductoCard = document.createElement('div');
    miProductoCard.classList.add('cart-item');

    const miProductoName = document.createElement('p');
    miProductoName.classList.add('cart-items-name');
    miProductoName.textContent = nombre;

    const miProductoImagen = document.createElement('img');
    miProductoImagen.classList.add('cart-items-image');
    miProductoImagen.setAttribute('src', imagen);
    miProductoImagen.setAttribute('alt', nombre);

    const miProductoPrecio = document.createElement('p');
    miProductoPrecio.classList.add('cart-items-precio');
    miProductoPrecio.textContent = `${precio.toFixed(2)}${divisa}`;


    const btnRestar = document.createElement('button');
    btnRestar.textContent = '-';
    btnRestar.classList.add('quantity-button');
    btnRestar.dataset.id = String(id); 
    btnRestar.addEventListener('click', disminuirCantidad);
    
    btnEliminar.addEventListener("click", function()  {
      if (confirm(`¿Borrar ${producto.descripcion}?`)) {
        fetch(`http://localhost:8000/productos/${producto.id}`, {
          method: 'DELETE'
        })
        .then(() => {
          fila.remove(); 
          alert("Producto eliminado");
        });
      }
    });
       
    DOMitems.appendChild(fila);
  });
} 



/* ----------------------------------------------
    aqui funciona la modal que se muestra al dar click al BOTON CREAR
    ----------------------------------------------*/
var modal = document.getElementById("myModal");
var abrir = document.getElementById("abrirModal");
var cerrar = document.querySelector(".cerrar-modal");
var cancelar = document.getElementById("cancelBtn");
var guardar = document.getElementById("guardarBtn");

// Mostrar modal
abrir.addEventListener("click", function() {
  modal.style.display = "flex";
});

// Cerrar con la X
cerrar.addEventListener("click", function() {
  modal.style.display = "none";
});

// Cerrar con Cancelar
cancelar.addEventListener("click", function() {
  modal.style.display = "none";
});

// Guardar
guardar.addEventListener("click", function() {
  modal.style.display = "none";
});



/*------------------------------------------------------------
     CREAR    (dentro esta el formulario) 
--------------------------------------------------------------     
*/
function insertar() {
/* declaro  const para preguntar si los valores cumplen y asi 
no me guarde un producto vacio.
*/
  const numeroId = document.getElementById("productID").value;
  const nombreDelProducto = document.getElementById("productName").value;
  const precioDelProducto = document.getElementById("precio").value;

/* Luego le pregunto con el IF si cumplen */
      if (numeroId==="" || nombreDelProducto ==="" || precioDelProducto ==="") {
        alert("Debes de llenar los campos");
        return; // Detiene todo, si no lo coloco pasa a crear producto vacio
      }
  
  const agregarProducto = {
    produtID: document.getElementById("productID").value,
    categoria: document.getElementById("categoria").value,
    productName: document.getElementById("productName").value,
    descripcion: document.getElementById("descripcion").value,
    precio: document.getElementById("precio").value,
    talla: document.getElementById("talla").value,
    stock: document.getElementById("stock").value,
    imagen: document.getElementById("imagen").value
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(agregarProducto),
  };

  let url2 = "http://localhost:8000/productos"

    fetch(url2, options)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      alert("¡Perfecto agregado!");
      location.reload();
    }) ;
}