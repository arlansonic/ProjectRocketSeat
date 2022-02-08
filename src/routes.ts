import { Router } from "express";
import { AutenticateUserController } from "./controllers/AuthenticateUserController";

const router = Router()

router.post('/authenticate', new AutenticateUserController().handle)

export { router }