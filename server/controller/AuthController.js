import { read, compare } from "../config/database.js";

const loginUserController = async (req, res) => {
          const { email, senha } = req.body;
    try {
        const paciente = await read('Pacientes', `email = '${email}'`)
        if (!paciente) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" })
        }
        const senhaCorreta = await compare(senha, paciente.senha)

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: "Senha incorreta" })
        }
        res.status(200).json({
            id: paciente.id,
            nome: `${paciente.nome}`,
            email: `${paciente.email}`,
            endereco: `${paciente.endereco}`,
            telefone: `${paciente.telefone}`,
            dataNascimento: `${paciente.dataNascimento}`
        })
    } catch (err) {
        console.error('Erro ao realizar login:', err)
        res.status(500).json({ mensagem: "Erro ao fazer login" })
        return
    }
}

const loginMedController = async (req, res) => {
    const { email, senha, crm } = req.body
    try {
        const medico = await read('Medicos',`crm = '${crm}'`)
        if(!medico){
            return res.status(404).json({mensagem: "CRM do médico não encontrado"})
        }

        const senhaCorreta = await compare(senha, medico.senha)

        if(!senhaCorreta){
            return res.status(401).json({ mensagem: "Senha incorreta" })
        }
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
        res.status(500).json({ mensagem: "Erro ao fazer login" })
        return
    }
}

const loginClinicaController = async (req, res) => {
    const {email, senha} = req.body;
    try{
        const cliinca = await read('Clinicas', `email = '${email}'`)
        if(!cliinca){
            return res.status(404).json({mensagem: "CLinica não encontrada"})
        }
        res.status(200).json({
            id: cliinca.id,
            nome: `${cliinca.nome}`,
            endereco: `${cliinca.endereco}`,
            telefone: `${cliinca.telefone}`,
            email: `${cliinca.email}`
        })
    } catch(err){
        console.error("Erro:", err)
        res.status(500).json({ mensagem: "Erro ao fazer login" })
        return

    }
}

const loginAdmController = async (req, res) => {
      const {email, senha, codigo} = req.body;
    try{
        if(email !== "admin@admin.com" || senha !== "senhaAdmin123" || codigo !== "123@321"){
         return res.status(401).json({mensagem: "informações incorretas"})   
        }
        res.status(200).json({
            status: "Permitido"
        })

    } catch(err) {
        console.error('Erro ao realizar login:', err)
        res.status(500).json({ mensagem: "Erro ao fazer login" })
        return
    }
}
export { loginUserController, loginMedController, loginAdmController, loginClinicaController }