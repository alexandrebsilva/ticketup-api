import { Body, Post, JsonController } from "routing-controllers";
import { User } from "../entities";
import { LoginPayloadReq } from "../models";
import { AuthService } from "../services";

@JsonController("/auth")
export class AuthController {
  private authService;

  constructor() {
    this.authService = new AuthService();
  }

  @Post("/login")
  async login(@Body() login: LoginPayloadReq) {
    const verifiedUser = await this.authService.getUserByCredentials(login);
    if (verifiedUser) {
      return {
        token: this.authService.createJwt({
          id: verifiedUser.id,
          firstName: verifiedUser.firstName,
          lastName: verifiedUser.lastName,
          role: verifiedUser.role.name,
        }),
        refreshToken: this.authService.createJwt(
          {
            id: verifiedUser.id,
            firstName: verifiedUser.firstName,
            lastName: verifiedUser.lastName,
            role: verifiedUser.role.name,
          },
          true
        ),
      };
    }
    return verifiedUser;
  }
  //forget password
}
