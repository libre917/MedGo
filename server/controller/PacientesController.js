import { listarPacientes, listarPacientesPorId  } from '../models/Pacientes.js'
import { fileURLToPath } from "url";
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const listarPacientesController = async (req,res) => {
    try{
        const medicos = await listarPacientes();
        res.status(200).json(medicos)
    } catch (err) {
        console.error('Erro ao listar pacientes:',err);
        res.status(500).json({ mensagem: "Erro ao listar pacientes" });
    }
}

const listarPacientesPorIdController = async (req,res) => {
    try{
        const medico = await listarPacientesPorId(req.params.id);
        if (medico){
            res.status(200).json(medico);
        } else {
            res.status(404).json({mensagem : "Pacientes não exitente/encontrado"})
        }
    } catch (err) {
        console.error("Erro ao procurar pacients por ID: ", err)
        res.status(500).json({ mensagem: "Erro procurar paciente por ID: " });
    }
}

// exportando para o routes
export { listarPacientesController, listarPacientesPorIdController }