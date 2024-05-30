import SecQuestions from "../models/secQuestions.js";
import SecQuestionsRepository from "../repository/secQuestionsRepository.js"

class SecQuestionsController {
    constructor() {
        this.secQuestionsRepository = new SecQuestionsRepository();
    }

    //Criar perguntas de segurança
    async createSecQuestions(req, res) {
        console.log(req.body)
        const { question1, question2, question3, answer1, answer2, answer3 } = req.body;

        if (!question1 || !question2 || !question3 || !answer1 || !answer2 || !answer3) {
            return res.status(400).json({ message: "Dados inválidos" });
        }

        try {
            const hashedAnswer1 = await encrypt(answer1);
            const hashedAnswer2 = await encrypt(answer2);
            const hashedAnswer3 = await encrypt(answer3);

            const secQuestion = new SecQuestions();
            secQuestion.question1 = question1;
            secQuestion.question2 = question2;
            secQuestion.question3 = question3;

            secQuestion.answer1 = hashedAnswer1;
            secQuestion.answer2 = hashedAnswer2;
            secQuestion.answer3 = hashedAnswer3;

            //secQuestion.userId = req.user.id;

            //console.log(secQuestion.userId);

            const newQuestions = await this.secQuestionsRepository.createSecQuestions(secQuestion);

            res
                .status(201)
                .json({ message: "Perguntas de segurança criadas com sucesso", secQuestion: newQuestions });
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Erro ao criar perguntas de segurança", err });
        }
    }
}

export default SecQuestionsController;