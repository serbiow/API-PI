import AuthController from "../controller/authController.js";
import authenticateJWT from "../middleware/authenticateJWT.js";
import express from 'express';

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/login', authController.login.bind(authController));
authRouter.post('/register', authController.register.bind(authController));
authRouter.post('/passwordRecover', authController.recoverPassword.bind(authController));
authRouter.get('/perfil', authenticateJWT, authController.profile.bind(authController));

export default authRouter;