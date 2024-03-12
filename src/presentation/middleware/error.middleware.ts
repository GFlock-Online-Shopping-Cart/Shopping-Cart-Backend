import { HTTPException } from "../../config/httpException";
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  error: HTTPException,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = error.statusCode ? error.statusCode : 500;
  const message = error.message ? error.message : "Internal server error";

  res.status(statusCode).json({ message });
};
