import { verify } from "jsonwebtoken";
import { JwtSignature } from "../models";

export default (token: string): JwtSignature => {
  try {
    return verify(token, process.env.JWT_PRIVATE_KEY!) as JwtSignature;
  } catch (err) {
    throw new Error(err.message);
  }
};
