import { Request, Response } from "express";
import { UserService } from "../services/users.service";
import { IUserRequest } from "../interfaces/user.interface";


class UserControllers {
    constructor(public userService: UserService) {}
    async create(req: Request, res: Response) {
        const data: IUserRequest = req.body
        const user = await this.userService.create(data)

        return res.status(201).json(user)
    }

    async list(_: Request, res: Response) {
        const users = await this.userService.list()
        return res.json(users)
    }
}

export { UserControllers }