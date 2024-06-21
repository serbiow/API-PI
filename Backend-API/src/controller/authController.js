import User from "../models/user.js";
import UserRepository from "../repository/userRepository.js";
import { encrypt, verify } from "../utils/bcrypt.js";
import bcrypt from 'bcrypt';
import { encode } from "../utils/jwt.js";
import nodemailer from 'nodemailer';
import crypto from 'crypto';


class AuthController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserByEmail(req, res) {
    const { email } = req.params;

    this.userRepository.findUserByEmail(email).then((user) => {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        staff: user.staff,
      });
    }).catch((err) => {
      res.status(404).json({ message: "Usuário não encontrado" });
    });
  }

  async login(req, res) {
    const { email, password } = req.body;

    this.userRepository
      .findUserByEmail(email)
      .then((user) => {
        verify(password, user.password, (err, result) => {
          if (result) {
            encode({ id: user.id, name: user.name, email: user.email, phone: user.phone, staff: user.staff }).then(
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

  async recoverPassword(req, res) {
    const { answer1, answer2, answer3, hashedAnswer1, hashedAnswer2, hashedAnswer3 } = req.body;

    try {
      const isAnswer1Valid = await bcrypt.compare(answer1, hashedAnswer1);
      const isAnswer2Valid = await bcrypt.compare(answer2, hashedAnswer2);
      const isAnswer3Valid = await bcrypt.compare(answer3, hashedAnswer3);

      if (isAnswer1Valid && isAnswer2Valid && isAnswer3Valid) {
        return res.status(200).json({ message: 'Respostas válidas. Você pode redefinir sua senha.' });
      } else {
        return res.status(400).json({ message: 'Respostas inválidas. Por favor, tente novamente.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao verificar respostas de segurança.' });
    }
  }

  async resetPassword(req, res) {
    const { newPassword, email } = req.body;

    try {
      const user = await this.userRepository.findUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado.' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await this.userRepository.updateUserPassword(user.id, hashedPassword);

      return res.status(200).json({ message: 'Senha redefinida com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao redefinir senha.' });
    }
  }

}

export default AuthController;
