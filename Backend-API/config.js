import { populate } from "./database/tables/seed.js";
import { createTables } from "./database/tables/tables.js";

class Config {
    constructor() {}

    async pre_flight_check() {
        try {
            await createTables();
            await populate();
        } catch (error) {
            console.error('Erro ao criar a tabela ou popular dados:', error);
        }
    }
}

export default Config;
