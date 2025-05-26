import { listarAgenda, listarAgendaPorId, adicionarAgendamento, deletarAgendamento } from "../models/Agenda.js";

const listarAgendaController = async (req, res) => {
    try {
        const agendamentos = await listarAgenda();
        res.status(200).json(agendamentos)
    } catch (err) {
        console.error('Erro ao mostra agenda: ', err)
        res.status(500).json({ mensagem: "Erro ao mostrar agenda" })
    }
}

const listarAgendaPorIdController = async (req, res) => {
    const agendaId = req.params.id
    try {
        const agendamento = await listarAgendaPorId(agendaId);
        if (agendamento) {
            res.status(200).json(agendamento);
        } else {
            res.status(404).json({ mensagem: "Agendamento não existente/encontrado" })
        }
    } catch (err) {
        console.error('Erro ao procurar agendamento: ', err);
        res.status(500).json({ mensagem: "Erro ao procurar agendamento" })
    }
}

const adicionarAgendamentoController = async (req, res) => {
    try { console.log(req.body)
        const {  id_clinica, id_medico, id_paciente, data, hora, status } = req.body
        
        if (  !id_clinica || !id_medico || !id_paciente || !data || !hora || !status){
            res.status(400).json({mensagem: "Erro: informações incompletas e/ou ausentes"})
            return;
        }
        const agendaData = {
            id_clinica: id_clinica,
            id_medico: id_medico,         
            id_paciente: id_paciente, 
            data: data, 
            hora: hora, 
            status: status
        }
        const agendamentoInfo = await adicionarAgendamento(agendaData);
        res.status(201).json({mensagem: "Agendamento marcado", agendamentoInfo})
    } catch (err) {
        console.error("Erro ao marcar agendamento:", err)
        res.status(500).json({mensagem: "Erro ao agendar"})
    }
}

const deletarAgendamentoController = async (req, res) => {
    try {
        const agendaId = req.params.id;
        await deletarAgendamento(agendaId)
    } catch(err) {
        console.error("Erro ao cancelar agendamento:", err);
        res.status(500).json({mensagem: "Erro ao cancelar agendamento"})
    }
}

export { listarAgendaController, listarAgendaPorIdController, adicionarAgendamentoController, deletarAgendamentoController }