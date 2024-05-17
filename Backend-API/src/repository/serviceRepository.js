import Database from "../database/database.js";
const database = new Database().connection;

class ServiceRepository{
    //update
    //listAll e findById
   
    async updateServiceName(serviceId ,newServiceName){
        database.exec(
            `
            UPDATE service
            SET name = "${serviceName}"
            WHERE = 
            `
        );
    };
};