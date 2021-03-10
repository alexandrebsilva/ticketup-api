import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { JwtSignature } from "../models/auth/jwt-payload";
import { LoginPayloadReq } from "../models/auth/login-payload";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities";
import { encrypt, compareTextWithHash } from "../helpers/crypto";
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

  public async verifyCredentials(loginForm: LoginPayloadReq) {
    const userByEmail: User[] = await this.userRepository.find({
      where: { email: loginForm.email },
    });
    if (userByEmail.length > 0) {
      return compareTextWithHash(loginForm.password, userByEmail[0].password);
    }
    return false;
  }
}
