const token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', () => {
    fetchSchedules();

    // Fecha o modal de edição ao clicar no botão de fechar
    document.getElementById('closeEditModal').addEventListener('click', () => {
        document.getElementById('editScheduleModal').classList.add('hidden');
    });

    // Manipula a submissão do formulário de edição
    document.getElementById('editScheduleForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        await saveEditedSchedule();
    });
});

async function fetchSchedules() {
    try {
        const response = await fetch('http://localhost:3000/schedule/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Erro ao buscar agendamentos');
        }
        const schedules = await response.json();
        displaySchedules(schedules);
    } catch (error) {
        console.error('Erro:', error);
    }
}

function displaySchedules(schedules) {
    const container = document.getElementById('scheduleListContainer');
    container.innerHTML = ''; // Limpa qualquer conteúdo anterior

    if (schedules.length === 0) {
        container.innerHTML = '<p>Nenhum agendamento encontrado</p>';
        return;
    }

    schedules.forEach(schedule => {
        const scheduleDiv = document.createElement('div');
        scheduleDiv.classList.add('flex', 'items-center', 'w-full', 'p-3', 'py-1', 'pl-4', 'pr-1', 'leading-tight', 'transition-all', 'rounded-lg', 'outline-none', 'text-start', 'hover:bg-blue-gray-50', 'hover:bg-opacity-80', 'hover:text-blue-gray-900', 'focus:bg-blue-gray-50', 'focus:bg-opacity-80', 'focus:text-blue-gray-900', 'active:bg-blue-gray-50', 'active:bg-opacity-80', 'active:text-blue-gray-900');

        scheduleDiv.innerHTML = `
            ${schedule.serviceName} <p class="ml-auto">${schedule.date} ${schedule.time}</p>
            <div class="grid ml-auto place-items-center justify-self-end">
                <button class="delete-button relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" data-id="${schedule.id}">
                    <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd"></path>
                        </svg>
                    </span>
                </button>
                <button class="update-button relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" data-id="${schedule.id}">
                    <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                        </svg>
                    </span>
                </button>
            </div>
        `;

        container.appendChild(scheduleDiv);
    });

    // Adicione o evento de clique aos botões de deletar
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', deleteSchedule);
    });

    // Adicione o evento de clique aos botões de update
    document.querySelectorAll('.update-button').forEach(button => {
        button.addEventListener('click', updateSchedule);
    });
}

async function deleteSchedule(event) {
    const scheduleId = event.currentTarget.getAttribute('data-id');
    try {
        const response = await fetch(`http://localhost:3000/schedule/delete?id=${scheduleId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Erro ao atualizar agendamento');
        }
        const result = await response.json();
        console.log(result.message);
        fetchSchedules(); // Atualiza a lista de agendamentos
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function updateSchedule(event) {
    const scheduleId = event.currentTarget.getAttribute('data-id');
    try {
        const response = await fetch(`http://localhost:3000/schedule/?id=${scheduleId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Erro ao buscar detalhes do agendamento');
        }
        const schedule = await response.json();

        // Preenche os campos do formulário com os dados do agendamento
        document.getElementById('editServiceName').value = schedule.serviceName;
        document.getElementById('editDate').value = schedule.date;
        document.getElementById('editTime').value = schedule.time;
        document.getElementById('editScheduleId').value = schedule.id;

        // Exibe o modal de edição
        document.getElementById('editScheduleModal').classList.remove('hidden');
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function saveEditedSchedule() {
    const scheduleId = document.getElementById('editScheduleId').value;
    const updatedSchedule = {
        date: document.getElementById('editDate').value,
        time: document.getElementById('editTime').value,
    };
    try {
        const response = await fetch(`http://localhost:3000/schedule/update?id=${scheduleId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedSchedule),
        });
        if (!response.ok) {
            throw new Error('Erro ao salvar alterações no agendamento');
        }
        const result = await response.json();
        console.log(result.message);
        fetchSchedules(); // Atualiza a lista de agendamentos
        document.getElementById('editScheduleModal').classList.add('hidden'); // Fecha o modal de edição
    } catch (error) {
        console.error('Erro:', error);
    }
}
