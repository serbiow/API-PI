import sqlite from 'sqlite3';

class Database {
    constructor() {
        this.connection = new sqlite.Database('database.db', (err) => {
            if (err) {
                console.error('Erro ao conectar ao banco de dados:', err);
                return;
            };
        });
    };
};

export default Database;