import { read, readAll } from "../config/database.js";

const listarHorarios = async () => {
    try {
        return await readAll('Horarios');
    } catch (err) {
        console.error('Erro ao listar horarios', err)
        throw err;
    }
}

const listarHorariosPorId = async (id) => {
    try {
        return await read('Horarios', `id = ${id}`)
    } catch ( err) {
        console.error('Erro ao mostrar horario', err)
        throw err;
    }
}

export { listarHorarios, listarHorariosPorId }