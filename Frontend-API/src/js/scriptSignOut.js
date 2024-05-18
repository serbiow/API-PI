document.getElementById('signOutBtn').addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado para acessar esta página');
        window.location.href = './login.html';
        return;
    }

    if (!confirm('Tem certeza de que deseja sair?')) {
        return;
    }

    try {
        localStorage.removeItem('token');
        window.location.href = './login.html';
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao sair da conta');
    }
});
