//funcion para obtener articulos
async function obtenerArticulos(URL) {
    const response = await fetch(URL);
    const datos = await response.json();

    return datos;
}

//funcion para borrar datos
async function borrarArticulos(URL, ID) {
    const response = await fetch(URL + "/" + ID, {
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
    const response = await fetch(URL + "/" + ID, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(articuloActualizado)
    });

    const datos = await obtenerArticulos(URL);
    pintarDatos(datos);
}

//funcion para obtener datos por id
async function obtenerArticuloPorId(URL, ID) {
    const response = await fetch(URL + "/" + ID);
    const dato = await response.json();
    return dato;
}

//funcion que pinta la lista de articulos, se añade un dataset con la id a los botones (delegacion de eventos)
function pintarDatos(datos) {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = '';

    datos.forEach((dato) => {
        contenedor.innerHTML += `
                            <tr class="celda">
                                <td><img src="${dato.imagen}" width=80px></td>
                                <td>${dato.productName}</td>
                                <td>${dato.stock} unidades</td>
                                <td>${dato.precio} euros</td>
                            <td class="contenedorbotones"><button type="button" class="editar" data-id="${dato.id}">editar</button>
                            <button type="button" class="borrar" data-id="${dato.id}">borrar</button></td>
                            </tr>`
    })
}

//datos es variable global (estado local)
let datos = [];

// programa principal
async function main() {

    //obtenemos datos
    const URL = 'http://localhost:8000/productos';
    datos = await obtenerArticulos(URL); //la funcion se detiene aqui hasta obener los datos

    //pintamos los datos
    pintarDatos(datos);

    //boton borrar datos, se selecciona el boton clickado usando delegacion de eventos y el dataset anterior
    document.getElementById('contenedor').addEventListener('click', function (e) {
        if (e.target.classList.contains('borrar')) {
            borrarArticulos(URL, e.target.dataset.id)
        }
    });

    //formulario para añadir un articulo
    document.getElementById("formulario-articulo").addEventListener('submit', (e) => {
        e.preventDefault();

        const nuevoArticulo = {
            produtID: document.getElementById('categoria-articulo').value.trim(),
            categoria: document.getElementById('categoria-articulo').value.trim(),
            productName: document.getElementById('nombre-articulo').value.trim(),
            image: document.getElementById('editar-imagen').value.trim(),
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


    //Abre la modal de editar producto
    document.getElementById('contenedor').addEventListener('click', function (e) {
        if (e.target.classList.contains('editar')) {

            // Guardamos el ID
            document.getElementById('editar-id').value = e.target.dataset.id;

            // Limpiar formulario
            document.getElementById('form-editar').reset();

            // Abrir modal
            document.getElementById('modal-editar').style.display = 'block';
        }
    });

    //Cierra la modal clickando la x
    document.getElementById('cerrar-modal').addEventListener('click', () => {
        document.getElementById('modal-editar').style.display = 'none';
    });


    //Edita el producto
    document.getElementById('form-editar').addEventListener('submit', function (e) {
        e.preventDefault();

        const id = document.getElementById('editar-id').value;

        const articuloActualizado = {
            produtID: document.getElementById('categoria-articulo').value.trim(),
            categoria: document.getElementById('editar-categoria').value.trim(),
            productName: document.getElementById('editar-nombre').value.trim(),
            image: document.getElementById('editar-imagen').value.trim(),
            precio: parseFloat(document.getElementById('editar-precio').value),
            descripcion: document.getElementById('editar-descripcion').value.trim(),
            talla: document.getElementById('editar-talla').value.trim(),
            stock: parseInt(document.getElementById('editar-stock').value)
        };

        // Validación básica
        if (!articuloActualizado.productName || isNaN(articuloActualizado.precio)) {
            alert('Completa los campos correctamente');
            return;
        }

        modificarArticulos(URL, id, articuloActualizado);

        // Cerrar modal
        document.getElementById('modal-editar').style.display = 'none';
    });
 
}

//ejecuta el programa principal
main();