import {z} from "zod"

const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    contact: z.string(),
    password: z.string(),
    created_at: z.string().or(z.date()),
})

const userRequestSchema = userSchema.omit({
    id: true,
    created_at: true
})

const userResponseSchema = userSchema.omit({
    password: true
})

const userUpdateSchema = userRequestSchema.partial()
const usersResponseSchema = z.array(userResponseSchema)

export {
    userRequestSchema,
    userResponseSchema,
    usersResponseSchema,
    userUpdateSchema
}