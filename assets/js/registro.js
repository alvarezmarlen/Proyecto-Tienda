const loginLinks = document.querySelectorAll('.open-login');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');

// Abrir modal desde CUALQUIER "Iniciar sesión"
loginLinks.forEach(link => {
    link.addEventListener('mousedown', function (e) {
        e.preventDefault();
        loginModal.classList.remove('hidden');
    });
});

// Cerrar modal con la X
closeModal.addEventListener('click', function () {
    loginModal.classList.add('hidden');
});

// Cerrar al hacer click fuera
window.addEventListener('click', function (e) {
    if (e.target === loginModal) {
        loginModal.classList.add('hidden');
    }
});

// Submit login
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert("¡Iniciaste sesión con éxito!");
    loginModal.classList.add('hidden');
    loginForm.reset();
});
