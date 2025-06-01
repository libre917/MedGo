import { adicionarAgendamentoController, listarAgendaController, listarAgendaPorIdController, deletarAgendamentoController, atualizarAgendamentoController } from "../controller/AgendaController.js";
import express from 'express'

const router = express.Router();


router.get('/', listarAgendaController);
router.get('/:id', listarAgendaPorIdController);
router.post('/', adicionarAgendamentoController);
router.put('/:id', atualizarAgendamentoController)
router.delete('/:id', deletarAgendamentoController);

router.options("/", (req, res) => {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.status(204).send();
  });
  
  router.options("/:id", (req, res) => {
    res.setHeader("Allow", "GET, DELETE, OPTIONS");
    res.status(204).send();
  });

  export default router;