import { Request, Response } from "express";
import { UserService } from "../services/users.service";
import { IUserRequest } from "../interfaces/user.interface";

class UserControllers {
  constructor(public userService: UserService) {}
  async create(req: Request, res: Response) {
    const data: IUserRequest = req.body;
    const user = await this.userService.create(data);

    return res.status(201).json(user);
  }

  async list(_: Request, res: Response) {
    const users = await this.userService.list();
    return res.json(users);
  }

  async userDetails(req: Request, res: Response) {
    const user = await this.userService.retrieve(req.params.id);
    return res.json(user);
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params;
    await this.userService.destroy(id);
    return res.status(204).send();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data: IUserRequest = req.body;
    const user = await this.userService.update(data, id);
    return res.json(user);
  }
}

export { UserControllers };
