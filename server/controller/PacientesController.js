import { listarPacientes, listarPacientesPorId, adicionarPaciente, atualizarPaciente } from '../models/Pacientes.js'
import { fileURLToPath } from "url";
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        const { nome, cpf, idade, email, senha } = req.body;

        const pacienteData = {
            nome: nome,
            cpf: cpf,
            idade: idade,
            email: email,
            senha: senha
        } // analisar depois para (se quiser) adicionar foto de usuario
        const PacienteInfo = await adicionarPaciente(pacienteData);
        res.status(201).json({ mensagem: 'Paciente adicionado com sucesso', PacienteInfo })
    } catch (err) {
        console.error('Erro ao cadastrar: ', err)
        res.status(500).json({ mensagem: "Erro ao cadastrar" })
    }
}

const atualizarPacienteController = async (req, res) => {
    try {
        const pacienteId = req.params.id
        const { nome, cpf, idade, email, senha } = req.body;

        const pacienteData = {
            nome: nome,
            cpf: cpf,
            idade: idade,
            email: email,
            senha: senha
        } // analisar depois para (se quiser) adicionar foto de usuario
        await atualizarPaciente(pacienteId, pacienteData);
        res.status(201).json({ mensagem: 'Informações atualizadas com sucesso' })
    } catch (err) {
        console.error('Erro ao atualizar: ', err)
        res.status(500).json({ mensagem: "Erro ao atualizar" })
    }
}

// exportando para o routes
export { listarPacientesController, listarPacientesPorIdController, adicionarPacientesController, atualizarPacienteController }