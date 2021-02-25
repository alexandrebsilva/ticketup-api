import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { JwtPayload } from "../models/jwt-payload";
dotenv.config();

export default (jwtPayload: JwtPayload) => {
  return jwt.sign(jwtPayload, process.env.JWT_PRIVATE_KEY!, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};
