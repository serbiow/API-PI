document.getElementById('deleteUserBtn').addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado para acessar esta página');
        window.location.href = './login.html';
        return;
    }

    if (!confirm('Tem certeza de que deseja deletar sua conta? Esta ação é irreversível.')) {
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/user/delete', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            alert('Usuário deletado com sucesso');
            localStorage.removeItem('token');
            window.location.href = './login.html';
        } else {
            const data = await response.json();
            alert(data.message || 'Falha ao deletar usuário');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao deletar usuário');
    }
});
