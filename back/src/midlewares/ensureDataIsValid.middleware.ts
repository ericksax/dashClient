import {Request, Response, NextFunction} from "express"
import { ZodTypeAny } from "zod"

const ensureDataIsValidMiddleware = (schema: ZodTypeAny) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const validatedBody = schema.parse(req.body)
        req.body = validatedBody
        next()
    }
}

export {ensureDataIsValidMiddleware}