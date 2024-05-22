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
            console.log('Usuário deletado com sucesso');
            alert('Usuário deletado com sucesso');
            localStorage.removeItem('token');
            console.log('Token removido:', localStorage.getItem('token')); // Verifique se o token foi removido
            window.location.href = './login.html';
        } else {
            const data = await response.json();
            console.log('Falha ao deletar usuário:', data);
            alert(data.message || 'Falha ao deletar usuário');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao deletar usuário');
    } finally {
        // Reabilitar o formulário e botões após a operação
        document.getElementById('deleteUserBtn').disabled = false;
        document.getElementById('updateUserForm').querySelector('button[type="submit"]').disabled = false;
    }
});
