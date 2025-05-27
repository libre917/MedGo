import { read, readAll, create, update, deleteRecord } from "../config/database.js";

const listarAgenda = async () => {
    try{
        return await readAll('Agendamentos')
    } catch (err) {
        console.error('Erro ao mostrar agenda:', err)
        throw err;
    }
}

const listarAgendaPorId = async (id) => {
    try {
        return await read('Agendamentos', `id = ${id}`)
    } catch (err) {
        console.error("Erro ao mostrar agendamento: ", err)
        throw err
    }
}

const adicionarAgendamento = async (agendaData) => {
    try {
        return await create('Agendamentos', agendaData)
    } catch (err) {
        console.error('Erro ao relizar agendamento: ', err)
        throw err;
    }
}

const atualizarAgendamento = async (id, agendaData) => {
    try {
        return await update('Agendamentos', agendaData, `id = ${id}`)
    }catch(err){
        console.error("Erro ao atulizar o agendamento")
    }
}

const deletarAgendamento = async (id) => {
    try{
        return await deleteRecord('Agendamentos', `id = ${id}`)
    } catch (err) {
        console.error("Erro ao cancelar agendamento: ", err)
        throw err;
    }
}

export { listarAgenda, listarAgendaPorId, adicionarAgendamento, atualizarAgendamento, deletarAgendamento}