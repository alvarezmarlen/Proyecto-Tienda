
// 1-Seleccionar el formulario por su ID
const formCliente = document.getElementById("formCompra");

// 2-Añade un escuchador para el evento Enviar Datos 
formCliente.addEventListener("submit", function(evento) {
     
    // 3. Evitar que el formulario se envíe de forma tradicional (recargar página)
    evento.preventDefault();

    alert('pulsado');

});

