
///////////////
// // 1. VARIABLES


// (provisional, hace falta agregar las cantidades en stock para que el programa funcione:)

const articulosSeleccionados = [
    
                        {"productID": 0,
                        "categoria": "bolsos",
                        "productName": "Bolso Azul",
                        "imagen": "img/bolsos/bolso-azul.jpg",
                        "precio": 35,
                        "descripcion": "Bolso azul con tres espacios",
                        "talla": "pequeno",
                        "stock": "true"
                        },

                        {"productID": 1,
                        "categoria": "bolsos",
                        "productName": "Bolso Marron",
                        "imagen": "img/bolsos/bolso-marron.jpg",
                        "precio": 65,
                        "descripcion": "Bolso marron con asa color beige",
                        "talla": "mediano",
                        "stock": "true"
                        },

                        {"productID": 2,
                        "categoria": "bolsos",
                        "productName": "Bolso Blanco",
                        "imagen": "img/bolsos/bolso-media-luna-suave.jpg",
                        "precio": 25,
                        "descripcion": "Bolso blanco con forma de media luna",
                        "talla": "mediano",
                        "stock": "true"
                        },

                        {"productID": 3,
                        "categoria": "bolsos",
                        "productName": "Mochila Azul",
                        "imagen": "img/bolsos/mochila-azul.jpg",
                        "precio": 45,
                        "descripcion": "Mochila azul para ir al monte",
                        "talla": "mediano",
                        "stock": "true"
                        },

                        {"productID": 4,
                        "categoria": "bolsos",
                        "productName": "Mochila Oscura",
                        "imagen": "img/bolsos/mochila-oscura.jpg",
                        "precio": 30,
                        "descripcion": "Bolso gris de tres cremalleras",
                        "talla": "mediano",
                        "stock": "true"
                        },

                        {"productID": 5,
                        "categoria": "bolsos",
                        "productName": "troley Azul",
                        "imagen": "img/bolsos/troley.jpg",
                        "precio": 70,
                        "descripcion": "Troley de color azul con 4 ruedas",
                        "talla": "mediano",
                        "stock": "true"
                        },

];


// HAY QUE REVISAR SI ESTAS VARIABLES COINCIDEN CON LAS NOMENCLATURAS PROPIAS!!

let carrito = [];
const divisa = '€'
const DOMitems = document.querySelector('#cart-items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');




///////////////
// // 2. FUNCIONES


// (seguramente todo esto tendrá que ser actualizado con los nombres de
// las variables y las funciones que haya usado el resto del equipo
// en sus secciones)

function renderizarCarrito() {
    articulosSeleccionados.forEach((info) => {      // hay que revisar si cuadran los paréntesis, y también qué es ese 'info' dentro del paréntesis.

                // aquí el asistente sugiere crear una variable "contenedor" usando document.querySelector('#cart-items'), pero no me termina de quedar claro para qué es necesario eso. Lo dejaremos por acá para averiguarlo después.

        // (crear la tarjeta)
        const miProductoCard = document.createElement('div');
        miProductoCard.classList.add('cart-item');

        // (extraer el nombre)
        const miProductoName = document.createElement('h5')   // (esto me obliga a que los nombres vayan en un h5, don't forget)
        miProductoName.classList.add('cart-items-name');   // hay que crear esta clase en .css para estilizar los nombres de los productos
        miProductoName.textContent = info.productName;

        // (extraer la foto)
        const miProductoImagen = document.createElement('img')
        miProductoImagen.classList.add('cart-items-image');
        miProductoImagen.setAttribute('src', info.imagen);

        // (extraer el precio unitario)
        const miProductoPrecio = document.createElement('p');
        miProductoPrecio.classList.add('cart-items-precio');
        miProductoPrecio.textContent = `${info.precio}${divisa}`;



        // (añadir o restar cantidad seleccionada del mismo producto)

        const btnRestar = document.createElement('button');
        btnRestar.textContent = '-';
        btnRestar.classList.add('quantity-button');
        btnRestar.dataset.id = info.productID;      // (hasta el momento creo que esto sirve para indicarle dónde buscará el id del producto que está manipulando, por eso he puesto 'articulosSeleccionados'. Habrá que confirmar pronto)
        btnRestar.addEventListener('click', disminuirCantidad);         // habrá que crear este evento

        const btnSumar = document.createElement('button');
        btnSumar.textContent = '+';
        btnSumar.classList.add('quantity-button');
        btnSumar.dataset.id = info.productID;      
        btnSumar.addEventListener('click', aumentarCantidad);         

        const cantidadEnCarrito = document.createElement('span');
        cantidadEnCarrito.textContent = info.cantidad;   //  de momento el array no tiene cantidad. esto se deberá arreglar cuando el resto del equipo actualice la mini base de datos.
        cantidadEnCarrito.classList.add('quantity-display')   // habrá que crear esta clase también
        

        // (extraer el precio subtotal de la cantidad seleccionada del mismo producto)
        const miProductoSubtotal = document.createElement('p');
        const cantidad = info.cantidad;
        miProductoSubtotal.textContent = (info.precio * cantidad).toFixed(2) + '€';
        miProductoSubtotal.classList.add('item-subtotal')       // (hay que crear esta clase en .css)   


        // (botón para eliminar todos los items del mismo producto)
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar del carrito' ;
        btnEliminar.classList.add('remove-btn');     // (hay que crear esta clase)
        btnEliminar.dataset.id = info.productID;
        btnEliminar.addEventListener('click', eliminarItem);    // habrá que crear este evento


    ////////////////
    // // MONTAR LAS TARJETAS

    miProductoCard.appendChild(miProductoImagen);
    miProductoCard.appendChild(miProductoName);
    miProductoCard.appendChild(miProductoPrecio);
    
    miProductoCard.appendChild(btnRestar);
    miProductoCard.appendChild(cantidadEnCarrito);
    miProductoCard.appendChild(btnSumar);
    
    miProductoCard.appendChild(miProductoSubtotal);
    miProductoCard.appendChild(btnEliminar);

    DOMitems.appendChild(miProductoCard);



        
    });


}



