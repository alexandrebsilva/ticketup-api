import { verify } from "jsonwebtoken";
import { JwtPayload } from "../models/jwt-payload";

export default (token: string): JwtPayload => {
  try {
    return verify(token, process.env.JWT_PRIVATE_KEY!) as JwtPayload;
  } catch (err) {
    throw new Error(err.message);
  }
};
