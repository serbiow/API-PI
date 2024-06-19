import openDb from "../database/configDB.js";

class SecQuestionsRepository {
  async createSecQuestions(secQuestion) {
    return openDb()
      .then((db) => {
        return db.run(
          `
          INSERT INTO SECURITY_QUESTIONS(answer, questionId, userId)
          VALUES
          ("${secQuestion.answer1}", ${secQuestion.question1}, ${secQuestion.userId}),
          ("${secQuestion.answer2}", ${secQuestion.question2}, ${secQuestion.userId}),
          ("${secQuestion.answer3}", ${secQuestion.question3}, ${secQuestion.userId});
          `
        );
      })
      .catch((err) => {
        console.log(err)
        throw new Error("Erro na criação de perguntas de segurança");
      });
  };

  async verify(userId) {
    return openDb().then((db) => {
      return db
        .all(`SELECT * FROM SECURITY_QUESTIONS WHERE userId = ${userId}`)
        .then((res) => res);
    }).catch(err => { throw new Error("Pergunta de segurança não cadastrada") });
  }

  async findSecQuestions(userId) {
    return openDb()
      .then((db) => {
        return db.all(
          `
          SELECT q.question, sq.answer
          FROM SECURITY_QUESTIONS sq
          JOIN QUESTIONS q ON sq.questionId = q.id
          WHERE sq.userId = ${userId};
          `
        );
      })
      .catch((err) => {
        console.log(err)
        throw new Error("Erro ao encontrar perguntas de segurança");
      });
  };
}

export default SecQuestionsRepository;