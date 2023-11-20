import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { userRepository } from "../repositories/repositories";
import {
  IsessionRequest,
  IsessionResponse,
} from "../interfaces/session.interface";
import { AppError } from "../errors/AppError";
import { User } from "../entities/User";

class SessionService {
  async create(data: IsessionRequest) {
    const { email, password } = data;

    const user: User | null = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Invalid password", 401);
    }

    const token = sign({ name: user.name }, process.env.SECRET_KEY!, {
      subject: user.id,
      expiresIn: process.env.EXPIRES_IN,
    });

    return { token: token, id: user.id };
  }
}

export { SessionService };
