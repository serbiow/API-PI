import AuthController from "../controller/authController.js";
import express from 'express';

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/login', authController.login.bind(authController));
authRouter.post('/register', authController.register.bind(authController));
authRouter.post('/questions', authController.createSecurityQuestions.bind(authController));
authRouter.post('/password/recover', authController.recoverPassword.bind(authController));

export default authRouter;