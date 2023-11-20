import {
  IUserRequest,
  IUserResponse,
  IUserUpdate,
  IUsersResponse,
} from "../interfaces/user.interface";
import { userRepository } from "../repositories/repositories";
import { hash } from "bcryptjs";
import {
  userResponseSchema,
  usersResponseSchema,
} from "../schemas/user.schema";
import { AppError } from "../errors/AppError";

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

    const hashedPasword = await hash(password, 10);

    const user = userRepository.create({ ...data, password: hashedPasword });
    const result = await userRepository.save(user);
    return userResponseSchema.parse(result);
  }

  async update(data: IUserUpdate, userId: string): Promise<IUserResponse> {
    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const updatedUser = userRepository.create({
      ...user,
      ...data,
    });

    const result = await userRepository.save(updatedUser);

    return userResponseSchema.parse(result);
  }

  async retrieve(userId: string): Promise<IUserResponse> {
    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return userResponseSchema.parse(user);
  }

  async list() {
    const users: IUsersResponse = await userRepository.find();
    return usersResponseSchema.parse(users);
  }
}
export { UserService };
