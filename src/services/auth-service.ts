import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { JwtSignature } from "../models/auth";
import { LoginPayloadReq } from "../models";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities";
import { compareTextWithHash } from "../helpers/bcrypt";
dotenv.config();

export const name = "alexandre";
export class AuthService {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = getRepository(User);
  }
  public createJwt(
    JwtSignature: JwtSignature,
    refreshToken: boolean = false
  ): string {
    return jwt.sign(JwtSignature, process.env.JWT_PRIVATE_KEY!, {
      algorithm: "HS256",
      //900000 = 15 min
      expiresIn: refreshToken ? "7d" : "900000ms",
    });
  }

  public async getUserByCredentials(loginForm: LoginPayloadReq): Promise<User> {
    const userByEmail = await this.userRepository.findOneOrFail({
      where: { email: loginForm.email },
      relations: ["role"],
    });

    if (userByEmail) {
      const isPasswordCorrect = compareTextWithHash(
        loginForm.password,
        userByEmail.password
      );

      if (isPasswordCorrect) {
        return userByEmail;
      }
    }

    throw new Error("Wrong credentials");
  }
}
