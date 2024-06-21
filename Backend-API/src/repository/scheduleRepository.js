import openDb from "../database/configDB.js";

class ScheduleRepository {
  async createSchedule(schedule) {
    openDb().then((db) => {
      db.exec(
        `
          INSERT INTO SCHEDULE(serviceId, date, time, status, userId)
          VALUES(
              "${schedule.serviceId}",
              "${schedule.date}",
              "${schedule.time}",
              "1",
              "${schedule.userId}"
          );
      `
      ).then((res) => res).catch(err => { throw new Error("Erro na criação de agendamento") });
    });
  }

  async updateScheduleDate(scheduleId, userId, newDate, newTime) {
    openDb().then((db) => {
      db.exec(
        `
            UPDATE schedule
            SET date = "${newDate}", time = "${newTime}"
            WHERE id = "${scheduleId}" 
            AND (userId = "${userId}" 
            OR (SELECT staff FROM USER WHERE id = "${userId}") = 1)
        `
      ).catch(err => { throw new Error("Erro ao atualizar dados de agendamento") });
    });
  }

  async findById(scheduleId) {
    return openDb().then((db) => {
      return db
        .get(
        `
          SELECT 
          s.id, s.date, s.time, s.userId, s.serviceId, 
          se.name AS serviceName, se.price, se.description, se.duration,
          u.name AS userName, u.email 
          FROM SCHEDULE AS s 
          JOIN USER AS u ON u.id = s.userId
          JOIN SERVICES AS se ON se.id = s.serviceId
          WHERE s.id = ${scheduleId}
        `
      )
        .then((res) => res).catch(err => { throw new Error("Agendamento não encotrado")});
    });
  }

  async findByDateTime(date, time) {
    return openDb().then((db) => {
      return db
        .get(
        `
          SELECT *
          FROM SCHEDULE
          WHERE date = "${date}" AND
          time = "${time}"
        `
      )
    });
  }

  async findByUserId(userId) {
    return openDb().then((db) => {
      return db
        .get(`SELECT * FROM SCHEDULE WHERE userId = ${userId}`)
        .then((res) => res);
    }).catch(err => { throw new Error("Agendamento não encontrado")});
  }

  async listAllSchedules(userId) {
    return openDb().then((db) => {
      return db
        .all(
          `
          SELECT s.id, s.date, s.time, s.userId, s.serviceId, se.name AS serviceName, u.name AS userName, u.email FROM SCHEDULE AS s 
          JOIN USER AS u ON u.id = s.userId
          JOIN SERVICES AS se ON se.id = s.serviceId
          WHERE (userId = '${userId}' AND status = "1")
          OR ((SELECT staff FROM USER WHERE id = "${userId}") = 1 AND status = "1")
          `)
        .then((res) => res).catch(err => { throw new Error("Nenhum agendameto disponível")});
    });
  }

  async deleteSchedule(scheduleId, userId) {
    openDb().then((db) => {
      db.exec(
        `
          UPDATE schedule
          SET status = "0"
          WHERE id = "${scheduleId}"
          AND (userId = "${userId}" 
          OR (SELECT staff FROM USER WHERE id = "${userId}") = 1)
        `
      ).catch(err => { throw new Error("Erro ao realizar operação")});
    });
  };
};

export default ScheduleRepository;
