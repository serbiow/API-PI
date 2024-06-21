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
<<<<<<< Updated upstream
          WHERE s.status = "1" LIMIT 100
=======
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
          s.name AS serviceName,
          COUNT(sc.id) AS totalSchedules
          FROM 
          SCHEDULE sc
          JOIN 
          SERVICES s ON sc.serviceId = s.id
          GROUP BY 
          sc.serviceId
          ORDER BY 
          totalSchedules DESC LIMIT 100
>>>>>>> Stashed changes
        `
      ).then((res) => res).catch(err => { throw new Error("Erro ao buscar agendamentos") });
    });
  }
}

export default ReportsRepository;