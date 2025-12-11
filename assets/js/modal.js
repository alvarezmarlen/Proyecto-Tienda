
const modalHtml = `
    <dialog id="pop-up">
        <article class="pop-wrap">
            <div class="pop-up-title">
                <h2>RetroDenda</h2>
                <p>Tu estilo retro empieza hoy</p>
            </div>

            <div class="subcripcion">
                <div class="line"></div>
                    <i class="fa-regular fa-circle-xmark" id="cerrar"></i>
                    <div class="sub-content">
                        <h2>🔥Atención RetroLovers</h2>
                        <P>Por tiempo limitado: nuevas prendas vintage recién llegadas.</P> <br>
                        <P class="accion">¡No te marches sin ver las novedades!.</P>
                    </div>
                <div class="line"></div>
            </div>
        </article>
    </dialog>
    `


window.addEventListener("DOMContentLoaded", function(){
    document.getElementById("modal-container").innerHTML = modalHtml;

    
    const modal = document.getElementById("pop-up");
    const cerrarModal = document.getElementById("cerrar");

    this.setTimeout(function() {
        modal.showModal();
    }, 7000);

    cerrarModal.addEventListener("click", function() {
        modal.close()
    });
});
