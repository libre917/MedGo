import express from "express"
import { loginUserController, loginMedController } from "../controller/AuthController.js"

const router = express.Router();

router.post('/login', loginUserController)
router.post('/medLogin', loginMedController )

export default router;