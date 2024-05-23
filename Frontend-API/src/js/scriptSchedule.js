const token = localStorage.getItem('token');

// Verificar se o usuário está logado
document.addEventListener('DOMContentLoaded', async () => {
    if (!token) {
        alert('Você precisa estar logado para acessar esta página');
        window.location.href = './login.html';
        return;
    }
});

document.getElementById('formSchedule').addEventListener('submit', async (event) => {
    event.preventDefault();

    console.log('clicou')

    const serviceId = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    //const time = document.getElementById('time').value;

    console.log(serviceId, date)

    // Buscar usuário no banco para pegar o ID
    try {
        const responseGetUser = await fetch('http://localhost:3000/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // Se o usuário for encontrado, executar o agendamento
        if (responseGetUser.ok) {
            const userData = await responseGetUser.json();
            const userId = userData.id;

            console.log(userId)

            // Chamar a rota para realizar o agendamento
            const response = await fetch('http://localhost:3000/schedule/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorizarion': `Bearer ${token}`
                },
                body: JSON.stringify({ serviceId, date, userId })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Falha ao realizar agendamento')
            }

            //const data = await response.json();
            alert('Agendamento bem-sucedido!');

        } else {
            alert('Sessão inválida. Faça login novamente.');
            window.location.href = './login.html';
        }

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao realizar agendamento: ' + error.message);
    }
});