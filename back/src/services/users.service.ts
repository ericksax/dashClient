import {
  IUser,
  IUserRequest,
  IUserResponse,
  IUserUpdate,
  IUsersResponse,
} from "../interfaces/user.interface";
import { userRepository } from "../repositories/repositories";
import { hash } from "bcryptjs";
import {
  userDetailsResponseSchema,
  userResponseSchema,
  usersResponseSchema,
} from "../schemas/user.schema";
import { AppError } from "../errors/AppError";
import { User } from "../entities/User";

class UserService {
  async create(data: IUserRequest): Promise<IUserResponse> {
    const { password, email } = data;

    const userAlreadyExists = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new AppError("User already exists", 409);
    }

    const hashedPassword = await hash(password, 10);

    const user = userRepository.create({
      ...data,
      password: hashedPassword,
    });
    const result = await userRepository.save(user);
    return userDetailsResponseSchema.parse(result);
  }

  async update(data: IUserUpdate, userId: string): Promise<IUserResponse> {
    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        contacts: true,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const updatedUser = userRepository.create({
      ...user,
      ...data,
    });

    const result: User = await userRepository.save(updatedUser);

    return userDetailsResponseSchema.parse(result);
  }

  async retrieve(userId: string): Promise<IUserResponse> {
    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        contacts: true,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return userDetailsResponseSchema.parse(user);
  }

  async list(): Promise<IUsersResponse> {
    const users = await userRepository.find({
      relations: {
        contacts: true,
      },
    });

    return usersResponseSchema.parse(users);
  }

  async destroy(id: string) {
    const user = await userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    await userRepository.remove(user);
  }
}
export { UserService };
