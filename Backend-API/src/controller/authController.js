import User from "../models/user.js";
import secQuestions from "../models/secQuestions.js"
import UserRepository from "../repository/userRepository.js";
import QuestionsRepository from "../repository/QuestionsRepository.js";
import { encrypt, verify } from "../utils/bcrypt.js";
import { encode } from "../utils/jwt.js";
import nodemailer from 'nodemailer';
import crypto from 'crypto';


class AuthController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(req, res) {
    const { email, password } = req.body;

    this.userRepository
      .findUserByEmail(email)
      .then((user) => {
        verify(password, user.password, (err, result) => {
          if (result) {
            encode({ id: user.id, name: user.name, email: user.email, phone: user.phone }).then(
              (token) => {
                res.json({ token });
              }
            );
          } else {
            res.status(400).send("Credenciais inválidas.");
          }
        });
      })
      .catch((err) => {
        res.status(404).json({ message: "Usuário não encontrado", err });
      });
  }

  async register(req, res) {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "Dados inválidos" });
    }

    /*
    FIXME:
  encrypt(password).then((hashedPassword) => {
      this.userRepository
        .createUser({ name, email, password: hashedPassword })
        .then((user) => {
          res
            .status(201)
            .json({ message: "Usuário criado com sucesso", user });
        })
    }).catch(err => {
        res.status(500)
        .json({ message: 'Erro ao criar usuário', error: err.message });
    });
    */

    try {
      const hashedPassword = await encrypt(password);
      const user = new User(name, email, phone, hashedPassword);
      const newUser = await this.userRepository.createUser(user);
      res
        .status(201)
        .json({ message: "Usuário criado com sucesso", user: newUser });
    } catch (err) {
      res.status(500).json({ message: "Erro ao criar usuário", err });
    }
  }

  //Criar perguntas de segurança
  async createSecurityQuestions(req, res) {
    console.log('chamou')
    const { question1, question2, question3, answer1, answer2, answer3 } = req.body;

    if (!question1 || !question2 || !question3 || !answer1 || !answer2 || !answer3) {
      return res.status(400).json({ message: "Dados inválidos" });
    }

    try {
      const hashedAnswer1 = await encrypt(answer1);
      const hashedAnswer2 = await encrypt(answer2);
      const hashedAnswer3 = await encrypt(answer3);

      const secQuestion = new secQuestions();
      secQuestion.question1 = question1;
      secQuestion.question2 = question2;
      secQuestion.question3 = question3;

      secQuestion.answer1 = hashedAnswer1;
      secQuestion.answer2 = hashedAnswer2;
      secQuestion.answer3 = hashedAnswer3;

      secQuestion.userId = req.user.id;

      console.log(secQuestion.userId);

      const newQuestions = await this.QuestionsRepository.createSecurityQuestions(secQuestion);

      res
        .status(201)
        .json({ message: "Perguntas de segurança criadas com sucesso", secQuestion: newQuestions });
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Erro ao criar perguntas de segurança", err });
    }
  }

  //TODO: Fazer o recoverPassword funcionar
  async recoverPassword(req, res) {
    const { email } = req.body;
    // Verifique se o email está registrado
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      return res.status(404).send({ message: 'Email não encontrado' });
    }

    // Gere um token para recuperação de senha (aqui simplificado)
    const token = crypto.randomBytes(20).toString('hex');

    // Salve o token e a data de expiração no banco de dados (implementação necessária)
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    console.log(user)

    // Configure o transportador do Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'emailnode02@gmail.com',
        pass: 'NodeMailer#554',
      },
    });

    // Configure o email
    const mailOptions = {
      to: user.email,
      from: 'emailnode02@gmail.com',
      subject: 'Recuperação de Senha',
      text: `Você está recebendo isso porque você (ou alguém mais) requisitou a recuperação da senha da sua conta.\n\n
        Por favor, clique no seguinte link, ou copie e cole em seu navegador para completar o processo:\n\n
        http://${req.headers.host}/reset/${token}\n\n
        Se você não requisitou isso, por favor, ignore este email e sua senha permanecerá a mesma.\n`
    };

    // Envie o email
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err)
        return res.status(500).send({ message: 'Erro ao enviar o email' });
      }
      res.status(200).send({ message: 'Email de recuperação enviado com sucesso' });
    });
  }
}

export default AuthController;
