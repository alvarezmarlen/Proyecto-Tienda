

///////////////
// // 1. VARIABLES




// HAY QUE REVISAR SI ESTAS VARIABLES COINCIDEN CON LAS NOMENCLATURAS PROPIAS!!

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/*
if (carrito.length === 0) {
    carrito = [

{                       "productID": 0,
                        "categoria": "bolsos",
                        "productName": "Bolso Azul",
                        "imagen": "../assets/img/bolsos/bolso-azul.png",
                        "precio": 35,
                        "descripcion": "Bolso azul con tres espacios",
                        "talla": "pequeno",
                        "stock": 10,
                        "cantidad": 1,
                        },

                        {"productID": 1,
                        "categoria": "bolsos",
                        "productName": "Bolso Marron",
                        "imagen": "../assets/img/bolsos/bolso-marron.png",
                        "precio": 65,
                        "descripcion": "Bolso marron con asa color beige",
                        "talla": "grande",
                        "stock": 3,
                        "cantidad": 1,
                        },

                        {"productID": 2,
                        "categoria": "bolsos",
                        "productName": "Bolso Blanco",
                        "imagen": "../assets/img/bolsos/bolso-media-luna-suave.png",
                        "precio": 25,
                        "descripcion": "Bolso blanco con forma de media luna",
                        "talla": "mediano",
                        "stock": 100,
                        "cantidad": 1,
                        },

                        {"productID": 3,
                        "categoria": "bolsos",
                        "productName": "Mochila Azul",
                        "imagen": "../assets/img/bolsos/mochila-azul.jpg",
                        "precio": 45,
                        "descripcion": "Mochila azul para ir al monte",
                        "talla": "mediano",
                        "stock": 1,
                        "cantidad": 1,
                        },

                        {"productID": 4,
                        "categoria": "bolsos",
                        "productName": "Mochila Oscura",
                        "imagen": "../assets/img/bolsos/mochila-oscura.jpg",
                        "precio": 30,
                        "descripcion": "Bolso gris de tres cremalleras",
                        "talla": "mediano",
                        "stock": 4,
                        "cantidad": 1,
                        },

        
    ];
    
}
*/

const divisa = '€'
const DOMitems = document.querySelector('#cart-items');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#btn-empty');
const DOMbotonCheckout = document.querySelector('#btn-checkout');




///////////////
// // 2. FUNCIONES


function renderizarCarrito() {
    DOMitems.textContent = '';
    carrito.forEach((info) => {  
   
        // (crear la tarjeta)
        const miProductoCard = document.createElement('div');
        miProductoCard.classList.add('cart-item');

        // (extraer el nombre)
        const miProductoName = document.createElement('h5')   
        miProductoName.classList.add('cart-items-name');   
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
        btnRestar.dataset.id = info.productID;
        btnRestar.addEventListener('click', disminuirCantidad);        

        const btnSumar = document.createElement('button');
        btnSumar.textContent = '+';
        btnSumar.classList.add('quantity-button');
        btnSumar.dataset.id = info.productID;      
        btnSumar.addEventListener('click', aumentarCantidad);         

        const cantidadEnCarrito = document.createElement('span');
        cantidadEnCarrito.textContent = info.cantidad;
        cantidadEnCarrito.classList.add('quantity-display')  
        

        // (extraer el precio subtotal de la cantidad seleccionada del mismo producto)
        const miProductoSubtotal = document.createElement('p');
        const cantidad = info.cantidad;
        miProductoSubtotal.textContent = (info.precio * cantidad).toFixed(2) + ' €';
        miProductoSubtotal.classList.add('item-subtotal')  


        // (botón para eliminar todos los items del mismo producto)
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar del carrito' ;
        btnEliminar.classList.add('remove-btn');   
        btnEliminar.dataset.id = info.productID;
        btnEliminar.addEventListener('click', eliminarItem);  

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


    ////////////////
    // // CALCULAR Y MOSTRAR EL TOTAL


    DOMtotal.textContent = calcularTotal();

}

    function calcularTotal() {
        return carrito
            .reduce((acumulador, item) => {
                return acumulador + item.precio * item.cantidad;
            }, 0)
            .toFixed(2);
}

    function aumentarCantidad(event) {
        const id = parseInt(event.target.dataset.id);
        const producto = carrito.find(item => item.productID === id);
        if (!producto) return;

        if (producto.cantidad < producto.stock) {
            producto.cantidad++;
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito();
        
    }

    function disminuirCantidad(event) {
        const id = parseInt(event.target.dataset.id);
        const producto = carrito.find(item => item.productID === id);
        if (!producto) return;

        if (producto.cantidad > 1) {
            producto.cantidad--;
        } else {
            carrito = carrito.filter(item => item.productID !== id);
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito();

    }

        function eliminarItem(event) {
            const id = parseInt(event.target.dataset.id);
            carrito = carrito.filter(item => item.productID !== id);
        

        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito();

    }


        if (DOMbotonVaciar) {
            DOMbotonVaciar.addEventListener('click', () => {
                carrito = [];
                localStorage.removeItem('carrito');
            renderizarCarrito();
            })
        }



        DOMbotonCheckout.addEventListener("click", () => {
            if (carrito.length === 0) {
                alert("Tu carrito está vacío.");
                return;
            }
            window.location.href = "/pages/checkout.html";
            
        });

renderizarCarrito();









