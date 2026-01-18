//funcion para obtener articulos
async function obtenerArticulos(URL) {
    const response = await fetch(URL);
    const datos = await response.json();

    return datos;
}

//funcion para borrar datos
async function borrarArticulos(URL, ID) {
    const response = await fetch(URL+"/"+ID, {
        method: 'DELETE',
    });

    const datos = await obtenerArticulos(URL);
    pintarDatos(datos);
}

//funcion para añadir un articulo
async function anadirArticulo(URL, nuevoArticulo) {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoArticulo)
    });
    const datos = await obtenerArticulos(URL);
    pintarDatos(datos);
}

//funcion para modificar datos
async function modificarArticulos(URL, ID, articuloActualizado) {
    const response = await fetch(URL+"/"+ID, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articuloActualizado)
        });

    const datos = await obtenerArticulos(URL);
    pintarDatos(datos);
}

//funcion que pinta la lista de articulos, se añade un dataset a los botones
function pintarDatos(datos) {
     const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = '';

    datos.forEach((dato) => {
        contenedor.innerHTML += `
                            <p>${dato.productName}</p>
                            <button type="button" class="editar" data-id="${dato.id}">editar</button>
                            <button type="button" class="borrar" data-id="${dato.id}">borrar</button>`
    })
}

// programa principal
async function main() {

    //obtenemos datos y los pintamos
    const URL = 'http://localhost:8000/productos';
    const datos = await obtenerArticulos(URL);
    pintarDatos(datos);

    //boton borrar datos, se selecciona el boton clickado con delegacion de eventos
    document.getElementById('contenedor').addEventListener('click', function (e) {
        if (e.target.classList.contains('borrar')) {
            borrarArticulos(URL, e.target.dataset.id)
        }
    });

    //formulario para añadir un articulo
    document.getElementById("formulario-articulo").addEventListener('submit', (e) => {
        e.preventDefault();

        const nuevoArticulo = {
            categoria: document.getElementById('categoria-articulo').value.trim(),
            productName: document.getElementById('nombre-articulo').value.trim(),
            precio: parseFloat(document.getElementById('precio-articulo').value),
            descripcion: document.getElementById('descripcion-articulo').value.trim(),
            talla: document.getElementById('talla-articulo').value.trim(),
            stock: parseInt(document.getElementById('stock-articulo').value)
        };

        // Validaciones básicas
        if (!nuevoArticulo.productName || !nuevoArticulo.categoria || !nuevoArticulo.descripcion || isNaN(nuevoArticulo.precio) || isNaN(nuevoArticulo.stock)) {
            alert('Por favor, completa todos los campos correctamente');
            return;
        }

        anadirArticulo(URL, nuevoArticulo);
        e.target.reset();
    });

     /*boton modificar datos
    document.getElementById('contenedor').addEventListener('click', function (e) {
        if (e.target.classList.contains('editar')) {

            modificarArticulos(URL, e.target.dataset.id);
            console.log(e.target.dataset.id);
        }
    });*/
}

//ejecuta el programa principal
main();