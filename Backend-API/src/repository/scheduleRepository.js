import openDb from "../database/configDB.js";

//Transformar em Classe e criar a controller

class ScheduleRepository {
    async createSchedule(schedule) {
        openDb().then(db => {
            db.exec(
                `
                INSERT INTO SCHEDULE(service_id, data, userId)
                    VALUES(
                        "${schedule.service}",
                        "${schedule.data}",
                        "${schedule.userId}"
                    );
                `
            );
        });
    };

    async updateScheduleData(scheduleId, userId, newData) {
        openDb().then(db => {
            db.exec(
                `
                UPDATE schedule
                SET data = "${newData}"
                WHERE id = "${scheduleId}" 
                AND (userId = "${userId}" 
                OR (SELECT staff FROM USER WHERE id = "${userId}") = 1)
                `
            );
        });
    };

    async findById(scheduleId) {
        return openDb().then(db => {
            return db.get(
                `SELECT * FROM SCHEDULE WHERE schedule.id = ${scheduleId}`
            ).then(res => res);
        });
    };

    async findByUserId(userId) {
        return openDb().then(db => {
            return db.all(
                `SELECT * FROM SCHEDULE WHERE userId = ${userId}`
            ).then(res => res);
        });
    };

    async deleteSchedule(scheduleId){
        openDb().then(db =>{
            db.exec(
                `DELETE FROM SCHEDULE schedule.id = ${scheduleId}`
            );
        });
    };
    


};

export default ScheduleRepository;



