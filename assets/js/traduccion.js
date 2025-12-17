//obtenemos la pagina a traducir
const listaidiomas = document.getElementById("idioma");

const aa = window.location.pathname;
const ruta = aa.split("/");


//al elegir el idioma de la lista desplegable cambiamos la ruta de la pagina
 listaidiomas.addEventListener("change", function() {

    let valorSeleccionado = this.value;

    if (valorSeleccionado=="esp"){
    window.location.href = "/pages/"+ruta[ruta.length-1]; 
    console.log("/pages/"+ruta[ruta.length-1]);
    } 

if (valorSeleccionado=="eng"){
    window.location.href = "/pages/eng/"+ruta[ruta.length-1]; 
console.log("/pages/eng/"+ruta[ruta.length-1]);}
 

});