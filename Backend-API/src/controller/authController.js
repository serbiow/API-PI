import User from "../models/user.js";
import UserRepository from "../repository/userRepository.js";
import { encrypt, verify } from "../utils/bcrypt.js";
import { encode } from "../utils/jwt.js";

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
            encode({ id: user.id, name: user.name, email: user.email }).then(
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
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
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
      const user = new User(name, email, hashedPassword);
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
    const { email } = req.body;
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const token = encode({ id: user.id, name: user.name, email: user.email });
    res.status(200).json({ token });
  }
}

export default AuthController;
