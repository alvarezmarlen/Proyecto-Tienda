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



