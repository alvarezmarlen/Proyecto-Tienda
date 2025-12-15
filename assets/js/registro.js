// Abrir modal al hacer click en "Iniciar sesión"
const loginLink = document.querySelector('a[href="/login.html"]'); // o tu selector exacto
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');

loginLink.addEventListener('click', function(e) {
    e.preventDefault();
    loginModal.classList.remove('hidden');
});

// Cerrar modal
closeModal.addEventListener('click', function() {
    loginModal.classList.add('hidden');
});

// Cerrar modal al hacer click fuera del contenido
window.addEventListener('click', function(e) {
    if (e.target === loginModal) {
        loginModal.classList.add('hidden');
    }
});

// Opcional: manejar submit
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Iniciaste sesión con éxito!"); // reemplazar con lógica real
    loginModal.classList.add('hidden');
    loginForm.reset();
});
