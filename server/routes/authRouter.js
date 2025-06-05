import express from "express"
import { loginUserController, loginMedController, loginAdmController, loginClinicaController } from "../controller/AuthController.js"

const router = express.Router();

router.post('/login', loginUserController)
router.post('/medLogin', loginMedController )
router.post('/admLogin', loginAdmController)
router.post('/clinicaLogin', loginClinicaController)

export default router;