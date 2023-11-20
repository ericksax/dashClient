import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export const ensureIsAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const [, token] = req.headers.authorization.split(" ");

  verify(token, process.env.SECRET_KEY!, (err, decoded: any) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    res.locals.userId = decoded.sub;
  });

  next();
};
