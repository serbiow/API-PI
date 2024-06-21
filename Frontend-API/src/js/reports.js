document.getElementById('relatorio1').addEventListener('click', async (event) => {
    try {
        const response = await fetch('http://localhost:3000/reports/lasts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar agendamentos');
        }

        const list = await response.json();
        showModal('Relatório - Últimos Agendamentos', formatReport(list));
    } catch (error) {
        console.error('Erro:', error);
        showModal('Erro', error.message);
    }
});

document.getElementById('relatorio2').addEventListener('click', async (event) => {
    try {
        const date = prompt("Por favor, digite a data", "mm/dd/yyyy");
        const response = await fetch('http://localhost:3000/reports/day', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date })
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar agendamentos');
        }

        const list = await response.json();
        showModal('Relatório - Agendamentos por Dia', formatReport(list));
    } catch (error) {
        console.error('Erro:', error);
        showModal('Erro', error.message);
    }
});

document.getElementById('relatorio3').addEventListener('click', async (event) => {
    try {
        const response = await fetch('http://localhost:3000/reports/trending', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar agendamentos');
        }

        const list = await response.json();
        showModal('Relatório - Agendamentos Mais Realizados', formatReport(list));
    } catch (error) {
        console.error('Erro:', error);
        showModal('Erro', error.message);
    }
});

function formatReport(report) {
    if (!Array.isArray(report) || report.length === 0) {
        return '<p>Nenhum dado disponível.</p>';
    }

    if (report[0].hasOwnProperty('date') && report[0].hasOwnProperty('time')) {
        return formatScheduleReport(report);
    } else if (report[0].hasOwnProperty('service_name') && report[0].hasOwnProperty('total_schedules')) {
        return formatTrendingReport(report);
    }

    return '<p>Formato de relatório desconhecido.</p>';
}

function formatScheduleReport(report) {
    let table = '<table class="min-w-full bg-white">';
    table += '<thead><tr><th class="px-4 py-2">Data</th><th class="px-4 py-2">Hora</th><th class="px-4 py-2">Serviço</th><th class="px-4 py-2">Cliente</th><th class="px-4 py-2">Telefone</th></tr></thead>';
    table += '<tbody>';

    report.forEach(item => {
        table += `<tr><td class="border px-4 py-2">${item.date}</td><td class="border px-4 py-2">${item.time}</td><td class="border px-4 py-2">${item.serviceName}</td><td class="border px-4 py-2">${item.userName}</td><td class="border px-4 py-2">${item.userPhone}</td></tr>`;
    });

    table += '</tbody></table>';
    return table;
}

function formatTrendingReport(report) {
    let table = '<table class="min-w-full bg-white">';
    table += '<thead><tr><th class="px-4 py-2">Nome do Serviço</th><th class="px-4 py-2">Total de Agendamentos</th></tr></thead>';
    table += '<tbody>';

    report.forEach(item => {
        table += `<tr><td class="border px-4 py-2">${item.service_name}</td><td class="border px-4 py-2">${item.total_schedules}</td></tr>`;
    });

    table += '</tbody></table>';
    return table;
}

function showModal(title, content) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalContent').innerHTML = content;
    document.getElementById('reportModal').classList.remove('hidden');
}
