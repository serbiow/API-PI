import User from "../models/user.js";
import UserRepository from "../repository/userRepository.js";
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

  //TODO: Fazer o recoverPassword funcionar
  async recoverPassword(req, res) {
    
  }
}

export default AuthController;
