import { readAll, read, create, update, deleteRecord } from "../config/database.js";

// constante para listar medicos salvos no banco de dados
const listarPacientes = async () => {
    try{
        return await readAll('Pacientes');
    } catch (err) {
        console.error('Erros ao listar pacientes registrados', err)
        throw err;
    }
}

const listarPacientesPorId = async (id)=> {
    try{
        return await read( 'Pacientes', `id = ${id}`)
    } catch (err) {
        console.error('Erro ao obter o paciente de id:',id, err)
    }
}

const adicionarPaciente = async (pacienteData) => {
    try {
        return await create ('Pacientes', pacienteData)
    } catch (err) {
        console.error('Erro ao adicionar paciente:', err)
    }
}

const atualizarPaciente = async (id, pacienteData) => {
    try{
        await update ('Pacientes', pacienteData, `id = ${id}`)
    } catch (err) {
        console.error('Erro ao atualizar dados : ', err);
        throw err;
    }
}

const deletarPaciente = async (id) => {
    try{
        await deleteRecord ('Pacientes', `id = ${id}`)
    } catch (err) {
        console.error("Erro ao deletar paciente: ", err)
        throw err;
    }
}
// exportando para o controller
export { listarPacientes, listarPacientesPorId, adicionarPaciente, atualizarPaciente, deletarPaciente }   