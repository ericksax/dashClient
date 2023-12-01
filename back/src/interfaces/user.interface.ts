import { z } from "zod";
import {
  userDetailsResponseSchema,
  userRequestSchema,
  userResponseSchema,
  usersResponseSchema,
} from "../schemas/user.schema";
import { DeepPartial } from "typeorm";
import { User } from "../entities/User";

type IUserRequest = z.infer<typeof userRequestSchema>;
type IUserResponse = z.infer<typeof userDetailsResponseSchema>;
type IUserUpdate = DeepPartial<User>;
type IUsersResponse = z.infer<typeof usersResponseSchema>;
type IUser = z.infer<typeof userResponseSchema>;

export { IUserRequest, IUser, IUserResponse, IUserUpdate, IUsersResponse };
