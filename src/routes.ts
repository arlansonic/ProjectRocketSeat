import { Router } from "express";
import { AutenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreteMessageController";
import { Get3LasMessagesController } from "./controllers/GetLast3MessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router()

router.post('/authenticate', new AutenticateUserController().handle)

router.post('/messages', ensureAuthenticated, new CreateMessageController().handle)

router.get('/messages/last3', new Get3LasMessagesController().handle)

router.get('/profile', ensureAuthenticated, new ProfileUserController().handle)

export { router }