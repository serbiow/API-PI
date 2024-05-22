import openDb from "../database/configDB.js";

class UserRepository {
  async createUser(user) {
    return openDb()
      .then((db) => {
        return db.run(
          `
                INSERT INTO USER(name, email, password)
                VALUES(?, ?, ?)
                `,
          [user.name, user.email, user.password]
        );
      })
      .catch((err) => {
        throw new Error("Erro na criação de usuário");
      });
  }

  async updateUser(userId, newData) {
    openDb()
      .then((db) => {
        db.exec(
          `
                UPDATE user
                SET name = '${newData.name}', email = '${newData.email}'
                WHERE id = '${userId}';
                `
        );
      })
      .catch((err) => {
        throw new Error("Erro na atualização do usuário");
      });
  }

  async updateUserPassword(userId, newPassword) {
    openDb()
      .then((db) => {
        db.run(
          `
                UPDATE user 
                SET password = "${newPassword}"
                WHERE id = "${userId}" 
                `
        );
      })
      .catch((err) => {
        throw new Error("Erro ao atualizar a senha do usuário");
      });
  }

  async findUserById(userId) {
    return openDb()
      .then((db) => {
        return db
          .get(
            `
                SELECT * FROM USER WHERE user.id = ${userId}
                `
          )
          .then((res) => res);
      })
      .catch((err) => {
        throw new Error("Usuário não encontrado");
      });
  }

  async findUserByEmail(userEmail) {
    return openDb()
      .then((db) => {
        return db
          .get(
            `
                SELECT * FROM USER WHERE user.email = '${userEmail}'
                `
          )
          .then((res) => res);
      })
      .catch((err) => {
        throw new Error("Usuário não encontrado");
      });
  }

  async deleteUser(userId) {
    return openDb()
      .then((db) => {
        db.exec(`DELETE FROM USER WHERE user.id = ${userId}`);
      })
      .catch((err) => {
        throw new Error("Erro ao realizar operação");
      });
  }
}

export default UserRepository;
