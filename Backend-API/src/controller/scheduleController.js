import ScheduleRepository from "../repository/scheduleRepository.js";
import Schedule from "../models/schedule.js";

class ScheduleController {
  constructor() {
    this.scheduleRepository = new ScheduleRepository();
  }

  async createSchedule(req, res) {
    try {
      const { serviceId, date, time } = req.body;
      const schedule = new Schedule(serviceId, date, time, req.user.id);

      // verificar se é válido
      if (!schedule.serviceId || !schedule.date || !schedule.time || !schedule.userId) {
        return res.status(400).json({ message: "Dados Invalidos" });
      }

      // verificar se existe
      const existingSchedule = await this.scheduleRepository.findByDateTime(date, time);
      if (existingSchedule) {
        return res.status(400).json('Agendamento já existente');
      }

      // criar agendamento
      const newSchedule = await this.scheduleRepository.createSchedule(schedule);
      return res.status(201).json(newSchedule);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }


  async updateScheduleDate(req, res) {
    const { scheduleId, newDate, newTime } = req.body;
    this.scheduleRepository.findById(scheduleId).then(schedule => {
      this.scheduleRepository.updateScheduleData(scheduleId, req.user.id, newDate, newTime).then(() => {
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

  async findByDateTime(req, res) {
    const { date, time } = req.query;
    this.scheduleRepository.findByDateTime(date, time).then(schedule => {
      res.status(400).json(schedule)
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
