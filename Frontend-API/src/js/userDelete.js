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

    // Desabilitar o formulário e botões durante a operação de exclusão
    document.getElementById('deleteUserBtn').disabled = true;
    document.getElementById('updateUserForm').querySelector('button[type="submit"]').disabled = true;

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
        alert('Erro ao deletar usuário');
    } finally {
        // Reabilitar o formulário e botões após a operação
        document.getElementById('deleteUserBtn').disabled = false;
        document.getElementById('updateUserForm').querySelector('button[type="submit"]').disabled = false;
    }
});
