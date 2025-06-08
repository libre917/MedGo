import express from 'express';
import { listarMedicosController, listarMedicosPorIdController, adicionarMedicosController, atualizarMedicosController, deletarMedicoController } from '../controller/MedicosController.js'

const router = express.Router();

router.get('/', listarMedicosController);
router.get('/:id', listarMedicosPorIdController)
router.post('/', adicionarMedicosController)
router.patch('/:id', atualizarMedicosController)
router.delete('/:id', deletarMedicoController)

router.options("/", (req, res) => {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.status(204).send();
  });
  
  router.options("/:id", (req, res) => {
    res.setHeader("Allow", "GET, DELETE, PATCH, OPTIONS");
    res.status(204).send();
  });

  export default router;
  