import express from 'express';
import ServiceController from "../controller/serviceController.js";

const serviceController = new ServiceController();
const serviceRouter = express.Router();

serviceRouter.get("/list", serviceController.listAllServices.bind(serviceController));
serviceRouter.put("/update/:id", serviceController.updateService.bind(serviceController));

export default serviceRouter;