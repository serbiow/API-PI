import User from "../models/user.js"
import UserRepository from "../repository/userRepository.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = "C3swDTsQgTUnlRTM/J66J6OvNBj08iMIKPY6Egaih/r1k97TMhpdI29fRWFJLpZEHP2oGUyLLqA7gY8d"
const SALT_ROUNDS = 12;

class AuthController {
    constructor() {
        this.UserRepository = new UserRepository();
    };

    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Dados inválidos' });
        }

        const user = await this.UserRepository.findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" })
        };

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.status(400).send('Credenciais inválidas.');
            }
        });
    };

    async register(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Dados inválidos' });
        }

        try {
            const salt = await bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = new User(name, email, hashedPassword);
            const newUser = await this.UserRepository.createUser(user);
            res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
        } catch (err) {
            res.status(500).json({ message: 'Erro ao criar usuário', error: err.message });
        }
    };

    async recoverPassword(req, res) {
        const { email } = req.body;
        const user = await this.UserRepository.findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        };

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    };

    async profile(req, res) {
        const userId = req.user.id;
        try {
            const user = await this.UserRepository.findUserById(userId);
            res.json({ id: user.id, name: user.name, email: user.email });
        } catch (err) {
            res.status(500).json({ message: 'Erro ao obter perfil', error: err.message });
        }
    };
};

export default AuthController;