import { listarClinicas, listarClinicasPorId, adicionarClinicas, atualizarClinica } from "../models/Clinicas.js";


const listarClinicasController = async (req,res) => {
    try{
        const Clinicas = await listarClinicas();
        res.status(200).json(Clinicas)
    } catch (err) {
        console.error('Erro ao consultar clinicas:', err)
        res.status(500).json({mensagem: "Erro ao consultar clinicas"})
    } 
}

const listarClinicasPorIdController = async (req,res) => {
    try{
        const clinica = await listarClinicasPorId(req.params.id)
        if(clinica) {
            res.status(200).json(clinica)
        } else {
            res.status(404).json({mensagem: "Clinica não encontrada/existente"})
        }
    } catch (err) {
        console.error("Erro ao consultar clinica:", err)
        res.status(500).json({mensagem: "Erro ao consultar clinica"})
    }

}

export { listarClinicasController, listarClinicasPorIdController }