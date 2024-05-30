import openDb from "../database/configDB.js";

class SecQuestionsRepository {
  async createSecQuestions(secQuestion) {
    return openDb()
      .then((db) => {
        return db.run(
          `
          INSERT INTO SECURITY_QUESTIONS(question, answer, userId)
          VALUES(?, ?, ?)
          `,
          [secQuestion.question1, secQuestion.answe1, secQuestion.userId],
          `
          INSERT INTO SECURITY_QUESTIONS(question, answer, userId)
          VALUES(?, ?, ?)
          `,
          [secQuestion.question2, secQuestion.answer2, secQuestion.userId],
          `
          INSERT INTO SECURITY_QUESTIONS(question, answer, userId)
          VALUES(?, ?, ?)
          `,
          [secQuestion.question3, secQuestion.answer3, secQuestion.userId]
        );
      })
      .catch((err) => {
        throw new Error("Erro na criação de perguntas de segurança");
      });
  }
}

export default SecQuestionsRepository;