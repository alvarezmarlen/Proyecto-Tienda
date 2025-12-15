import { articulosJSON } from './main.js';

/* ----------------------------------------------------------------------
    CON ESTE CODIGO GENERO el codigo QUE ALOJARA TODOS LOS PRODUCTOS
------------------------------------------------------------------------*/
// obtenemos el elemento contenedor por su id
const productList = document.getElementById('container');


// generamos las tarjetas
articulosJSON.forEach((product, index) => {
    const col = document.createElement('div');
    col.className = 'col';
    col.innerHTML = `
                    <div class="card">
                        <figure>
                            <img class="caja-img" src="${product.imagen}" alt="${product.productName}">
                            <figcaption class="caja-informacion">
                                <h5>${product.productName}</h5>
                                <p><strong>€ ${product.precio}</strong></p>
                                <button class="agregar" id="agregar-carrito">Agregar al carrito</button>
                            </figcaption>
                        </figure>
                    </div>   
    
    `;
    // 🔥 Click para ir al detalle
    col.querySelector('.card').addEventListener('click', () => {
        localStorage.setItem('productoSeleccionado', JSON.stringify(product));
        window.location.href = 'detalle.html'; 
    });


    productList.appendChild(col);
});

// Función para agregar al carrito
function agregarAlCarritoYRedirigir(product) {
    // Obtener carrito actual
// Intentamos obtener el carrito del localStorage. Si no existe, usamos "[]" para que JSON.parse no falle.
    let carritoData = localStorage.getItem("carrito");
    let carrito = JSON.parse(carritoData || "[]");
    
    let productoExiste = false;

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].productID === product.produtID) {

            // Si existe: Aumentar cantidad
            carrito[i].cantidad = carrito[i].cantidad + 1;
            
            // Verificar que no supere el stock
            if (carrito[i].cantidad > product.stock) {
                carrito[i].cantidad = product.stock; // Limitar al stock máximo
            }
            
            productoExiste = true;
            break; // Salir del bucle for, ya encontramos y actualizamos el producto
        }
    }
    
  if (!productoExiste) {
        // Si no se encontró el producto en el bucle, lo agregamos como una nueva compra
        let Compra = {
            productID: product.produtID,
            categoria: product.categoria,
            productName: product.productName,
            imagen: product.imagen,
            precio: product.precio,
            descripcion: product.descripcion,
            talla: product.talla,
            stock: product.stock,
            cantidad: 1 // La cantidad inicial es 1
        };
        carrito.push(Compra);
    };
    
     // Guardar en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    // Redirigir al carrito
    window.location.href = 'cart.html';
}




