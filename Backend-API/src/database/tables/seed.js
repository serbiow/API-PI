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
]

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
};


