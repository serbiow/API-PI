import { createTables } from "./src/database/tables/tables.js";
import { populate } from "./src/database/tables/seed.js";

class Config {
    constructor() {}

    async pre_fligth_check() {
        try {
            await createTables();
            await populate();
        } catch (error) {
            console.error('Erro ao criar a tabela ou popular dados:', error);
        }
    }
}

export default Config;
