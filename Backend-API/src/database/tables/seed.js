import openDb from "../configDB.js";

const serviceSeeds = [
    // {
    //     "name": "Design Personalizado Simples",
    //     "description": "desc",
    //     "price":  40,
    //     "duration": 1
    // },
    // {
    //     "name": "Design Personalizado com Henna",
    //     "description": "desc",
    //     "price":  55,
    //     "duration": 2
    // },
    // {
    //     "name": "Design Personalizado com coloração",
    //     "description": "desc",
    //     "price":  60,
    //     "duration": 2
    // },
    // {
    //     "name": "Brow Lamination",
    //     "description": "desc",
    //     "price":  145,
    //     "duration": 2
    // },
    // {
    //     "name": "Micropigmentação Slim Brows",
    //     "description": "desc",
    //     "price":  360,
    //     "duration": 3
    // },
    // {
    //     "name": "Micropigmentação Soft Shadow",
    //     "description": "desc",
    //     "price":  400,
    //     "duration": 3
    // },
    // {
    //     "name": "Lash Lifting",
    //     "description": "desc",
    //     "price":  135,
    //     "duration": 1
    // },
    // {
    //     "name": "Dermaplaning",
    //     "description": "desc",
    //     "price":  49.90,
    //     "duration": 1
    // },
];

const questionSeeds = [
    // {
    //     "question": "Qual é o nome da sua cidade natal?"
    // },
    // {
    //     "question": "Qual é o nome do seu primeiro animal de estimação?"
    // },
    // {
    //     "question": "Qual é o nome da sua mãe?"
    // },
    // {
    //     "question": "Qual é o seu time esportivo favorito?"
    // },
    // {
    //     "question": "Qual é o nome da sua primeira escola?"
    // },
    // {
    //     "question": "Qual é o nome do seu melhor amigo de infância?"
    // },
    // {
    //     "question": "Qual seu número da sorte?"
    // },
    // {
    //     "question": "Qual o seu perfume favorito?"
    // },
    // {
    //     "question": "Qual sua cor favorita?"
    // }
];

export async function populate() {
    const db = await openDb();

    for (const seed of serviceSeeds) {
        await db.exec(
            `
            INSERT INTO SERVICES (name, description, price, duration)
                VALUES('${seed.name}', '${seed.description}', '${seed.price}', '${seed.duration}');
            `
        );
    }

    for (const question of questionSeeds) {
        await db.exec(
            `
            INSERT INTO QUESTIONS (question)
                VALUES('${question.question}');
            `
        );
    }
}
