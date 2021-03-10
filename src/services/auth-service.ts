import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { JwtSignature } from "../models/auth/jwt-payload";
import { LoginPayloadReq } from "../models/auth/login-payload";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities";
dotenv.config();

export class AuthService {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = getRepository(User);
  }
  public createJwt(JwtSignature: JwtSignature) {
    return jwt.sign(JwtSignature, process.env.JWT_PRIVATE_KEY!, {
      algorithm: "HS256",
      expiresIn: "1h",
    });
  }

  public verifyCredentials(loginForm: LoginPayloadReq) {
    const userByEmail = this.userRepository.findOneOrFail({
      where: { email: loginForm.email },
    });
    return userByEmail;
  }
}
