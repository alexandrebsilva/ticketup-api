import { LoginPayloadReq } from "../models/auth/login-payload";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities";

export class UserService {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = getRepository(User);
  }
  public verifyCredentials(loginForm: LoginPayloadReq) {}
}
