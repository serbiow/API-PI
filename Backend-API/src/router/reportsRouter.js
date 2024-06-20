import express from 'express';
import ReportsController from '../controller/reportsController.js';

const reportsRouter = express.Router();
const reportsController = new ReportsController();

reportsRouter.get("/lasts", reportsController.lasts.bind(reportsController));

export default reportsRouter;