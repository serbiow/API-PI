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
        const user = await this.UserRepository.findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: "Usuário ou senha inválida" })
        };

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.status(400).send('Credenciais inválidas.');
            }
        });
    };

    async register(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(402).json({ message: 'Dados inválidos' });
        };

        bcrypt.genSalt(SALT_ROUNDS).then(salt => {
            const user = new User(name, email, password);
            bcrypt.hash(user.password, salt).then(hash => {
                user.password = hash;
                user.staff = 0;
                return this.UserRepository.createUser(user);
            }).then(newUser => {
                res.json(newUser);
            });
        }).catch(err => res.json({ status: 500, err }));
    };

    async authenticateJWT(req, res, next) {
        const token = req.header('Authorization')?.split(' ')[1];
        if (token) {
            jwt.verify(token, SECRET_KEY, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    };

    async recoverPassword(req, res) {
        const { email } = req.body;
        const user = await this.UserRepository.findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        };

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })
    };
};

export default AuthController;