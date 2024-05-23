const token = localStorage.getItem('token');

//Verificar se o usuário está logado
document.addEventListener('DOMContentLoaded', async () => {
    if (!token) {
        alert('Você precisa estar logado para acessar esta página');
        window.location.href = './login.html';
        return;
    }
});

document.getElementById('formSchedule').addEventListener('submit', async (event) => {
    event.preventDefault();

    const serviceId = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    try {
        // Chamar a rota para realizar o agendamento
        const response = await fetch('http://localhost:3000/schedule/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ serviceId, date, time })
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