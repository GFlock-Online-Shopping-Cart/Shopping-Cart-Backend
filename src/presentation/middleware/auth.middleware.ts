import * as dotenv from "dotenv";
import { auth } from "express-oauth2-jwt-bearer";
import { Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { IRequest } from "../../interfaces/IRequest";

dotenv.config();

export const validateAccessToken = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`
});

export const decodeIdToken = (req: IRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")!.split(" ")[1];
  const decode = jwt.decode(token);

  const userId = (decode!.sub as string).split("|")[1];
  if (userId) {
    req.user = {id: userId}
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" })
  }
  
}