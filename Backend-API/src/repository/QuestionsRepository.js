import openDb from "../database/configDB.js";

class QuestionsRepository{
    async createSecurityQuestions(user) {
        return openDb()
          .then((db) => {
            return db.run(
              `
                    INSERT INTO SECURITY_QUESTIONS(question, answer, userId)
                    VALUES(?, ?, ?)
                    `,
              [user.name, user.email, user.phone, user.password]
            );
          })
          .catch((err) => {
            throw new Error("Erro na criação de usuário");
          });
      }
}

export default QuestionsRepository;