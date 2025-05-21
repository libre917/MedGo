import { listarClinicasController, listarClinicasPorIdController } from '../controller/ClinicasController.js';
import express from 'express'

const router = express.Router();
const port = 3000;

router.get('/', listarClinicasController);
router.get('/:id', listarClinicasPorIdController);


router.options("/", (req, res) => {
    res.setHeader("Allow", "GET, OPTIONS");
    res.status(204).send();
  });
  
  router.options("/:id", (req, res) => {
    res.setHeader("Allow", "GET, OPTIONS");
    res.status(204).send();
  });

  export default router;