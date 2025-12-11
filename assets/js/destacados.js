import { articulosJSON } from './main.js';


const productDestacadosList = document.getElementById('products-destacados');

const idsDestacados = [7, 14, 16, 18, 19];
const destacados = articulosJSON.filter(function(product) {
    return idsDestacados.includes(product.produtID)
});

// generamos las tarjetas
destacados.forEach(function(product)  {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta';
    tarjeta.innerHTML = `
                    <div class="card-tarjeta">
                        <figure>
                            <img class="tarjeta-img" src="${product.imagen}" alt="${product.productName}">
                            <figcaption class="tarjeta-informacion">
                                <h5>${product.productName}</h5>
                                <p><strong>€ ${product.precio}</strong></p>
                                <button class="agregar" id="agregar-carrito">Agregar al carrito</button>
                            </figcaption>
                        </figure>
                    </div>   
    
    `;
 // Click en la tarjeta → ir al detalle
    tarjeta.querySelector('.card-tarjeta').addEventListener('click', function() {
        localStorage.setItem('productoSeleccionado', JSON.stringify(product));
        window.location.href = 'pages/detalle.html';
    });

    // Click en el botón → NO ir al detalle
    tarjeta.querySelector('.agregar').addEventListener('click', function(event) {
        event.stopPropagation();
        console.log('Producto para agregar:', product);
        // Aquí tu compañero agrega el código del carrito
    });

    // Añadimos las tarjetas al contenedor
    productDestacadosList.appendChild(tarjeta);
});
