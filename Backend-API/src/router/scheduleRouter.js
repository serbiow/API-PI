import express from 'express'
import ScheduleController from '../controller/scheduleController.js'

const shceduleRouter = express.Router();
const scheduleController = new ScheduleController();

shceduleRouter.get("/", scheduleController.findById.bind(scheduleController));
shceduleRouter.get("/list", scheduleController.listAllSchedules.bind(scheduleController));
shceduleRouter.post("/new", scheduleController.createSchedule.bind(scheduleController));
shceduleRouter.put("/update", scheduleController.updateScheduleDate.bind(scheduleController));
shceduleRouter.delete("/delete", scheduleController.deleteSchedule.bind(scheduleController));

export default shceduleRouter;