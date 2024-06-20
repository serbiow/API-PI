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

        const list = await response.json();
        console.log(list);
    } catch (error) {
        console.error('Erro:', error);
    }
});

document.getElementById('relatorio2').addEventListener('click', async (event) => {
    try {
        date = prompt("Por favor, digite a data", "mm/dd/yyyy")
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
        console.log(list);
    } catch (error) {
        console.error('Erro:', error);
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
        console.log(list);
    } catch (error) {
        console.error('Erro:', error);
    }
});

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