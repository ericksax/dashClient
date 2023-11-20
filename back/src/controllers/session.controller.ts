import {
  IsessionRequest,
  IsessionResponse,
} from "../interfaces/session.interface";
import { SessionService } from "../services/session.sevice";
import { Request, Response } from "express";

class SessionController {
  constructor(public sessionService: SessionService) {}

  async create(
    req: Request,
    res: Response
  ): Promise<Response<IsessionResponse>> {
    const { email, password }: IsessionRequest = req.body;
    const result = await this.sessionService.create({ email, password });
    return res.json(result);
  }
}

export { SessionController };
