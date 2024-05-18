import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

import path from 'path';
import userRouter from './src/router/userRouter.js';
import authRouter from './src/router/authRouter.js';
import shceduleRouter from './src/router/scheduleRouter.js';
import authenticateJWT from './src/middleware/authenticateJWT.js';
import UserRepository from './src/repository/userRepository.js';
import { fileURLToPath } from 'url';

import Config from './config.js';
const config = new Config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const JWT_SECRET = "C3swDTsQgTUnlRTM/J66J6OvNBj08iMIKPY6Egaih/r1k97TMhpdI29fRWFJLpZEHP2oGUyLLqA7gY8d"

const userRepository = new UserRepository();

config.pre_fligth_check();
const app = express();
const port = 3000;

// Middleware para analisar dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar para servir arquivos estáticos do front-end
app.use(express.static(path.join(__dirname, '../../Frontend-API/src')));

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/schedule', shceduleRouter);

// app.user((req, res, next) => {
//     //Todo: Filtrar requisições permitidas
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PATCH,DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// })

//Populate Database

app.use(express.static(path.join(__dirname, '../../Frontend-API/src')));

// Rota para a página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend-API/src/login.html'));
});

// Rota protegida para servir a tela de perfil
app.get('/perfil', authenticateJWT, (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend-API/src/perfil.html'));
});

//Teste
app.get('/api', (req, res) => {
    res.status(200).json({ message: "Api funcionando" })
})

// TIRAR DAQUI DEPOIS
// rota para deletar usuário
app.delete('/user/delete', authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id; // ou qualquer outra forma de obter o ID do usuário logado
        await userRepository.deleteUser(userId);
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
});

// TIRAR DAQUI DEPOIS
// rota para atualizar usuário
app.put('/user/update', authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id; // ou qualquer outra forma de obter o ID do usuário logado
        const { name, email } = req.body; // password

        // pegar informações antigas no usuários
        const oldUserData = await userRepository.findUserById(userId);

        // atualizar as informações antigas, ou continuar com elas
        const updateUserData = {
            name: name || oldUserData.name,
            email: email || oldUserData.email,
            //password
        };

        // aqui você faz a lógica para atualizar os dados do usuário no banco de dados
        await userRepository.updateUser(userId, updateUserData); // password

        // gerar novo token
        const newToken = jwt.sign({id: userId, name: updateUserData.name, email: updateUserData.email}, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Dados do usuário atualizados com sucesso', token: newToken });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ message: 'Erro ao atualizar dados do usuário' });
    }
});

//Port - Listen
app.listen(port, (err) => {
    if (err) {
        console.log("Ocorreu um erro ao iniciar o servidor:", err);
        return;
    }
    console.log(`Servidor está rodando na porta ${port}`);
});

export default app;