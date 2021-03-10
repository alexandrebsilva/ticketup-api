import {
  Param,
  Body,
  Get,
  Post,
  Authorized,
  CurrentUser,
  JsonController,
} from "routing-controllers";
import { User } from "../entities";
import { LoginPayloadReq } from "../models/auth/login-payload";
import { AuthService } from "../services";

@JsonController("/user")
export class UserController {
  private authService = new AuthService();
  @Get("/")
  @Authorized(["admin", "tenant", "client"])
  getAll(@CurrentUser() user: User) {
    return user;
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
      };
    }
    return verifiedUser;
  }

  @Get("/:id")
  getOne(@Param("id") id: number) {
    return "This action returns user #" + id;
  }
}
