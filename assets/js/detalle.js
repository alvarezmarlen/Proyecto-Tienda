//numero de articulos
        let numero = 0;

        // objeto que contiene datos de compra
        let compra = {        
                };



       const articulo = JSON.parse(localStorage.getItem('productoSeleccionado'));

       
        document.getElementById("categoria").textContent = articulo.categoria;
        
        
        let imagen = document.getElementById('foto');
        imagen.src = "../assets/"+articulo.imagen;
        imagen.alt = articulo.productName;


        //cuadro de informacion
        document.getElementById("cuadro").innerHTML="<h2>" + articulo.productName+ "</h2>"
                                                        +"<p> descripcion: " + articulo.descripcion+"</p>"
                                                        +"<p> talla: " + articulo.talla+"</p>"
                                                        +"<p> precio: " + articulo.precio+" €</p>"
                                                        +"<p> stock: " + articulo.stock+"</p>"

        // botones de añadir y restar un producto
        const botonsumar = document.getElementById("botonsumar");
        botonsumar.addEventListener("click", sumar);

        const botonrestar = document.getElementById("botonrestar");
        botonrestar.addEventListener("click", restar);

        function sumar (){
            numero=numero+1;
            if (numero>articulo.stock) { numero=articulo.stock };
            document.getElementById("cantidad").innerHTML=numero;
        }
        function restar (){
            if (numero>=1) {numero=numero-1};
            document.getElementById("cantidad").innerHTML=numero;
        }

        document.getElementById("cantidad").innerHTML=numero;

        /*modal*/

        /* al pulsar añadir al carrito se muestra la modal y se añade el producto a localstorage*/
        const botonabrirmodal = document.getElementById("abrirmodal");
        botonabrirmodal.addEventListener("click", abrirmodal);

        function abrirmodal (){
            // mostrar la ventana
            modal.style.display="block";

            // asignar valores a compra y almacenarlo en localstorage
            compra.id=1;
            compra.cantidad = numero;
            compra.precio=25;
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            
            carrito.push(compra);
            localStorage.setItem("carrito", JSON.stringify(carrito));

        }

        /*cierra la modal para seguir comprando */
        const botoncerrarmodal=document.getElementById("cerrarmodal");
        botoncerrarmodal.addEventListener("click", cerrarmodal)

        function cerrarmodal (){
            modal.style.display = "none";
        }

        /*borrar carrito*/
        const botonborrar=document.getElementById("borrarcarrito");
        botonborrar.addEventListener("click", borrar);

        function borrar () {
            localStorage.clear();
        }