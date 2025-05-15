import { readAll, read } from "../config/database.js";

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
        return await read( 'Medicos', `id_medico = ${id}`)
    } catch (err) {
        console.error('Erro ao obter o medico de id:',id, err)
    }
}

// exportando para o controller
export { listarMedicos, listarMedicosPorId }