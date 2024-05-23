document.getElementById('updateUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado para acessar esta página');
        window.location.href = './login.html';
        return;
    }

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    //const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/user/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, email, phone }) //password
        });

        const data = await response.json();

        if (response.ok) {
            alert('Dados do usuário atualizados com sucesso');
            localStorage.setItem('token', data.token)
        } else {
            alert(data.message || 'Falha ao atualizar dados do usuário');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao atualizar dados do usuário');
    }
});
