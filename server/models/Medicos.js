import { readAll } from "../config/database.js";

const listarMedicos = async () => {
    try{
        return await readAll('Medicos');
    } catch (err) {
        console.error('Erros ao listar medicos', err)
        throw err;
    }
}