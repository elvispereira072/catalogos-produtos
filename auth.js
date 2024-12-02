document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        if (username && password) {
            localStorage.setItem('user', JSON.stringify({ username, password }));
            alert('Registro bem-sucedido! Faça login para continuar.');
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.username === username && storedUser.password === password) {
            alert('Login bem-sucedido!');
            window.location.href = 'index.html';
        } else {
            alert('Nome de usuário ou senha incorretos.');
        }
    });
});
