import { read, compare } from "../config/database.js";
// Verificação do login do Usuario/Paciente
const loginUserController = async (req, res) => {
    // Recebe dados enviados do Front-end
    const { email, senha } = req.body;
    try {
        // Procura Usuario/Paciente pelo email
        const paciente = await read('Pacientes', `email = '${email}'`)

        // Se não encontrar Usuario/Paciente, retorna status 404 (Not Found)
        if (!paciente) {
            return res.status(404).json({ mensagem: "Erro: Usuário não encontrado" })
        }
        // Compara senha digitada com senha hasheada
        const senhaCorreta = await compare(senha, paciente.senha)
        // Se senha estiver incorreta, retorna status 401 (Unauthorized)
        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: "Erro: Senha incorreta" })
        }
        // Retorna status 200 (Ok) e retorna dados para o Front-end
        res.status(200).json({
            id: paciente.id,
            nome: `${paciente.nome}`,
            email: `${paciente.email}`,
            endereco: `${paciente.endereco}`,
            telefone: `${paciente.telefone}`,
            dataNascimento: `${paciente.dataNascimento}`
        })
    } catch (err) {
        console.error('Erro: login falhou.', err)
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro: login falhou" })
        return
    }
}

// Verificação de login do Médico
const loginMedController = async (req, res) => {
    // Recebe dados enviados do Front-end
    const { senha, crm } = req.body
    try {
        // Procura Medico pelo crm
        const medico = await read('Medicos', `crm = '${crm}'`)
        // Se não encontrar Medico, retorna status 404 (Not found)
        if (!medico) {
            return res.status(404).json({ mensagem: "Erro: Medico não encontrado" })
        }
        // Compara senha digitada com senha hasheada
        const senhaCorreta = await compare(senha, medico.senha)
        // Se senha estiver incorreta, retorna status 401 (Unauthorized)
        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: "Senha incorreta" })
        }
        // Retorna status 200 (Ok) e retorna dados para o Front-end
        res.status(200).json({
            id: medico.id,
            nome: `${medico.nome}`,
            email: `${medico.email}`,
            crm: `${medico.crm}`,
            especialidade: `${medico.especialidade}`,
            id_clinica: medico.id_clinica
        })

    } catch (err) {
        console.error('Erro ao realizar login:', err)
         // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro ao fazer login" })
        return
    }
}
// Verificação de login da clinica
const loginClinicaController = async (req, res) => {
    // Recebe dados enviados do Front-end
    const { email, senha } = req.body;
    try {
        // Procura clinica pelo email
        const cliinca = await read('Clinicas', `email = '${email}'`)
        // Se não encontrar Clinica, retorna status 404 (Not found)
        if (!cliinca) {
            return res.status(404).json({ mensagem: "Clinica não encontrada" })
        }
        // Compara senha digitada com senha hasheada
        const senhaCorreta = await compare(senha, cliinca.senha)
        // Se senha estiver incorreta, retorna 401 (Unathorized)
        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: "Senha incorreta" })
        }
        // Retorna status 200 (Ok) e daos para o Front-end
        res.status(200).json({
            id: cliinca.id,
            nome: `${cliinca.nome}`,
            endereco: `${cliinca.endereco}`,
            telefone: `${cliinca.telefone}`,
            email: `${cliinca.email}`
        })
    } catch (err) {
        console.error("Erro:", err)
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro ao fazer login" })
        return

    }
}

const loginAdmController = async (req, res) => {
    // Recebe dados do Front-end
    const { email, senha, codigo } = req.body;
    try {
        //Se algum dado estiver incorreto, retorna 401 (Unathorized)
        if (email !== "admin@admin.com" || senha !== "senhaAdmin123" || codigo !== "123@321") {
            return res.status(401).json({ mensagem: "Não autorizado" })
        }
        // Retorna status 200 (Ok) e dado para permitir entrada
        res.status(200).json({
            status: "Permitido"
        })

    } catch (err) {
        console.error('Erro ao realizar login:', err)
        // Se ocorrer erro, retorna status 500 (Internal Server Error)
        res.status(500).json({ mensagem: "Erro ao fazer login" })
        return
    }
}
// Exporta funções para authRouter
export { loginUserController, loginMedController, loginAdmController, loginClinicaController }