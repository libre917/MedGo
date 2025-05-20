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
    try {
        const agendamento = await listarAgendaPorId();
        if (agendamento) {
            res.status(200).json(agendamento);
        } else {
            res.status(404).json({ mensagem: "Agendamento não existente/encontrado" })
        }
    } catch (err) {
        console.error('Erro ao procurar agendamento: ', err);
        res.status(500).json({mensagem: "Erro ao procurar agendamento"})
    }
}

const adicionarAgendamentoController = async (req, res) => {
    try {
        const { dataHora, id_medico, id_paciente } = req.body

        const agendaData = {
            dataHora : dataHora,
            id_medico: id_medico,
            id_paciente: id_paciente
        }
    } catch {

    }
}