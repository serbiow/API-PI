import ReportsRepository from "../repository/reportsRepository.js";

class ReportsController {
  constructor() {
    this.reportsRepository = new ReportsRepository();
  }

  async lasts(req, res) {
    // Pegar data atual
    var datetime = new Date();
    let date = ("0" + datetime.getDate()).slice(-2);
    let month = ("0" + (datetime.getMonth() + 1)).slice(-2);
    let year = datetime.getFullYear();

    const currentDate = (month + "/" + date + "/" + year)

    this.reportsRepository.lasts(currentDate).then(list => {
      console.log(list)
      res.status(200).json(list)
    }).catch(err => {
      res.status(404).json({ message: "Nenhum agendamento encotrado" });
    })
  };

  async day(req, res) {
    const date = req.body.date

    this.reportsRepository.day(date).then(list => {
      console.log(list)
      res.status(200).json(list)
    }).catch(err => {
      res.status(404).json({ message: "Nenhum agendamento encotrado" });
    })
  };

  async trending(req, res) {
    this.reportsRepository.trending().then(list => {
      console.log(list)
      res.status(200).json(list)
    }).catch(err => {
      res.status(404).json({ message: "Nenhum agendamento encotrado" });
    })
  };

}

export default ReportsController;