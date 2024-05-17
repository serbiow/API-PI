import express from 'express';
import UserController from '../controller/userController.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.get("/:id",userController.getUserById.bind(userController));
userRouter.get("/:email",userController.getUserByEmail.bind(userController));
userRouter.put("/name/:id",userController.updateUserName.bind(userController));
userRouter.put("/password/:id",userController.updateUserPassword.bind(userController));
userRouter.delete("/unsigned/:id", userController.deleteUser.bind(userController));
export default userRouter;