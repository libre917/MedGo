import { listarPacientes, listarPacientesPorId, adicionarPaciente, atualizarPaciente, deletarPaciente } from '../models/Pacientes.js'
import bcrypt from 'bcrypt';

const listarPacientesController = async (req, res) => {
    try {
        const pacientes = await listarPacientes();
        res.status(200).json(pacientes)
    } catch (err) {
        console.error('Erro ao listar pacientes:', err);
        res.status(500).json({ mensagem: "Erro ao listar pacientes" });
    }
}

const listarPacientesPorIdController = async (req, res) => {
    try {
        const paciente = await listarPacientesPorId(req.params.id);
        if (paciente) {
            res.status(200).json(paciente);
        } else {
            res.status(404).json({ mensagem: "Pacientes não exitente/encontrado" })
        }
    } catch (err) {
        console.error("Erro ao procurar pacientes por ID: ", err)
        res.status(500).json({ mensagem: "Erro procurar paciente por ID: " });
    }
}

const adicionarPacientesController = async (req, res) => {
    try {
        const { nome, email, senha, endereco, telefone, dataNascimento } = req.body;
        if (senha.length < 6) {
            return res.status(400).json({ mensagem: "A senha deve ter mais de 6 caracteres" })
        }
        const [dia, mes, ano] = dataNascimento.split("/")
        const dataAtual = new Date()
        const anoAtual = dataAtual.getFullYear()
        const idade = anoAtual - ano
        if (dia > 30) {
            return res.status(400).json({ mensagem: "Dia inválido" })
        }
        if (idade < 18) {
            return res.status(400).json({ mensagem: "Maioridade necessária" })
        }
        if (idade > 120) {
            return res.status(400).json({ mensagem: "Idade inválida" })
        }

        const senhaHash = await bcrypt.hash(senha, 10)


        const pacienteData = {
            nome: nome,
            email: email,
            senha: senhaHash,
            endereco: endereco,
            telefone: telefone,
            dataNascimento: `${ano}-${mes}-${dia}`
        }
        const PacienteInfo = await adicionarPaciente(pacienteData);
        res.status(201).json({ mensagem: 'Paciente adicionado com sucesso', PacienteInfo })
    } catch (err) {
        console.error('Erro ao cadastrar: ', err)
        res.status(500).json({ mensagem: "Erro ao cadastrar" })
    }
}

const atualizarPacienteController = async (req, res) => {
    try {
        const pacienteId = req.params.id;
        const { nome, email, senha, endereco, telefone, dataNascimento } = req.body;
        if (senha.length < 6) {
            return res.status(400).json({ mensagem: "A senha deve ter mais de 6 caracteres" })
        }
        const formatarData = (dataISO) => {
            return new Date(dataISO).toISOString().split('T')[0]; // Retorna "2007-01-09"
        };

        const dataNascimentoFormatada = formatarData(dataNascimento);

        const senhaHash = await bcrypt.hash(senha, 10)

        const pacienteData = {
            nome: nome,
            email: email,
            senha: senhaHash,
            endereco: endereco,
            telefone: telefone,
            dataNascimento: dataNascimentoFormatada
        }
        await atualizarPaciente(pacienteId, pacienteData);
        res.status(201).json({ mensagem: 'Informações atualizadas com sucesso' })
    } catch (err) {
        console.error('Erro ao atualizar: ', err)
        res.status(500).json({ mensagem: "Erro ao atualizar" })
    }
}

const deletarPacienteController = async (req, res) => {
    try {
        const pacienteId = req.params.id;
        await deletarPaciente(pacienteId)
        res.status(200).json({ mensagem: "Paciente deletado" })
    } catch (err) {
        console.error('Erro ao deletar paciente: ', err)
        res.status(500).json({ mensagem: "Erro ao deletar" })
    }
}
// exportando para o routes
export { listarPacientesController, listarPacientesPorIdController, adicionarPacientesController, atualizarPacienteController, deletarPacienteController }