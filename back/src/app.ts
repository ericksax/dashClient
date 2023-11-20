import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { userRoutes } from "./routes/user.route.";
import { handleAppErrorsMiddleware } from "./midlewares/handleAppErrors.middlewares";
import { sessionRouter } from "./routes/session.route";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", sessionRouter);
app.use(handleAppErrorsMiddleware);

export { app };
