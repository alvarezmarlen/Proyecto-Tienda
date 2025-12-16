//iniciamos numero de articulos comprados y el contenedor de la compra
let numero = 1;

let compra = {
};

// importarmos catalogo de main.js y el articulo seleccionado en productos de local storage
import { articulosJSON } from './main.js';
const articulo = JSON.parse(localStorage.getItem('productoSeleccionado'));

// linea para volver atras
document.getElementById("categoria").textContent = articulo.categoria;

// seleccionamos el cuadro de la foto y ponemos la imagen del articulo
let imagen = document.getElementById('foto');
imagen.src = `../assets/${articulo.imagen}`;
imagen.alt = articulo.productName;


//seleccionamos el cuadro de informacion y ponemos el texto
document.getElementById("cuadro").innerHTML = `
    <h2> ${articulo.productName}</h2>
    <p> descripcion: ${articulo.descripcion}</p>
    <p> talla: ${articulo.talla}</p>
    <p> precio: ${articulo.precio} €</p>
    <p> tenemos ${articulo.stock} en stock</p>`

// ponemos un escuchador a los botones de añadir y restar un producto
const botonsumar = document.getElementById("botonsumar");
botonsumar.addEventListener("click", sumar);

const botonrestar = document.getElementById("botonrestar");
botonrestar.addEventListener("click", restar);

function sumar() {
    numero = numero + 1;
    if (numero > articulo.stock) { numero = articulo.stock };
    document.getElementById("cantidad").innerHTML = numero;
}
function restar() {
    if (numero > 1) { numero = numero - 1 };
    document.getElementById("cantidad").innerHTML = numero;
}

document.getElementById("cantidad").innerHTML = numero;


/* al pulsar añadir al carrito se muestra la modal y se añade el producto a localstorage*/
const botonabrirmodal = document.getElementById("añadir");
botonabrirmodal.addEventListener("click", añadir);

function añadir() {
    // asignar valores al objeto compra iniciado al principio
    compra.produtID = articulo.produtID;
    compra.cantidad = numero;
    compra.precio = articulo.precio;

    // obtenemos el array carrito de localstorage, si no existe se crea uno vacio
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    /*comprobamos si la compra esta en el carrito. Si existe buscamos la compra, sumamos y comprobamos
    que no se supera el stock, si no esta la compra se añade al carrito*/

    if (carrito.some (obj => obj.produtID === compra.produtID)) {
        const compraencarrito = carrito.find (orden => orden.produtID === compra.produtID);

        //sumar la cantidad
        compraencarrito.cantidad = compraencarrito.cantidad + numero;
       
        
           
        //ver si supera el stock
        if (compraencarrito.cantidad > articulo.stock) {
            compraencarrito.cantidad = articulo.stock;
            document.getElementById("infocompra").innerText = "Stock maximo.";

            
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));

    } else {
        //añadimos compra a carrito y lo guardamos en local storage
        carrito.push(compra);
        localStorage.setItem("carrito", JSON.stringify(carrito));
       
    }
    
    //poner la foto
    document.getElementById("preview").src = `../assets/${articulo.imagen}`;

    document.getElementById("infocompra2").innerText =`Has añadido ${articulo.productName}`;
    // mostrar la ventana
    modal.style.display = "block";

   

}

/*cierra la modal para seguir comprando */
const botoncerrarmodal = document.getElementById("seguircompra");
botoncerrarmodal.addEventListener("click", cerrarmodal)

function cerrarmodal() {
    modal.style.display = "none";
}

/*ir a  carrito*/
// añadimos escuchador al boton
const botonborrar = document.getElementById("ircarrito");
botonborrar.addEventListener("click", borrarcarrito);

//cargamos pagina
function borrarcarrito() {
     window.location.href = 'cart.html';

}

/* REcomendacion de 4 articulos*/

// Filtrar productos por categoría y ponerlos en array similares
const categoriaBuscada = articulo.categoria;

const similares = articulosJSON.filter(filtrarcategoria);
function filtrarcategoria(producto) {
    return producto.categoria == categoriaBuscada && producto.produtID != articulo.produtID;
}

//crea las tarjetas y la añade a contenedor2 


for (let i = 0; i < 4; i++) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta';
    tarjeta.innerHTML = `
                    <div class="card-tarjeta">
                        <figure>
                            <img class="tarjeta-img" src="${similares[i].imagen}" alt="${similares[i].productName}">
                            <figcaption class="tarjeta-informacion">
                                <h5>${similares[i].productName}</h5>
                                <p><strong>€ ${similares[i].precio}</strong></p>
                                <button class="agregar" id="agregar-carrito">Agregar al carrito</button>
                            </figcaption>
                        </figure>
                    </div>   
    
    `;

     // Click en la tarjeta → ir al detalle
    tarjeta.querySelector('.card-tarjeta').addEventListener('click', function() {
        localStorage.setItem('productoSeleccionado', JSON.stringify(similares[i]));
        window.location.href = 'detalle.html';
    });

    // Click en el botón → NO ir al detalle
    tarjeta.querySelector('.agregar').addEventListener('click', function(event) {
        event.stopPropagation();
        // Aquí tu compañero agrega el código del carrito
    });

    contenedor2.appendChild(tarjeta);
}