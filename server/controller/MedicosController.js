import { listarMedicos, listarMedicosPorId, adicionarMedicos, atualizarMedicos, deletarMedico } from '../models/Medicos.js'


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
        res.status(500).json({ mensagem: "Erro procurar medico por ID " });
    }
}

const adicionarMedicosController = async (req, res) => {
   try {
    const { nome, email, senha, crm, especialidade, id_clinica } = req.body;
    if(senha.length < 6){
        return res.status(400).json({mensagem: "A senha deve ter mais de 6 caracteres"})
    }
      const senhaHash = await bcrypt.hash(senha, 10)
            console.log(senhaHash)
    
    const medicoData = {
        nome: nome,
        email: email,
        senha: senha, 
        crm: crm,
        especialidade: especialidade,
        id_clinica: id_clinica
    }
    
    const MedicoInfo = await adicionarMedicos(medicoData);
    res.status(201).json({mensagem: 'Medico adicionado com sucesso', MedicoInfo})
   } catch (err) {
    console.error('Erro ao adicionar medico: ', err)
    res.status(500).json({mensagem: "Erro ao adiocionar medico"})
   }
}

const atualizarMedicosController = async (req, res) => {
    try {
        const medicoId = req.params.id
        const { nome, email, senha, crm, especialidade, id_clinica } = req.body;
            if(senha.length < 6){
        return res.status(400).json({mensagem: "A senha deve ter mais de 6 caracteres"})
    }
          const senhaHash = await bcrypt.hash(senha, 10)
                console.log(senhaHash) 

        const medicoData = {
            nome: nome,
            email: email,
            senha: senhaHash, 
            crm: crm,
            especialidade: especialidade,
            id_clinica: id_clinica
        }
        await atualizarMedicos(medicoId, medicoData);
        res.status(201).json({mensagem: 'Informações atualizadas com sucesso'})
       } catch (err) {
        console.error('Erro ao atualizar informações: ', err)
        res.status(500).json({mensagem: "Erro ao atualizar informações"})
       }
}

const deletarMedicoController = async (req,res) => {
    try{
        const medicoId = req.params.id;
        await deletarMedico(medicoId);
        res.status(200).json({mensagem: "Médico deletado"})
    } catch (err) {
        console.error("Erro ao deletar dados do medico:", err)
        res.status(500).json({mensagem: "Erro ao deletar"})
    }
}
// exportando para o routes
export { listarMedicosController, listarMedicosPorIdController, adicionarMedicosController, atualizarMedicosController, deletarMedicoController }