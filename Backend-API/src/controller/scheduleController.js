import ScheduleRepository from "../repository/scheduleRepository.js";
import Schedule from "../models/schedule.js";

class ScheduleController {
  constructor() {
    this.scheduleRepository = new ScheduleRepository();
  }

  async createSchedule(req, res) {
    console.log('chamou')
    const { serviceId, date, time } = req.body;
    console.log(serviceId, date, time);
    const schedule = new Schedule(serviceId, date, req.user.id);
    if (!schedule.serviceId || !schedule.date || !schedule.userId) {
      return res.status(400).json({ message: "Dados Invalidos" });
    }

    this.scheduleRepository.createSchedule(schedule).then((newSchedule) => {
      res.status(201).json(newSchedule);
    }).catch((err) => {
      res.status(500).json({ message: err });
    });
  }

  async updateScheduleDate(req, res) {
    const { scheduleId, newDate } = req.body;
    this.scheduleRepository.findById(scheduleId).then(schedule => {
      this.scheduleRepository.updateScheduleData(scheduleId, req.user.id, newDate).then(() => {
        res.status(204);
      });
    }).catch(err => {
      res.status(404).json({ message: "Agendamento Não existe" });
    })
  }

  async findById(req, res) {
    const { id } = req.query;
    this.scheduleRepository.findById(id).then(schedule => {
      res.status(200).json(schedule)
    }).catch(err => {
      res.status(404).json({ message: "Agendamento não existe" })
    })
  };

  async listAllSchedules(req, res) {
    this.scheduleRepository.listAllSchedules(req.user.id).then(list => {
      res.status(200).json(list)
    }).catch(err => {
      res.status(404).json({ message: "Nenhum agendamento encotrado" });
    })
  };

  async deleteSchedule(req, res) {
    const scheduleId = req.query.id;
    this.scheduleRepository.findById(scheduleId).then(schedule => {
      this.scheduleRepository.deleteSchedule(scheduleId, req.user.id).then(() => {
        res.status(200).json({ message: "Agendamento Removido" });
      }).catch((err) => {
        res.status(402).json({ message: "Operação não realizada", err });
      });
    });
  };
};

export default ScheduleController;
