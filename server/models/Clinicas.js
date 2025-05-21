import { read, readAll } from "../config/database.js";

const listarClinicas = async () => {
    try{
        return readAll('Clinicas')
    } catch (err) {
        console.error('Erro ao mostrar clinicas salvas:', err)
        throw err;
    }
}

const listarClinicasPorId = async (id) => {
    try{
        return await read('Clinicas', `id = ${id}`)
    } catch (err) {
        console.error('Erro ao mostrar clinica:', err)
        throw err;
    }
}

export { listarClinicas, listarClinicasPorId }