import express from 'express'
import ScheduleController from '../controller/scheduleController.js'

const scheduleRouter = express.Router();
const scheduleController = new ScheduleController();

scheduleRouter.get("/", scheduleController.findById.bind(scheduleController));
scheduleRouter.get("/list", scheduleController.listAllSchedules.bind(scheduleController));
scheduleRouter.post("/new", scheduleController.createSchedule.bind(scheduleController));
scheduleRouter.put("/update", scheduleController.updateScheduleDate.bind(scheduleController));
scheduleRouter.delete("/delete", scheduleController.deleteSchedule.bind(scheduleController));

export default scheduleRouter;