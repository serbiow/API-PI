import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRouter from './src/router/userRouter.js';
import authRouter from './src/router/authRouter.js';
import shceduleRouter from './src/router/scheduleRouter.js';

import Config from './config.js';
const config = new Config();

config.pre_fligth_check();
const app = express();
const port = 3000;

// Middleware para analisar dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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


// Rota para a página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend-API/src/login.html'));
});

// Middleware para verificar o token JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (token) {
        jwt.verify(token, 'your_secret_key', (err, user) => {
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

// Rota protegida de exemplo
app.get('/perfil', authenticateJWT, (req, res) => {
    res.send('Este é um endpoint protegido.');
});

//Teste
app.get('/api', (req, res) => {
    res.status(200).json({ message: "Api funcionando" })
})

//Port - Listen
app.listen(port, (err) => {
    if (err) {
        console.log("Ocorreu um erro ao iniciar o servidor:", err);
        return;
    }
    console.log(`Servidor está rodando na porta ${port}`);
});

export default app;