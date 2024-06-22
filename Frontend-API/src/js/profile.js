document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado para acessar esta página');
        window.location.href = './login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const userData = await response.json();
            document.getElementById('name').value = userData.name;
            document.getElementById('email').value = userData.email;
            document.getElementById('phone').value = userData.phone;

            // verificação para saber se é STAFF
            if (userData.staff == 1) {
                document.getElementById('h3-report').style.display = 'block';
                document.getElementById('relatorio1').style.display = 'block';
                document.getElementById('relatorio2').style.display = 'block';
                document.getElementById('relatorio3').style.display = 'block';

                // Mostrar as colunas Cliente e Telefone na tabela
                document.querySelectorAll('.client-info').forEach(element => {
                    element.style.display = 'table-cell';
                });

                // Mostrar os dados do Cliente e Telefone nas linhas da tabela
                document.querySelectorAll('.userInfo').forEach(element => {
                    element.style.display = 'table-cell';
                });
            }

        } else {
            alert('Sessão inválida. Faça login novamente.');
            window.location.href = './login.html';
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao acessar o perfil');
    }
});