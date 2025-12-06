
const modalHtml = `
    <dialog id="pop-up">
        <article class="pop-wrap">
            <div class="pop-up-title">
                <h2>RetroDenda</h2>
                <p>Tenemos excelentes precios</p>
            </div>

            <div class="subcripcion">
                <div class="line"></div>
                    <i class="fa-regular fa-circle-xmark" id="cerrar"></i>
                    <div class="sub-content">
                        <h2>SUSCRIBETE</h2>
                        <P>Recibe un 5% de descuento.</P>
                        <form>
                            <input type="email" class="subs-email" placeholder="Escribe tu correo electrónico">
                            <button class="subs-send">Enviar Suscripción</button>
                            <img src="/assets/img/redes.jpg"  alt="">
                        </form>
                    </div>
                <div class="line"></div>
            </div>
        </article>
    </dialog>
    `

//Cuando cargue la pagina esta llamara al interno
window.addEventListener("DOMContentLoaded", function(){
    //pega el modal en el contenedor que esta en mi index
    document.getElementById("modal-container").innerHTML = modalHtml;

    //Declaro mis variables donde le dire que busque en la plantilla literal el modal y el boton cerrar
    const modal = document.getElementById("pop-up");
    const cerrarModal = document.getElementById("cerrar");

    //Le digo mmostrar el modal despues de 2 segundos
    this.setTimeout(function() {
        modal.showModal();
    }, 2000);

    //Cerrar al hacer clic en la X
    cerrarModal.addEventListener("click", function() {
        modal.close()
    });
});
