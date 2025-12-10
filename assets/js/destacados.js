import { articulosJSON } from './main.js';


const productDestacadosList = document.getElementById('products-destacados');

// sobreescribimos lo que haya dentro
productDestacadosList.innerHTML="";

// generamos las tarjetas
articulosJSON.forEach((productDestacados, index) => {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta';
    tarjeta.innerHTML = `
                    <div class="card-tarjeta">
                        <figure>
                            <img class="tarjeta-img" src="${productDestacados.imagen}" alt="${productDestacados.productName}">
                            <figcaption class="tarjeta-informacion">
                                <h5>${productDestacados.productName}</h5>
                                <p><strong>€ ${productDestacados.precio}</strong></p>
                            </figcaption>
                        </figure>
                    </div>   
    
    `;
        //añadimos las tarjetas al contenedor
    productDestacadosList.appendChild(tarjeta);
    });

