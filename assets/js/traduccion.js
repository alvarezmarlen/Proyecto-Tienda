const listaidiomas = document.getElementById("idioma");
 listaidiomas.addEventListener("change", function() {

    let valorSeleccionado = this.value;

    if (valorSeleccionado=="esp"){
    alert("Valor:"+ valorSeleccionado);
    window.location.href = 'detalle.html'; 
    } 

if (valorSeleccionado=="eng"){
    alert("Valor:"+ valorSeleccionado);
    window.location.href = 'detalleeng.html'; }

 

});