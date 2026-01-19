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
    pintarProductos();
  })
  .catch(function(error) {
    console.log(error);
  });

function pintarProductos() {
  DOMitems.innerHTML = ""; 

  productos.forEach(function(producto) {
    const fila = document.createElement("tr");    

    fila.innerHTML = `
      <td><img src="${producto.imagen}" alt="${producto.productName}" width="80"></td>
      <td>${producto.produtID}</td>
      <td class="descrip">${producto.descripcion}</td>
      <td>${producto.categoria}</td>
      <td>${producto.precio} €</td>
      <td>${producto.talla}</td>
      <td>${producto.stock}</td>
      <td class="acciones">
        <button class="editar"id="${producto.id}">Editar</button>
        <button class="eliminar">Eliminar</button>
      </td>
    `;
 
    //BORRAR/ELIMINAR
    // Buscamos el botón ELIMINAR que acabamos de crear dentro de esta fila
    const btnEliminar = fila.querySelector('.eliminar');
    
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