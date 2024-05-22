import express from 'express';
import UserController from '../controller/userController.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.get("/",userController.getUserById.bind(userController));
userRouter.put("/update",userController.updateUser.bind(userController));
userRouter.put("/update/password",userController.updateUserPassword.bind(userController));
userRouter.delete("/delete", userController.deleteUser.bind(userController));
export default userRouter;