import { listarClinicas, listarClinicasPorId, adicionarClinicas, atualizarClinica, deletarClinica } from "../models/Clinicas.js";
import bcrypt from "bcrypt"

// Controller de leitura de Clinicas armazenadas no banco de dados
const listarClinicasController = async (req, res) => {
    try {
        // Faz a leitura de todas as Clinicas
        const clinicas = await listarClinicas();
        // Retorna status 200 (Ok) e Clinicas
        res.status(200).json(clinicas)
    } catch (err) {
        console.error('Erro ao consultar clinicas:', err)
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro ao consultar clinicas" })
    }
}

// Controller de leitura de dados de uma Clinica
const listarClinicasPorIdController = async (req, res) => {
    try {
        // Faz a leitura da Clinica, com base do id da requisição
        const clinica = await listarClinicasPorId(req.params.id)
        // Se houver Clinica, retorna status 200 (Ok) e dados da Clinica
        if (clinica) {
            res.status(200).json(clinica)
        } else {
            // Caso não houver a Clinica, retorna status 404 (Not found)
            res.status(404).json({ mensagem: "Clinica não encontrada/existente" })
        }
    } catch (err) {
        console.error("Erro ao consultar clinica:", err)
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro ao consultar clinica" })
    }

}

// Controller de adição de Clinica
const adicionarClinicasController = async (req, res) => {
    // Recebe dados enviados do Front-end
    const { nome, endereco, telefone, email, senha } = req.body;
    try {
        // Validação do email
        function verificarEmail(email) {
            return email.includes('@') && (email.includes('.com.br') || email.includes('.com'))
        }
        // Se email, telefone, senha for inválido, retorna status 400 (Bad Request)
        if (!verificarEmail(email)) {
            return res.status(400).json({ mensagem: "Erro: Email inválido" })
        }
        if (telefone.length < 10) {
            return res.status(400).json({ mensagem: "Erro: telefone inválido" })
        }
        if (senha.length < 6) {
            return res.status(400).json({ mensagem: "Erro: senha inválida" })
        }
        // Faz o hash da senha digitada 
        const senhaHash = await bcrypt.hash(senha, 10)
        // Dados a serem enviados
        const clinicaData = {
            nome: nome,
            email: email,
            endereco: endereco,
            telefone: telefone,
            senha: senhaHash
        }
        const clinicaInfo = await adicionarClinicas(clinicaData);
        res.status(201).json({ mensagem: "Clinica adicionada com sucesso", clinicaInfo })
    } catch (err) {
        console.error("Erro ao adicionar clinica:", err)
        res.status(500).json({ mensagem: "Erro ao adicionar clinica" })
    }
}

const atualizarClinicasController = async (req, res) => {
    const clinicaId = req.params.id;
    const { nome, endereco, telefone, email, senha } = req.body;
    try {
        // Cria um objeto vazio para armazenar os dados que serão atualizados
        const clinicaData = {}

        // Se o campo nome foi enviado, atribui
        if (nome !== undefined) {
            clinicaData.nome = nome
        }
        // Se o campo endereço foi enviado, valida e atribui
        if (endereco !== undefined) {
            clinicaData.endereco = endereco
        }
        // Se o campo telefone foi enviado, valida e atribui
        if (telefone !== undefined) {

            if (telefone.length < 10) {
                return res.status(400).json({ mensagem: "Erro: telefone inválido" })
            }
            clinicaData.telefone = telefone
        }

        // Se o campo email foi enviado, valida e atribui
        if (email !== undefined) {
            // Validação do email
            function verificarEmail(email) {
                return email.includes('@') && (email.includes('.com.br') || email.includes('.com'))
            }
            if (!verificarEmail(email)) {
                return res.status(400).json({ mensagem: "Erro: Email inválido" })
            }
            clinicaData.email = email
        }
        // Se o campo senha foi enviado, valida, cria o hash e atribui
        if (senha !== undefined) {
            if (senha.length < 6) {
                return res.status(400).json({ mensagem: "Erro: senha inválida" })
            }
            const senhaHash = await bcrypt.hash(senha, 10)
            clinicaData.senha = senhaHash
        }
        console.log(clinicaData)
        // Faz a atualização dos dados
        await atualizarClinica(clinicaId, clinicaData);
        res.status(200).json({ mensagem: "Clinica atualizada com sucesso" })
    } catch (err) {
        console.error("Erro ao atualizar clinica:", err)
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro ao atualizar clinica" })
    }
}

const deletarClinicaController = async (req, res) => {
    // Recebe o id da Clinica
    const clinicaId = req.params.id;
    try {
        // Faz a remoção da clinica
        await deletarClinica(clinicaId)
        // Retorna status 200 (Ok)
        res.status(200).json({ mensagem: "Clinica deletada" })
    } catch (err) {
        console.error('Erro ao deletar ')
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro ao deletar" })
    }
}

// Exportando para clinicasRouter
export { listarClinicasController, listarClinicasPorIdController, adicionarClinicasController, atualizarClinicasController, deletarClinicaController }