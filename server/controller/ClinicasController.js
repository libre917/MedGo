import { listarClinicas, listarClinicasPorId, adicionarClinicas, atualizarClinica, deletarClinica } from "../models/Clinicas.js";


const listarClinicasController = async (req,res) => {
    try{
        const clinicas = await listarClinicas();
        res.status(200).json(clinicas)
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

const adicionarClinicasController = async (req, res) => {
    try{
        const {nome, endereco, telefone, email, senha} = req.body;

        const clinicaData = {
            nome: nome,
            email: email,
            endereco: endereco,
            telefone: telefone,
            senha: senha
        }
        const clnicaInfo = await adicionarClinicas(clinicaData);
        res.status(201).json({mensagem: "Clinica adicionada com sucesso", clinicaData})
    } catch (err) {
        console.error("Erro ao adicionar clinica:", err)
        res.status(500).json({mensagem: "Erro ao adicionar clinica"})
    }
}

const atualizarClinicasController = async (req, res) => {
    try{
        const {nome, endereco, telefone, email, senha} = req.body;

        const clinicaData = {
            nome: nome,
            email: email,
            endereco: endereco,
            telefone: telefone,
            senha: senha
        }
        await atualizarClinica(clinicaData);
        res.status(201).json({mensagem: "Clinica atualizada com sucesso"})
    } catch (err) {
        console.error("Erro ao adicionar clinica:", err)
        res.status(500).json({mensagem: "Erro ao adicionar clinica"})
    }
}

const deletarClinicaController = async (req, res) => {
    try{
        const clinicaId = req.params.id;
        await deletarClinica(clinicaId)
        res.status(200)
    } catch (err) {
        console.error('Erro ao deletar ')
        res.status(500).json({mensagem: "Erro ao deletar"})
    }
}


export { listarClinicasController, listarClinicasPorIdController, adicionarClinicasController, atualizarClinicasController, deletarClinicaController }