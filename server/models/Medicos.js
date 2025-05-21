import { readAll, read, create, update, deleteRecord } from "../config/database.js";

// constante para listar medicos salvos no banco de dados
const listarMedicos = async () => {
    try{
        return await readAll('Medicos');
    } catch (err) {
        console.error('Erros ao listar medicos', err)
        throw err;
    }
}

const listarMedicosPorId = async (id)=> {
    try{
        return await read( 'Medicos', `id = ${id}`)
    } catch (err) {
        console.error('Erro ao obter o medico de id:',id, err)
    }
}

const adicionarMedicos = async (medicoData) => {
    try {
        return await create('Medicos', medicoData)
    } catch (err) {
        console.error('Erro ao adicionar medico: ',err);
        throw err;
    }
}

const atualizarMedicos = async (id, medicoData) => {
    try {
        return await update ('Medicos', medicoData, `id = ${id}`)
    } catch (err) {
        console.error('Erro ao atualizar dados do medico : ', err);
        throw err;
    }
}

const deletarMedico = async (id) => {
    try{
        return await deleteRecord ('Medicos', `id = ${id}`)
    } catch ( err) {
        console.error("Erro ao deletar dados do medico: ", err)
        throw err;
    }
}

// exportando para o controller
export { listarMedicos, listarMedicosPorId, adicionarMedicos, atualizarMedicos, deletarMedico }