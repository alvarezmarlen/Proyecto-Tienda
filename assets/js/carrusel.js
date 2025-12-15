//Seleccionamos el contenedor donde irá el carrusel
const carruselContainer = document.getElementById('carrusel-container');

carruselContainer.innerHTML = `
        <section class="carrusel">
            <figure class="imagenes">
                <div id="img">
                    <img class="img" src="assets/img/fondos/carrusel-1.jpeg" alt="imagen 1">
                </div>
                <section id="texto" class="texto">
                    <h1>RetroDenda</h1>
                    <h4>Estilo retro, actitud moderna.</h4>
                </section>
            </figure>
            <button class="iconos" id="adelante" aria-label="Imagen siguiente">
                <img class="img-iconos" src="assets/img/fondos/adelante.svg" alt="adelante">
            </button>
            <button class="iconos" id="atras" aria-label="Imagen anterior">
                <img class="img-iconos" src="assets/img/fondos/atras.svg" alt="atras">
            </button>

        </section>
        <section class="puntos" id="puntos"></section>
`;

//Datos del carrusel
let imagenes = [
    {"url": "assets/img/fondos/carrusel-1.jpeg"},    
    {"url": "assets/img/fondos/carrusel-2.jpeg"},    
    {"url": "assets/img/fondos/carrusel-3.jpg" },    
    {"url": "assets/img/fondos/carrusel-4.jpeg"},    
    {"url": "assets/img/fondos/carrusel-5.jpeg"}    
];
//Elementos del carrusel ya insertados
let atras = document.getElementById('atras');
let adelante = document.getElementById('adelante');
let imagen = document.getElementById('img');
let puntos = document.getElementById('puntos');

//Posición actual del carrusel
let actual = 0

//Eventos
atras.addEventListener('click', function(){
    actual -=1
    if (actual == -1) {
        actual = imagenes.length - 1
    }
    imagen.innerHTML = `<img class="img" src="${imagenes[actual].url}" alt="imagen 1">`
    posicionCarrusel()
})

adelante.addEventListener('click', function(){
    actual +=1
    if (actual == imagenes.length) {
        actual = 0
    }
    imagen.innerHTML = `<img class="img" src="${imagenes[actual].url}" alt="imagen 1">`
    posicionCarrusel()
})

posicionCarrusel()
function posicionCarrusel() {
    puntos.innerHTML = ""
    for (let i =0; i < imagenes.length; i++) {
        if (i == actual) {
            puntos.innerHTML += `<p class= "bold">.</p>`
        } else {
            puntos.innerHTML += `<p>.</p>`
        }
    }    
}
/* Agregue este codigo nuevo para que las imagenes se muevan sola por 3s */
setInterval(function() {
    adelante.click();
}, 3000);
