
let imagenes = [
    {
        "url": "assets/img/fondos/carrusel-1.jpeg"
    },    
    {
        "url": "assets/img/fondos/carrusel-2.jpeg"
    },    
    {
        "url": "assets/img/fondos/carrusel-3.jpg"
    },    
    {
        "url": "assets/img/fondos/carrusel-4.jpeg"
    },    
    {
        "url": "assets/img/fondos/carrusel-5.jpeg"
    }    
]

let atras = document.getElementById('atras');
let adelante = document.getElementById('adelante');
let imagen = document.getElementById('img');
let puntos = document.getElementById('puntos');
let actual = 0

atras.addEventListener('click', function(){
    actual -=1

    if (actual == -1) {
        actual = imagenes.length - 1
    }
    imagen.innerHTML = `<img class="img" src="${imagenes[actual].url}" alt="imagen 1">`
})

adelante.addEventListener('click', function(){
    actual +=1

    if (actual == imagenes.length) {
        actual = 0
    }
    imagen.innerHTML = `<img class="img" src="${imagenes[actual].url}" alt="imagen 1">`
})

function posicionCarrusel() {
    puntos.innerHTML = ""
    for (let i =0; i < imagenes.length; i++) {
        if (i == actual) {
            puntos.innerHTML += `<p class= "bold">.</p>`
        } else {
            puntos.innerHTML += `<p>.<p>`
        }
    }    
}