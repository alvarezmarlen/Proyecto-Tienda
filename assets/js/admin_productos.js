const url = "http://localhost:8000/productos"

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
    })