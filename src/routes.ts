import { Router } from "express";
import { AutenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreteMessageController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router()

router.post('/authenticate', new AutenticateUserController().handle)

router.post('/messages', ensureAuthenticated, new CreateMessageController().handle)

export { router }