import openDb from "../database/configDB.js";

class ServiceRepository {
  async updateService(serviceId, newData) {
    openDb().then((db) => {
      db.exec(
        `
            UPDATE service
            SET name = '${newData.name}', description = '${newData.description}',
            price = '${newData.price}', duration = '${newData.duration}'
            WHERE id = '${serviceId}'
        `
      ).then((res) => res).catch(err => { throw new Error("Erro ao atualizar dados de serviço") });
    });
  }

  async findServiceById(serviceId) {
    openDb().then((db) => {
      db.exec(
        `
            SELECT * FROM SERVICES WHERE id = ${serviceId}
        `
      ).then((res) => res).catch(err => { throw new Error("Serviço não encontrado") });
    });
  }

  async listAllServices() {
    return openDb().then((db) => {
      return db
        .all(
          `
              SELECT * FROM SERVICES 
              `
        )
        .then((res) => res).catch(err => { throw new Error("Nenhum serviço disponivel") });
    });
  }
}

export default ServiceRepository;
