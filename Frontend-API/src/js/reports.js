// import PDFDocument from 'pdfkit';
// import fs from 'fs';

// const PDFDocument = require('pdfkit');
// const fs = require('fs');

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

        const lasts = await response.json();
        console.log(lasts);
    } catch (error) {
        console.error('Erro:', error);
    }
});

function displayLasts(lasts){
    const container = document.getElementById('lastsContainer');
    container.innerHTML = '';

    if(lasts.length === 0){
        container.innerHTML = '<p>Nenhum agendamento anterior encontrado</p>';
        return;
    }

    lasts.forEach(lasts => {
        const lastsDiv = document.createElement('div');
        lastsDiv.classList.add('flex', 'items-center', 'w-full', 'p-3', 'py-1', 'pl-4', 'pr-1', 'leading-tight', 'transition-all', 'rounded-lg', 'outline-none', 'text-start', 'hover:bg-blue-gray-50', 'hover:bg-opacity-80', 'hover:text-blue-gray-900', 'focus:bg-blue-gray-50', 'focus:bg-opacity-80', 'focus:text-blue-gray-900', 'active:bg-blue-gray-50', 'active:bg-opacity-80', 'active:text-blue-gray-900')
        
        lastsDiv.innerHTML = `
          ${lasts.serviceName} <p class='ml-auto'>${lasts.date} ${lasts.time} ${lasts.userName} ${lasts.userPhone}</p>  
        `;

        container.appendChild(lastsDiv);
    
    })
}

document.getElementById('relatorio2').addEventListener('click', async (event) => {
    alert('relatorio2')
});

<<<<<<< Updated upstream
document.getElementById('relatorio3').addEventListener('click', async (event) => {
    alert('relatorio3')
=======
document.addEventListener('DOMContentLoaded', (event) => {
    // Mostrar botão quando a página carregar
    document.getElementById('relatorio3').style.display = 'block';

    // Adicionar evento de clique ao botão
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

            const trending = await response.json();
            console.log(trending);
            displayTrending(trending);
        } catch (error) {
            console.error('Erro:', error);
        }
    });
>>>>>>> Stashed changes
});

function displayTrending(trending) {
    const container = document.getElementById('trendingContainer');
    container.innerHTML = '';

    if (trending.length === 0) {
        container.innerHTML = '<p>Nenhum agendamento encontrado</p>';
        return;
    }

    trending.forEach(item => {
        const trendingDiv = document.createElement('div');
        trendingDiv.classList.add('flex', 'items-center', 'w-full', 'p-3', 'py-1', 'pl-4', 'pr-1', 'leading-tight', 'transition-all', 'rounded-lg', 'outline-none', 'text-start', 'hover:bg-blue-gray-50', 'hover:bg-opacity-80', 'hover:text-blue-gray-900', 'focus:bg-blue-gray-50', 'focus:bg-opacity-80', 'focus:text-blue-gray-900', 'active:bg-blue-gray-50', 'active:bg-opacity-80', 'active:text-blue-gray-900');

        trendingDiv.innerHTML = `<p class='ml-auto'>${item.serviceName} = ${item.totalSchedules}</p>`;
        container.appendChild(trendingDiv);
    });
}


// TODO: Gerar PDF do relatório
// function generatePDF(list) {
//     console.log
//     const doc = new PDFDocument({size: 'A4'});
//     doc.pipe(fs.createWriteStream('relatorio.pdf'));

//     doc.fontSize(25).text('Relatório', 100, 80);

//     list.forEach((schedule) => {
//         doc.fontSize(14).text(`${schedule.serviceName} - ${schedule.data} - ${schedule.time} - ${schedule.username} - ${schedule.userPhone}`, 100, 120 + index * 20);
//     });

//     doc.end();
// }