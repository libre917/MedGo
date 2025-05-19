import { readAll, read, create } from "../config/database.js";

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
        return await read( 'Pacientes', `id_paciente = ${id}`)
    } catch (err) {
        console.error('Erro ao obter o paciente de id:',id, err)
    }
}

const adiocionarPaciente = async (pacienteData) => {
    try {
        return await create ('Pacientes', pacienteDataData)
    } catch (err) {
        console.error('Erro ao adicionar paciente')
    }
}

// exportando para o controller
export { listarPacientes, listarPacientesPorId }