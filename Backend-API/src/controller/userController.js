import UserRepository from '../repository/userRepository.js'
import User from '../models/user.js';
import bcrypt from 'bcrypt'

//Falta o método de exclusão

class UserController {
    constructor() {
        this.UserRepository = new UserRepository();
    };

    async deleteUser(req, res){
        
        const id = req.params.id;
        const user = await this.UserRepository.findUserById(id);

        if (user) {
           this.UserRepository.deleteUser(id).then(()=>{
            res.status(204).json({message: "Usuário Removido"});
           }).catch(err=>{res.status(500).json({message: "Operação não realizada", err})});
        };

    };

    async updateUserName(req, res) {
        const { id } = req.params;

        const user = await this.UserRepository.findUserById(id);

        if (!user) {
            res.status(404).json({ message: "Usuário não encontrado" })
        };

        user.name = req.body.name || user.name;

        const updateUserName = await this.UserRepository.updateUserName(id, user);
        res.json(updateUserName);
    };


    async updateUserPassword(req, res) {
        const { id } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "A senha é Obrigatória" })
        };

        const user = await this.UserRepository.findUserById(id);

        user.password = await bcrypt.hash(password, 12);

        const updateUserName = await this.UserRepository.updateUserName(id, user);
        res.json(updateUserName);
    };

    async getUserById(req, res) {
        const { id } = req.params
        const user = await this.UserRepository.findUserById(id)

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        };

        res.json({id:user.id, name:user.name, email:user.email, staff:user.staff});
        
    };

    async getUserByEmail(req, res) {
        const { email } = req.params
        const user = await this.UserRepository.findUserByEmail(email)

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        };

        res.json({id:user.id, name:user.name, email:user.email, staff:user.staff});
    };

};

export default UserController;