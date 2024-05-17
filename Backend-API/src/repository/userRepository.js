import openDb from "../database/configDB.js";

class UserRepository {
    async createUser(user) {
        openDb().then(db => {
            db.exec(
                `
                INSERT INTO USER(name, email, password)
                    VALUES(
                        '${user.name}',
                        '${user.email}',
                        '${user.password}'
                    );
                `
            );
        }).catch(err => {throw new Error("Erro na criação de usuário")});
    };

    async updateUserName(userId, userData) {
        openDb().then(db => {
            db.run(
                `
                UPDATE user 
                SET name = "${userData.name}"
                WHERE id = "${userId}" 
                `
            );
        });
    };

    async updateUserPassword(userId, newPassword) {
        openDb().then(db => {
            db.run(
                `
                UPDATE user 
                SET name = "${newPassword}"
                WHERE id = "${userId}" 
                `
            );
        });
    };

    async findUserById(userId) {
        return openDb().then(db => {
            return db.get(
                `
                SELECT * FROM USER WHERE user.id = ${userId}
                `
            ).then(res => res)
        });
    };

    async findUserByEmail(userEmail) {
        return openDb().then(db => {
            return db.get(
                `
                SELECT * FROM USER WHERE user.email = '${userEmail}'
                `
            ).then(res => res);
        });
    };

    async deleteUser(userId){
        return openDb().then(db =>{
            db.exec(
                `DELETE FROM USER WHERE user.id = ${userId}` 
            );
        });
    };

};

export default UserRepository;



