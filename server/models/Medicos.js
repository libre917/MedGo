import { readAll } from "../config/database.js";

// constante para listar medicos salvos no banco de dados
const listarMedicos = async () => {
    try{
        return await readAll('Medicos');
    } catch (err) {
        console.error('Erros ao listar medicos', err)
        throw err;
    }
}

export { listarMedicos }