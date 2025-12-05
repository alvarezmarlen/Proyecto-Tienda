


/* const products = [
    {
        code: '0',
        name: 'Bolso Azul',
        price: 35,
        image: '/assets/img/bolsos/bolso-azul.jpg'
    },
    {
        code: '1',
        name: 'Bolso Marron',
        price: 65,
        image: '/assets/img/bolsos/bolso-marron.jpg'
    },
    {
        code: '2',
        name: 'Bolso Blanco',
        price: 25,
        image: '/assets/img/bolsos/bolso-media-luna-suave.jpg'
    },
        {
        code: '3',
        name: 'Mochila Azul',
        price: 45,
        image: '/assets/img/bolsos/mochila-azul.jpg'
    }
]; */

import { products } from '../js/main.js';



const productList = document.getElementById('container');

products.forEach((product, index) => {
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
    productList.appendChild(col);
});
