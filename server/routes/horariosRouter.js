import express from "express";
import { listarHorariosController, listarHorariosPorIdController } from "../controller/HorariosController.js";

const router = express.Router();

router.get('/', listarHorariosController);
router.get('/:id', listarHorariosPorIdController)

router.options("/", (req, res) => {
    res.setHeader("Allow", "GET, OPTIONS");
    res.status(204).send();
  });
  
  router.options("/:id", (req, res) => {
    res.setHeader("Allow", "GET, OPTIONS");
    res.status(204).send();
  });

  export default router;