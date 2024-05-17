import ScheduleRepository from "../repository/scheduleRepository.js";
import Schedule from "../models/schedule.js";

class ScheduleController {
    constructor(){
        this.scheduleRepository = new ScheduleRepository();
    }

    async createSchedule(req, res){
        const {service, data, user_id} = req.body
        const schedule = new Schedule(service, data, user_id);

        if(!schedule.service || !schedule.data || !schedule.user_id){
           return res.status(400).json({message:"Dados Invalidos"}); 
        }; 
        
        this.scheduleRepository.createSchedule(schedule).then((newSchedule)=>{
            res.status(201).json(newSchedule);
        }).catch(err=>{
            res.status(500).json({message:err});
        });
    };

    async updateScheduleData(req, res){
        const {scheduleId, userId, newData} = req.body;

        const schedule = await this.scheduleRepository.findById(scheduleId);

        if(!schedule){
            return res.status(404).json({message:"Agendamento Não existe"})
        };

        this.scheduleRepository.updateScheduleData(scheduleId, userId, newData);
    };

    async deleteSchedule(req, res){
        const id = req.params.id;
        const schedule = await this.scheduleRepository.findById(id);

        if(schedule){
            this.scheduleRepository.deleteSchedule(id).then(() => {
                res.status(204).json({message: "Agendamento Removido"});
            }).catch(err=>{
                res.status(500).json({message:"Operação não realizada", err});
            });
        };
    };

    async findById(req, res){
       const { id } = req.params
       const schedule = await this.scheduleRepository.findById(id);

       if(!schedule){
            return res.status(404).json({message:"Agendamento não encontrado"})
       };

       res.json({id:schedule.id, serviceId:schedule.serviceId, userId:schedule.userId ,data: schedule.data})
    };
};

export default ScheduleController;