import express from 'express';
import { listarPacientesController, listarPacientesPorIdController, adicionarPacientesController, atualizarPacienteController,deletarPacienteController } from '../controller/PacientesController.js'

const router = express.Router();


router.get('/', listarPacientesController);
router.get('/:id', listarPacientesPorIdController)
router.post('/', adicionarPacientesController)
router.put('/:id', atualizarPacienteController)
router.delete('/:id', deletarPacienteController)

router.options("/", (req, res) => {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.status(204).send();
  });
  
  router.options("/:id", (req, res) => {
    res.setHeader("Allow", "GET, DELETE, PUT OPTIONS");
    res.status(204).send();
  });

  export default router;
  