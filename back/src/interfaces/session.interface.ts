import { sessionSchema, sessionSchemaResponse } from "../schemas/session.schema";
import {z} from "zod"

type IsessionRequest = z.infer<typeof sessionSchema>
type IsessionResponse = z.infer<typeof sessionSchemaResponse>

export { IsessionRequest,IsessionResponse }