import { Router } from "express";
import { contactController } from "../controllers";
import { ensureIsAuthenticated } from "../midlewares/ensureIsAuthenticated";

const contactRouter = Router();

contactRouter.post("", ensureIsAuthenticated, async (req, res) =>
  contactController.create(req, res)
);

contactRouter.patch("/:id", async (req, res) =>
  contactController.update(req, res)
);
contactRouter.delete("/:id", async (req, res) =>
  contactController.remove(req, res)
);
contactRouter.get("", async (req, res) => contactController.listAll(req, res));

export { contactRouter };
