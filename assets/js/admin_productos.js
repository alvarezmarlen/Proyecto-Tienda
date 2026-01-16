// Función para obtener datos
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

// Función para borrar un artículo por ID
async function borrarArticulo(id) {
    try {
        const response = await fetch(`http://localhost:8000/productos/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`No se pudo borrar el artículo. Estado: ${response.status}`);
        }

        alert('Artículo borrado correctamente');
        const datos = await obtenerDatos('http://localhost:8000/productos');
        pintarDatos(datos);

    } catch (error) {
        console.error('Error al borrar el artículo:', error);
        alert('Error al borrar el artículo');
    }
}

// Función para añadir un nuevo artículo
async function añadirArticulo(nuevoArticulo) {
    try {
        const response = await fetch('http://localhost:8000/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoArticulo)
        });

        if (!response.ok) {
            throw new Error(`No se pudo añadir el artículo. Estado: ${response.status}`);
        }

        alert('Artículo añadido correctamente');
        const datos = await obtenerDatos('http://localhost:8000/productos');
        pintarDatos(datos);

    } catch (error) {
        console.error('Error al añadir el artículo:', error);
        alert('Error al añadir el artículo');
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
                <p>${item.productName}</p>
                <button class="borrar-btn">Borrar</button>
            `;

            div.querySelector('.borrar-btn').addEventListener('click', () => {
                borrarArticulo(item.id);
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

// Formulario para añadir artículo
document.getElementById('formulario-articulo').addEventListener('submit', (e) => {
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

    añadirArticulo(nuevoArticulo);
    e.target.reset();
});
