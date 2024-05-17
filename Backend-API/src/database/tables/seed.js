//import serviceSeeds from '../../assets/services.json';
import Database from '../database.js';
const serviceSeeds = [
    /*
    {
        "name":"serviço 1",
        "description": "desc",
        "price":  100.00,
        "duration": 1
    },
    */
]

export function populate(){
    const database = new Database().connection;

    serviceSeeds.forEach(seed => {
        database.exec(
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
    });
};


