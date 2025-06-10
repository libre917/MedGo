import { listarAgenda, listarAgendaPorId, adicionarAgendamento, atualizarAgendamento, deletarAgendamento } from "../models/Agenda.js";

// Controller de leitura de Agendamentos armazenados no banco de dadosx
const listarAgendaController = async (req, res) => {
    try {
        // Faz a leitura de todos os agendamentos
        const agendamentos = await listarAgenda();
        // Retorna status 200 (Ok)
        res.status(200).json(agendamentos)
    } catch (err) {
        console.error('Erro ao mostra agenda: ', err)
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro ao mostrar agenda" })
    }
}

const listarAgendaPorIdController = async (req, res) => {
    // Recebe o id do agendamento
    const agendaId = req.params.id
    try {
        // Faz a leitura do Agendamento
        const agendamento = await listarAgendaPorId(agendaId);
        // Se houver Agendamento, retorna status 200 (Ok)
        if (agendamento) {
            res.status(200).json(agendamento);
        } else {
            // Se não houver Agendamento, retorna status 404 (Not found)
            res.status(404).json({ mensagem: "Agendamento não existente/encontrado" })
        }
    } catch (err) {
        console.error('Erro ao procurar agendamento: ', err);
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro ao procurar agendamento" })
    }
}

const adicionarAgendamentoController = async (req, res) => {
    // Recebe dados do Front-end
    const { id_clinica, id_medico, id_paciente, data, hora, status } = req.body
    try {
        // Divide o valor 'dataNascimento' nas constantes 'ano', 'mes e 'dia'
        const [ano, mes, dia] = data.split("-")// valor esperado de dataNascimento: "aaaa-mm-dd
        // Função que verifica se data recebida é válida"
        function verificarData(dia, mes, ano) {
            const data = new Date(ano, mes - 1, dia);
            return data.getFullYear() == ano &&
                data.getMonth() + 1 == mes &&
                data.getDate() == dia;
        }
        // Se data ou dados forem inválidos, retorna 400 (Bad Request)
        if (!verificarData(dia, mes, ano)) {
            return res.status(400).json({ mensagem: "Erro: data incorreta" })
        }
        if (!id_clinica || !id_medico || !id_paciente || !data || !hora || !status) {
            return res.status(400).json({ mensagem: "Erro: informações incompletas e/ou ausentes" })
        }
        // Dados a serem enviados
        const agendaData = {
            id_clinica: id_clinica,
            id_medico: id_medico,
            id_paciente: id_paciente,
            data: data,
            hora: hora,
            status: status
        }
        // Faz o envio dos dados
        const agendamentoInfo = await adicionarAgendamento(agendaData);
        // Retorna status 201 (Created)
        res.status(201).json({ mensagem: "Agendamento marcado", agendamentoInfo })
    } catch (err) {
        console.error("Erro ao marcar agendamento:", err)
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro ao agendar" })
    }
}

const atualizarAgendamentoController = async (req, res) => {
    const agendaId = req.params.id;
    const { id_clinica, id_medico, id_paciente, data, hora, status } = req.body;

    try {
        // Verificar campos obrigatórios
        if (!id_clinica || !id_medico || !id_paciente || !data || !hora || !status) {
            return res.status(400).json({ mensagem: "Erro: informações incompletas e/ou ausentes" });
        }

        // Extrair APENAS a parte da data (YYYY-MM-DD) da string ISO
        const [datePart] = data.split('T'); // Divide no 'T' e pega a primeira parte
        const [ano, mes, dia] = datePart.split('-'); // Separa os componentes

        // Validar a data
        const isValidDate = (d, m, y) => {
            const date = new Date(y, m - 1, d);
            return (
                date.getFullYear() == y &&
                date.getMonth() + 1 == m &&
                date.getDate() == d
            );
        };

        if (!isValidDate(Number(dia), Number(mes), Number(ano))) {
            return res.status(400).json({ mensagem: "Erro: data incorreta" });
        }

        // Montar objeto com a data formatada corretamente (YYYY-MM-DD)
        const agendaData = {
            id_clinica,
            id_medico,
            id_paciente,
            data: datePart, // Usa APENAS datePart (ex: "2025-09-12")
            hora,
            status
        };

        await atualizarAgendamento(agendaId, agendaData);
        res.status(200).json({ mensagem: "Agendamento atualizado" });
    } catch (err) {
        console.error("Erro ao atualizar agendamento:", err);
        res.status(500).json({ mensagem: "Erro ao atualizar" });
    }
};
const deletarAgendamentoController = async (req, res) => {
    // Recebe id do agendamento
    const agendaId = req.params.id;
    try {
        // Deleta o agendamento
        await deletarAgendamento(agendaId)
        // Retorna status 200 (Ok)
        res.status(200).json({ mensagem: "Agendamento deletado" })
    } catch (err) {
        console.error("Erro ao cancelar agendamento:", err);
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro ao cancelar agendamento" })
    }
}

// Exporta para agendaRouter
export { listarAgendaController, listarAgendaPorIdController, adicionarAgendamentoController, deletarAgendamentoController, atualizarAgendamentoController }