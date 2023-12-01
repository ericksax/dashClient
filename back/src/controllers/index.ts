import { ContactService } from "../services/contact.service";
import { SessionService } from "../services/session.sevice";
import { UserService } from "../services/users.service";
import { ContactController } from "./contact.controller";
import { SessionController } from "./session.controller";
import { UserControllers } from "./user.controller";

const userController = new UserControllers(new UserService());
const sessionController = new SessionController(new SessionService());
const contactController = new ContactController(new ContactService());
export { userController, sessionController, contactController };
