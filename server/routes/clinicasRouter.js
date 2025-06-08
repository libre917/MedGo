import { listarClinicasController, listarClinicasPorIdController, adicionarClinicasController, atualizarClinicasController, deletarClinicaController } from '../controller/ClinicasController.js';
import express from 'express'

const router = express.Router();

router.get('/', listarClinicasController);
router.get('/:id', listarClinicasPorIdController);
router.post('/', adicionarClinicasController);
router.patch('/:id', atualizarClinicasController);
router.delete('/:id', deletarClinicaController);


router.options("/", (req, res) => {
    res.setHeader("Allow", "GET, OPTIONS");
    res.status(204).send();
  });
  
  router.options("/:id", (req, res) => {
    res.setHeader("Allow", "GET, OPTIONS");
    res.status(204).send();
  });

  export default router;