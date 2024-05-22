import ServiceRepository from "../repository/serviceRepository.js";

class ServiceController {
  constructor() {
    this.serviceRepository = new ServiceRepository();
  }

  async updateService(req, res) {
    const { id } = req.params;
    const {name, description, price, duration} = req.body;
    this.serviceRepository.findServiceById(id).then(() => {
        this.serviceRepository.updateService(id, {name, description, price, duration}).then(() => {
          res.status(204);
        });
      })
      .catch((err) => {
        res.status(404).json({ message: "Serviço não existe" });
      });
  }

  async listAllServices(req, res) {
    this.serviceRepository.listAllServices().then((list) => {
      res.status(200).json(list);
    });
  };
}

export default ServiceController;
