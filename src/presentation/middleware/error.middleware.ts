import { SubError } from "../../config/subError";
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  error: SubError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = error.statusCode ? error.statusCode : 500;
  const message = error.message ? error.message : "Internal server error";

  res.status(statusCode).json({ message });
};
