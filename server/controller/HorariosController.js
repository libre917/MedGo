import { read } from "../config/database.js";
import { listarHorarios, listarHorariosPorId } from "../models/Horarios.js";


const listarHorariosController = async (req, res) => {
    try {
        const horarios = await listarHorarios();
        res.status(200).json(horarios);
    } catch(err) {
        console.error('Erro ao listar horarios', err)
        res.status(500).json({mensagem: "Erro ao listar horarios"})
    }
}

const listarHorariosPorIdController = async (req, res) => {
    try{
        const horario = await listarHorariosPorId(req.params.id);
        if ( horario) {
            res.status(200).json(horario)
        } else {
            res.status(404).json({mensagem: "Horario não existente/encontrado"})
        }
    } catch (err) {
        console.error('Erro ao mostrar horario', err);
        res.status(500).json({mensagem: "Erro ao mostrar horario"})
    }
}

export { listarHorariosController, listarHorariosPorIdController}