document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const loginButton = document.getElementById('btn-login');

    if (token) {
        loginButton.textContent = "Perfil";
        loginButton.href = "./profile.html";
    } else {
        loginButton.textContent = "Login";
        loginButton.href = "./login.html";
    }
});