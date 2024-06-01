//import serviceSeeds from '../../assets/services.json';
import openDb from "../configDB.js";
const serviceSeeds = [
    /*
    {
        "name":"serviço 1",
        "description": "desc",
        "price":  100.00,
        "duration": 1
    },
    */
];

const questionSeeds =[
    {
        "question": "Qual é o nome da sua cidade natal?"
    },
    {
        "question": "Qual é o nome do seu primeiro animal de estimação?"
    },
    {
        "question": "Qual é o nome da sua mãe?"
    },
    {
        "question": "Qual é o seu time esportivo favorito?"
    },
    {
        "question": "Qual é o nome da sua primeira escola?"
    },
    {
        "question": "Qual é o nome do seu melhor amigo de infância?"
    },
    {
        "question": "Qual seu número da sorte?"
    },
    {
        "question": "Qual o seu perfume favorito?"
    },
    {
        "question": "Qual sua cor favorita?"
    }
];

export function populate(){

    serviceSeeds.forEach(seed => {
        openDb().then(db => {
            db.exec(
                `
                INSERT INTO SERVICES (name, description, price, duration)
                    VALUES(
                        '${seed.name}',
                        '${seed.description}',
                        '${seed.price}',
                        '${seed.duration}'
                    );
                `
            );
        })
    });

    questionSeeds.forEach(question => {
        openDb().then(db => {
            db.exec(
                `
                INSERT INTO QUESTIONS (question)
                    VALUES(
                        '${question.question}'
                    );
                `
            );
        })
    });
};


