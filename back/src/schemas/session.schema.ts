import {z} from "zod"

const sessionSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

const sessionSchemaResponse = z.object({
    token: z.string()
})

export { sessionSchema, sessionSchemaResponse }