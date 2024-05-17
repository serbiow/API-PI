import express from 'express'
import ScheduleController from '../controller/scheduleController.js'

const shceduleRouter = express.Router();
const scheduleController = new ScheduleController();

shceduleRouter.get("/:id", scheduleController.findById.bind(scheduleController));
shceduleRouter.post("/new", scheduleController.createSchedule.bind(scheduleController));
shceduleRouter.put("/update", scheduleController.updateScheduleData.bind(scheduleController));
shceduleRouter.delete("/delete/:id", scheduleController.deleteSchedule.bind(scheduleController));

export default shceduleRouter;