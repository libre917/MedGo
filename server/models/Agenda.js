import { read, readAll, create, update, deleteRecord } from "../config/database.js";

const listarAgenda = async () => {
    try{
        return await readAll('Agenda')
    } catch (err) {
        console.error('Erro ao mostrar agenda:', err)
        throw err;
    }
}

const listarAgendaPorId = async (id) => {
    try {
        return await read('Agenda', `id_agenda = ${id}`)
    } catch (err) {
        console.error("Erro ao mostrar agendamento: ", err)
        throw err
    }
}

const adicionarAgendamento = async (agendaData) => {
    try {
        return await create('Agenda', agendaData)
    } catch (err) {
        console.error('Erro ao relizar agendamento: ', err)
        throw err;
    }
}

const deletarAgendamento = async (id) => {
    try{
        return await deleteRecord('Agenda', `id_agenda = ${id}`)
    } catch (err) {
        console.error("Erro ao cancelar agendamento: ", err)
        throw err;
    }
}

export { listarAgenda, listarAgendaPorId, adicionarAgendamento, deletarAgendamento}