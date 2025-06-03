import { read, readAll, create, update, deleteRecord } from "../config/database.js";

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

const adicionarClinicas = async (clinicaData) => {
    try{
        return await create("Clinicas", clinicaData)
    } catch(err){
        console.error('Erro ao criar clinica:', err)
    }
}

const atualizarClinica = async (id, clinicaData) => {
    try{
        await update ('Clinicas', clinicaData, `id = ${id}`)
    } catch (err) {
        console.error('Erro ao atualizar dados : ', err);
        throw err;
    }
}

const deletarClinica = async (id) => {
    try{
        await deleteRecord ('Clinicas', `id = ${id}`)
    } catch (err) {
        console.error("Erro ao deletar clinica: ", err)
        throw err;
    }
}
export { listarClinicas, listarClinicasPorId, adicionarClinicas, atualizarClinica, deletarClinica }