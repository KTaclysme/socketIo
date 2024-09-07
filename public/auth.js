document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const name = document.getElementById('register-name').value;
            const password = document.getElementById('register-password').value;
            const result = document.getElementById('register-result');

            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, password: password })
            });

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
            } else {
                result.textContent = data.message || 'Erreur lors de l\'inscription';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const name = document.getElementById('login-name').value;
            const password = document.getElementById('login-password').value;
            const result = document.getElementById('login-result');

            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, password: password })
            });

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = '/tchat.html'; // Redirige vers la page de chat
            } else {
                result.textContent = data.message || 'Échec de la connexion';
            }
        });
    }
});
