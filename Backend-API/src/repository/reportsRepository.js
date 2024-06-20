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

  async day(date) {
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
          WHERE s.status = "1" AND s.date = "${date}" LIMIT 100
        `
      ).then((res) => res).catch(err => { throw new Error("Erro ao buscar agendamentos") });
    });
  }

  async trending() {
    return openDb().then((db) => {
      return db.all(
        `
          SELECT 
          s.name AS service_name,
          COUNT(sc.id) AS total_schedules
          FROM 
          SCHEDULE sc
          JOIN 
          SERVICES s ON sc.serviceId = s.id
          GROUP BY 
          sc.serviceId
          ORDER BY 
          total_schedules DESC LIMIT 100
        `
      ).then((res) => res).catch(err => { throw new Error("Erro ao buscar agendamentos") });
    });
  }
}

export default ReportsRepository;