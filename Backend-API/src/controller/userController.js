import UserRepository from "../repository/userRepository.js";
import { encrypt } from "../utils/bcrypt.js";
import { encode } from "../utils/jwt.js";

class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUserById(req, res) {
        this.userRepository.findUserById(req.user.id).then((user) => {
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                staff: user.staff,
            });
        }).catch((err) => {
            res.status(404).json({ message: "Usuário não encontrado" });
        });
    }

    async updateUser(req, res) {
        const { name, email } = req.body;
        try {
            // Busque o usuário atual
            const user = await this.userRepository.findUserById(req.user.id);

            // Atualize o usuário com os novos dados ou mantenha os antigos
            await this.userRepository.updateUser(req.user.id, {
                name: name || user.name,
                email: email || user.email,
            });

            // Obtenha os novos dados do usuário
            const newUserData = await this.userRepository.findUserById(req.user.id);

            // Gere um novo token JWT com os dados atualizados do usuário
            const token = await encode({
                id: req.user.id,
                name: name || newUserData.name,
                email: email || newUserData.email,
            });

            // Retorne o novo token e uma mensagem de sucesso
            res.json({ token, message: "Dados do usuário atualizados com sucesso" });
        } catch (err) {
            // Em caso de erro, retorne uma mensagem apropriada
            res.status(402).json({ message: "Erro ao atualizar dados do usuário" });
        }
    }


    async updateUserPassword(req, res) {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "A senha é Obrigatória" });
        }

        this.userRepository.findUserById(req.user.id).then(user => {
            encrypt(password).then(hashedPassword => {
                this.userRepository.updateUserPassword(user.id, hashedPassword).then(() => {
                    res.status(204);
                });
            });
        });
    };

    //TODO: Refatorar deleteUser para deactivateUser
    async deleteUser(req, res) {
        this.userRepository.findUserById(req.user.id).then(user => {
            this.userRepository.deleteUser(user.id).then(() => {
                res.status(200).json({ message: "Usuário Removido" });
            })
        }).catch((err) => {
            res.status(402).json({ message: "Operação não realizada", err });
        });
    };
};

export default UserController;
