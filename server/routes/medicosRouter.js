import express from 'express';
import { listarMedicosController, listarMedicosPorIdController, adicionarMedicosController, atualizarMedicosController, excluirLivroController } from '../controller/MedicosController.js'
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, path.join(__dirname), "../uploads/")
    }, 
    filename: (req, file, cb) => {
        const nomeArquivo = `${Date.now()}-${file.originalname}`;
        cb(null, nomeArquivo);
      },
})

const upload = multer ({storage: storage});

const router = express.Router();
const port = 3000

router.get('/', listarMedicosController);
router.get('/:id', listarMedicosPorIdController)
router.post('/', adicionarMedicosController)
router.put('/:id', atualizarMedicosController)
router.delete('/:id', excluirLivroController)

router.options("/", (req, res) => {
    res.setHeader("Allow", "GET, OPTIONS");
    res.status(204).send();
  });
  
  router.options("/:id", (req, res) => {
    res.setHeader("Allow", "GET, OPTIONS");
    res.status(204).send();
  });

  export default router;
  