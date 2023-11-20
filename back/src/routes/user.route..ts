import { Router } from "express";
import { userController } from "../controllers";
import { ensureDataIsValidMiddleware } from "../midlewares/ensureDataIsValid.middleware";
import { userRequestSchema } from "../schemas/user.schema";

const userRoutes = Router()

userRoutes.post("", ensureDataIsValidMiddleware(userRequestSchema), async (req, res) => userController.create(req, res)
)
userRoutes.get("", async (req, res) => userController.list(req, res))

export { userRoutes }