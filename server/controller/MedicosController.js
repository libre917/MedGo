import { listarMedicos, listarMedicosPorId, adicionarMedicos, atualizarMedicos, deletarMedico } from '../models/Medicos.js'
import bcrypt from "bcrypt"

// Controller de leitura de Medicos armazenados no banco de dados
const listarMedicosController = async (req, res) => {
    try {
        // Faz a leitura de todos os Medicos
        const medicos = await listarMedicos();
        // Retorna status 200 (Ok) e Medicos
        res.status(200).json(medicos)
    } catch (err) {
        console.error('Erro ao listar medicos:', err);
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro ao listar medicos" });
    }
}

// Controller de leitura de dados de um Medico
const listarMedicosPorIdController = async (req, res) => {
    // Recebe o id do Medico
    const medicoId = req.params.id;
    try {
        // Faz a leitura do Medico
        const medico = await listarMedicosPorId(medicoId);
        // Se houver o Medico, retorna status 200 (Ok) e dados do Medico
        if (medico) {
            res.status(200).json(medico);
        } else {
            // Caso não houver Medico, retorna status 404 (Not found)
            res.status(404).json({ mensagem: "Medico não exitente/encontrado" })
        }
    } catch (err) {
        console.error("Erro ao procurar medico por ID: ", err)
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro procurar medico por ID " });
    }
}

// Controller de adição de Medico
const adicionarMedicosController = async (req, res) => {
    // Recebe dados enviados do Front-end
    const { nome, email, senha, crm, especialidade, id_clinica } = req.body;
    try {
        // Validação do crm
        function validarCrm(crm) {
            return crm.length === 9 && crm.includes("/SP")
        }
   
        // Validação do email
        function validarEmail(email) {
            return email.includes('@') && (email.includes('.com') || email.includes('.com.br'))
        }
        // Se senha, email ou crm for inválido, retorna status 400 (Bad Request)
        if (senha.length < 6) {
            return res.status(400).json({ mensagem: "Erro: Senha inválida" })
        }
        if (!validarEmail(email)) {
            return res.status(400).json({ mensagem: "Erro: Email inválido" })
        }
        if (!validarCrm(crm)) {
            return res.status(400).json({ mensagem: "Erro: crm fornecido inválido" })
        }
        // Faz o hash da senha digitada 
        const senhaHash = await bcrypt.hash(senha, 10)
        // Dados a serem enviados
        const medicoData = {
            nome: nome,
            email: email,
            senha: senhaHash,
            crm: crm,
            especialidade: especialidade,
            id_clinica: id_clinica
        }
        // Faz o envio dos dados
        const MedicoInfo = await adicionarMedicos(medicoData);
        // Retorna status 201 (Created)
        res.status(201).json({ mensagem: 'Medico adicionado com sucesso', MedicoInfo })
    } catch (err) {
        console.error('Erro ao adicionar medico: ', err)
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro ao adiocionar medico" })
    }
}

// Controller de atualização do Medico
const atualizarMedicosController = async (req, res) => {
    // Recebe o id do Medico
    const medicoId = req.params.id
    // Recebe os dados do Front-end
    const { nome, email, senha, crm, especialidade } = req.body;
    try {
        // Cria um objeto vazio para armazenar os dados que serão atualizados
        const medicoData = {};

        // Se o campo nome foi enviado, atribui
        if (nome !== undefined) {
            medicoData.nome = nome;
        }

        // Se o campo email foi enviado, valida e atribui
        if (email !== undefined) {
            // Validação do email
            function validarEmail(email) {
                return email.includes('@') && (email.includes('.com') || email.includes('.com.br'))
            }
            if (!validarEmail(email)) {
                return res.status(400).json({ mensagem: "Erro: Email inválido" })
            }
            medicoData.email = email;
        }

        // Se o campo senha foi enviado, valida, cria o hash e atribui
        if (senha !== undefined) {
            if (senha.length < 6) {
                return res.status(400).json({ mensagem: "Erro: Senha inválida. Deve ter mais de 6 caracteres" });
            }
            const senhaHash = await bcrypt.hash(senha, 10);
            medicoData.senha = senhaHash;
        }

        // Se o campo crm foi enviado, valida e atribui
        if (crm !== undefined) {
            // Validação do crm
            function validarCrm(crm) {
                return crm.length === 9 && crm.includes("/SP")
            }
            if (!validarCrm(crm)) {
                return res.status(400).json({ mensagem: "Erro: crm fornecido inválido" })
            }
            medicoData.crm = crm;
        }

        // Se o campo especialidade foi enviado, atribui
        if (especialidade !== undefined) {
            medicoData.especialidade = especialidade;
        }

        // Faz a atualização dos dados
        await atualizarMedicos(medicoId, medicoData);
        res.status(200).json({ mensagem: 'Informações atualizadas com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar informações: ', err)
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro ao atualizar informações" })
    }
}

const deletarMedicoController = async (req, res) => {
    // Recebe 'id' do Medico
    const medicoId = req.params.id;
    try {
        // Faz a remoção do Medico
        await deletarMedico(medicoId);
        // Retorna status 200 (Ok)
        res.status(200).json({ mensagem: "Medico deletado" })
    } catch (err) {
        console.error("Erro ao deletar dados do medico:", err)
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro ao deletar" })
    }
}
// Exportando para medicosRouter
export { listarMedicosController, listarMedicosPorIdController, adicionarMedicosController, atualizarMedicosController, deletarMedicoController }