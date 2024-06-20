import openDb from "../database/configDB.js";

class ReportsRepository {

  async lasts(currentDate) {
    return openDb().then((db) => {
      return db.all(
        `
          SELECT 
          s.date, 
          s.time, 
          se.name AS serviceName,
          u.name AS userName, 
          u.phone AS userPhone
          FROM SCHEDULE AS s 
          JOIN USER AS u ON u.id = s.userId
          JOIN SERVICES AS se ON se.id = s.serviceId
          WHERE s.status = "1" AND s.date <= ${currentDate} LIMIT 100
        `
      ).then((res) => res).catch(err => { throw new Error("Erro ao buscar agendamentos") });
    });
  }

  async lasts() {
    return openDb().then((db) => {
      return db.all(
        `
          SELECT 
          s.date, 
          s.time, 
          se.name AS serviceName,
          u.name AS userName, 
          u.phone AS userPhone
          FROM SCHEDULE AS s 
          JOIN USER AS u ON u.id = s.userId
          JOIN SERVICES AS se ON se.id = s.serviceId
          WHERE s.status = "1" LIMIT 100
        `
      ).then((res) => res).catch(err => { throw new Error("Erro ao buscar agendamentos") });
    });
  }
}

export default ReportsRepository;