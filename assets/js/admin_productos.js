/*const url = "http://localhost:8000/productos"

fetch(url)
    .then(response => response.json())
    .then(data => {

        console.log(data);

        data.forEach((item) => {
            const fila = document.createElement("tr");
            const datos = document.createElement("td");
            const botones = document.createElement("td");

            const boton1 = document.createElement("button");
            boton1.id = `borrar${item.id}`;
            boton1.innerHTML = "borrar"
            botones.appendChild(boton1);

            boton1.addEventListener("click", () => {

                const url2 = `http://localhost:8000/productos/${item.id}`
                fetch(url2, {
                    method: 'DELETE',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                fila.remove();
            }
            )


            const boton2 = document.createElement("button");
            boton2.id = `modificar${item.id}`;
            boton2.innerHTML = "modificar"
            botones.appendChild(boton2);
            

            datos.innerText = item.productName;

            fila.appendChild(datos);
            fila.appendChild(botones);

            document.getElementById("salida").appendChild(fila);

        });
    })*/





//Función para obtener datos
async function obtenerDatos(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Hubo un problema con la operación fetch:', error);
        throw error;
    }
}

// Funcion para borrar un artículo por ID
async function borrarArticulo(id) {
    try {
        const response = await fetch(`http://localhost:8000/productos/${id}`, {
            method: 'DELETE', // Usamos el método DELETE
        });

        if (!response.ok) {
            throw new Error(`No se pudo borrar el artículo. Estado: ${response.status}`);
        }

        alert('Artículo borrado correctamente');
        // Actualizar la lista después de borrar
        const datos = await obtenerDatos('http://localhost:8000/productos');
        pintarDatos(datos);

    } catch (error) {
        console.error('Error al borrar el artículo:', error);
        alert('Error al borrar el artículo');
    }
}

// Función para pintar los datos en la web
function pintarDatos(datos) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = '';

    if (Array.isArray(datos)) {
        datos.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('producto');
            div.innerHTML = `
                <span>${item.productName}</span>
                <button class="borrar-btn">Borrar</button>
            `;

            // Asignamos el evento al botón de borrar
            div.querySelector('.borrar-btn').addEventListener('click', () => {
                borrarArticulo(item.id); // Suponiendo que cada item tiene "id"
            });

            contenedor.appendChild(div);
        });
    } else {
        contenedor.textContent = 'No hay datos para mostrar.';
    }
}

// Ejemplo de uso
async function main() {
    const datos = await obtenerDatos('http://localhost:8000/productos');
    pintarDatos(datos);
}

main();
