import SecQuestionsController from '../controller/secQuestionsController.js';
import express from 'express';

const secQuestionsRouter = express.Router();
const secQuestionsController = new SecQuestionsController();

secQuestionsRouter.post('/create', secQuestionsController.createSecQuestions.bind(secQuestionsController));

export default secQuestionsRouter;