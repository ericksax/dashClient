import { Router } from "express";
import { contactController, userController } from "../controllers";
import { ensureDataIsValidMiddleware } from "../midlewares/ensureDataIsValid.middleware";
import { userRequestSchema } from "../schemas/user.schema";

const userRoutes = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userRequestSchema),
  async (req, res) => userController.create(req, res)
);
userRoutes.get("", async (req, res) => userController.list(req, res));
userRoutes.get("/:id", async (req, res) =>
  userController.userDetails(req, res)
);
// userRoutes.put("/:id/contacts", async (req, res) =>
//   contactController.create(req, res)
// );

userRoutes.patch("/:id", async (req, res) => userController.update(req, res));

userRoutes.delete("/:id", async (req, res) => userController.destroy(req, res));

export { userRoutes };
