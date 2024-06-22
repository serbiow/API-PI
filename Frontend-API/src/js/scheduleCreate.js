const token = localStorage.getItem('token');

var userStaff;

//Verificar se o usuário está logado
document.addEventListener('DOMContentLoaded', async () => {
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

            //criar variável global com o staff
            userStaff = await userData.staff;

            // verificação para saber se é STAFF
            if (userData.staff == 1) {
                document.getElementById('lbl-name').style.display = 'block';
                document.getElementById('name').style.display = 'block';

                document.getElementById('lbl-phone').style.display = 'block';
                document.getElementById('phone').style.display = 'block';
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

document.getElementById('formSchedule').addEventListener('submit', async (event) => {
    event.preventDefault();

    const serviceId = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    try {
        if (userStaff == 1) {
            var clientName = document.getElementById('name').value;
            var clientPhone = document.getElementById('phone').value;
        }

        // Chamar a rota para realizar o agendamento
        const response = await fetch('http://localhost:3000/schedule/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ serviceId, date, time, clientName, clientPhone })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Falha ao realizar agendamento')
        }

        //const data = await response.json();
        alert('Agendamento bem-sucedido!');

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao realizar agendamento: ' + error.message);
    }
});