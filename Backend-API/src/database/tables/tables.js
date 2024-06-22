import openDb from "../configDB.js";

export async function createTables() {
    const db = await openDb();

    await db.exec(
        `
        CREATE TABLE IF NOT EXISTS SERVICES
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            description TEXT,
            price REAL NOT NULL,
            duration INTEGER NOT NULL
        );
        `
    );

    await db.exec(
        `
        CREATE TABLE IF NOT EXISTS USER 
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL, 
            email TEXT UNIQUE,
            phone TEXT UNIQUE NOT NULL,
            password TEXT,
            staff INTEGER DEFAULT (0)
        );
        `
    );

    await db.exec(
        `
        CREATE TABLE IF NOT EXISTS SCHEDULE
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            status INTEGER NOT NULL,
            userId INTEGER NOT NULL,
            serviceId INTEGER NOT NULL,
            FOREIGN KEY(userId) REFERENCES USER(id),
            FOREIGN KEY(serviceId) REFERENCES SERVICE(id)
        );
        `
    );

    await db.exec(
        `
        CREATE TABLE IF NOT EXISTS QUESTIONS
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL
        );
        `
    );

    await db.exec(
        `
        CREATE TABLE IF NOT EXISTS SECURITY_QUESTIONS
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            answer TEXT NOT NULL,
            questionId INTEGER NOT NULL,
            userId INTEGER NOT NULL,
            FOREIGN KEY(questionId) REFERENCES QUESTIONS(id),
            FOREIGN KEY(userId) REFERENCES USER(id)
        );
        `
    );
}
