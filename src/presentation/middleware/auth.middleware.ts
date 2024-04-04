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

export const decodeAccessToken = (req: IRequest, res: Response, next: NextFunction) => {
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

export const decodedIdToken = (req: IRequest, res: Response, next: NextFunction) => {
  const idToken = req.body.idToken;
  
  const decodedToken = jwt.decode(idToken);
  console.log("Deeeecoode id", decodedToken);
  

  if(typeof decodedToken !== 'string') {
    const userEmail = (decodedToken as jwt.JwtPayload).email
    console.log("Userrrr email",userEmail);
    
    req.user = {...req.user, email: userEmail}
    next();
  } else {
    console.log("hyyoo");
    
    res.status(401).json({ message: "Unauthorized" });
  }

}