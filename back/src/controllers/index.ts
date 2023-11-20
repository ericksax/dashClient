import { SessionService } from "../services/session.sevice";
import { UserService } from "../services/users.service";
import { SessionController } from "./session.controller";
import { UserControllers } from "./user.controller";

const userController = new UserControllers(new UserService)
const sessionController = new SessionController(new SessionService)
export { userController, sessionController }