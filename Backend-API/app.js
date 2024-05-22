import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import authenticateJWT from './src/middleware/authenticateJWT.js';

import userRouter from './src/router/userRouter.js';
import authRouter from './src/router/authRouter.js';
import shceduleRouter from './src/router/scheduleRouter.js';
import serviceRouter from './src/router/serviceRouter.js';

import Config from './config.js';
const config = new Config();

config.pre_fligth_check();
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/user', authenticateJWT, userRouter);
app.use('/schedule', authenticateJWT,shceduleRouter);
app.use('/service', authenticateJWT ,serviceRouter)

app.get('/api', (req, res) => {
    res.status().json({message: "Api Rodando"})
});

app.listen(port, (err) => {
    if (err) {
        console.log("Ocorreu um erro ao iniciar o servidor:", err);
        return;
    }
    console.log(`Servidor está rodando na porta ${port}`);
});

export default app;