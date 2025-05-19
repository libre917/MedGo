import { listarMedicos, listarMedicosPorId, adicionarMedicos } from '../models/Medicos.js'
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

const listarMedicosPorIdController = async (req,res) => {
    try{
        const medico = await listarMedicosPorId(req.params.id);
        if (medico){
            res.status(200).json(medico);
        } else {
            res.status(404).json({mensagem : "Medico não exitente/encontrado"})
        }
    } catch (err) {
        console.error("Erro ao procurar medico por ID: ", err)
        res.status(500).json({ mensagem: "Erro procurar medico por ID: " });
    }
}

const adicionarMedicosController = async (req, res) => {
   try {
    const { nome, especialidade, telefone, email, senha, disponibilidade, cep_clinica } = req.body;
    
    const medicoData = {
        nome: nome,
        especialidade: especialidade,
        telefone: telefone,
        email: email,
        senha: senha, 
        disponibilidade: disponibilidade,
        cep_clinica: cep_clinica
    }
    
    const MedicoInfo = await adicionarMedicos(medicoData);
    res.status(201).json({mensagem: 'Medico adicionado com sucesso', MedicoInfo})
   } catch (err) {
    console.error('Erro ao adicionar medico: ', err)
    res.status(500).json({mensagem: "Erro ao adiocionar medico"})
   }
}
// exportando para o routes
export { listarMedicosController, listarMedicosPorIdController, adicionarMedicosController }