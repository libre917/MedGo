import { listarPacientes, listarPacientesPorId, adicionarPaciente, atualizarPaciente, deletarPaciente } from '../models/Pacientes.js'
import bcrypt from 'bcrypt';

// Cotroller de leitura de Usuarios/Pacientes armazenados no banco de dados
const listarPacientesController = async (req, res) => {
    try {
        // Faz a leitura de todos os Usuarios/Pacientes
        const pacientes = await listarPacientes();
        // Retorna status 200 (Ok) e Usuarios/Pacientes
        res.status(200).json(pacientes)
    } catch (err) {
        console.error('Erro ao listar pacientes:', err);
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro ao listar pacientes" });
    }
}

// Controller de leitura de dados de um Usuario/Paciente
const listarPacientesPorIdController = async (req, res) => {
    // Recebe o id do Usuario/Paciente
    const pacienteId = req.params.id
    try {
        // Faz a leitura do Usuario/Paciente
        const paciente = await listarPacientesPorId(pacienteId)
        // Se houver Usuario/Paciente, retorna status 200 (Ok) e dados do Usuario/Paciente
        if (paciente) {
            res.status(200).json(paciente);
        } else {
            // Caso não houver Usuario/Paciente, retorna status 404 (Not found)
            res.status(404).json({ mensagem: "Pacientes não exitente/encontrado" })
        }
    } catch (err) {
        console.error("Erro ao procurar pacientes por ID: ", err)
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro procurar paciente por ID: " });
    }
}

// Controller de adição de Usuario/Paciente
const adicionarPacientesController = async (req, res) => {
    // Recebe dados enviados do Front-end
    const { nome, email, senha, endereco, telefone, dataNascimento } = req.body;
    try {
        // Se 'senha' for menor que 6 caracteres, retorna status 400 (Bad Request)
        if (senha.length < 6) {
            return res.status(400).json({ mensagem: "A senha deve ter mais de 6 caracteres" })
        }
        // Divide o valor 'dataNascimento' nas constantes 'dia', 'mes' e 'ano'
        const [dia, mes, ano] = dataNascimento.split("/") // valor esperado de dataNascimento: "dd/mm/aaaa"

        // Salva data atual
        const dataAtual = new Date()

        // Salva ano atual
        const anoAtual = dataAtual.getFullYear()

        // Calcula idade 
        const idade = anoAtual - ano

        // Função que verifica se data recebida é válida
        function verificarData(dia, mes, ano) {
            const data = new Date(ano, mes - 1, dia);
            return data.getFullYear() == ano &&
                data.getMonth() + 1 == mes &&
                data.getDate() == dia;
        }
        // Função que verifica se email é válido
        function verificarEmail(email) {
            return email.includes("@") && (email.includes(".com") || email.includes(".com.br"))
        }
        // Se email, data, endereço, idade ou telefone for inválido, retorna status 400 (Bad Request)
        if (!verificarEmail) {
            return res.status(400).json({ mensagem: "Erro: Email inválido" })
        }
        if (!verificarData(dia, mes, ano)) {
            return res.status(400).json({ mensagem: "Erro: data incorreta" })
        }
        if (endereco.length < 5) {
            return res.status(400).json({ mensagem: "Erro: Endereço inválido" })
        }
        if (idade < 18 || idade > 120) {
            return res.status(400).json({ mensagem: "Erro: Idade inválida" })
        }
        if (telefone.length < 11) {
            return res.status(400).json({ mensagem: "Erro: Telefone inválido" })
        }
        // Faz o hash da senha digitada 
        const senhaHash = await bcrypt.hash(senha, 10)
        // Dados a serem enviados
        const pacienteData = {
            nome: nome,
            email: email,
            senha: senhaHash,
            endereco: endereco,
            telefone: telefone,
            dataNascimento: `${ano}-${mes}-${dia}`
        }
        // Faz o envio dos dados
        const PacienteInfo = await adicionarPaciente(pacienteData);
        // Retorna status 201 (Created)
        res.status(201).json({ mensagem: 'Paciente adicionado com sucesso', PacienteInfo })
    } catch (err) {
        console.error('Erro ao cadastrar: ', err)
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro ao cadastrar" })
    }
}

// Controller de atualização do Usuario/Paciente
const atualizarPacienteController = async (req, res) => {
    // Recebe o id do Usuario/Paciente
    const pacienteId = req.params.id;
    // Recebe dados enviados do Front-end
    const { nome, email, senha, endereco, telefone, dataNascimento } = req.body;
    try {
        // Se 'senha' for menor que 6 caracteres, retorna status 400 (Bad Request)
        if (senha.length < 6) {
            return res.status(400).json({ mensagem: "A senha deve ter mais de 6 caracteres" })
        }
        // Formatação da data, sem isso a data enviada será considerada incorreta pelo banco de dados
        const formatarData = (dataISO) => {
            return new Date(dataISO).toISOString().split('T')[0];
        };
        // Formata a data 
        const dataNascimentoFormatada = formatarData(dataNascimento);
        // Faz o hash da senha digitada 
        const senhaHash = await bcrypt.hash(senha, 10)
        // Dados a serem enviados
        const pacienteData = {
            nome: nome,
            email: email,
            senha: senhaHash,
            endereco: endereco,
            telefone: telefone,
            dataNascimento: dataNascimentoFormatada
        }
        // Faz a atualização dos dados
        await atualizarPaciente(pacienteId, pacienteData);
        // Retorna status 200 (Ok)
        res.status(200).json({ mensagem: 'Informações atualizadas com sucesso' })
    } catch (err) {
        console.error('Erro ao atualizar: ', err)
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro ao atualizar" })
    }
}

const deletarPacienteController = async (req, res) => {
    // Recebe 'id' do Usuario/Paciente
    const pacienteId = req.params.id;
    try {
        // Faz a remoção do Usuario/Paciente
        await deletarPaciente(pacienteId)
        // Retorna status 200 (Ok)
        res.status(200).json({ mensagem: "Usuario/Paciente deletado" })
    } catch (err) {
        console.error('Erro ao deletar paciente: ', err)
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro ao deletar" })
    }
}
// Exportando para pacientesRouter
export { listarPacientesController, listarPacientesPorIdController, adicionarPacientesController, atualizarPacienteController, deletarPacienteController }