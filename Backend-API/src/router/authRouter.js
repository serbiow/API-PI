import AuthController from "../controller/authController.js";
import express from 'express';

const authRouter = express.Router();
const authController = new AuthController();

authRouter.get("/:email",authController.getUserByEmail.bind(authController));
authRouter.post('/login', authController.login.bind(authController));
authRouter.post('/register', authController.register.bind(authController));
authRouter.post('/password/recover', authController.recoverPassword.bind(authController));
authRouter.post('/password/reset', authController.resetPassword.bind(authController));

export default authRouter;