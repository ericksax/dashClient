import { z } from "zod"
import {userRequestSchema, userResponseSchema, userUpdateSchema, usersResponseSchema} from "../schemas/user.schema"
import { DeepPartial } from "typeorm"
import { User } from "../entities/User"


type IUserRequest = z.infer<typeof userRequestSchema>
type IUserResponse = z.infer<typeof userResponseSchema>
type IUserUpdate = DeepPartial<User>
type IUsersResponse = z.infer<typeof usersResponseSchema>

export {IUserRequest, IUserResponse, IUserUpdate, IUsersResponse}