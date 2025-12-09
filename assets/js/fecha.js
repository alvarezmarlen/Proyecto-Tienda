/* obtiene la fecha y la hora */
const fecha = new Date();
meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

/*formatea una cadena*/
const dia = fecha.getDate() + " " + meses[fecha.getMonth()] + " " + fecha.getFullYear();
const hora = fecha.getHours() + ":" + fecha.getMinutes();

/* muestra la fecha */
document.getElementById("reloj").innerHTML = "<p>" + dia + ", " + hora + "</p>";