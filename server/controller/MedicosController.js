import { listarMedicos } from '../models/Medicos.js'
import { fileURLToPath } from "url";
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const listarMedicosController = async (req,res) => {
    try{
        const medicos = await listarMedicos();
        res.status(200).json(medicos)
    } catch (err) {
        console.error('Erro ao listar medicos:',err);
        res.status(500).json({ mensagem: "Erro ao listar medicos" });
    }
}

export { listarMedicosController }