import { Router } from "express";
import { sessionController } from "../controllers";

const sessionRouter = Router()

sessionRouter.post("", async (req, res) => sessionController.create(req, res))

export { sessionRouter }