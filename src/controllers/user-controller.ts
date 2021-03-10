import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Authorized,
  CurrentUser,
} from "routing-controllers";
import { LoginPayloadReq } from "../models/auth/login-payload";
import { AuthService } from "../services";

@Controller("/user")
export class UserController {
  private authService = new AuthService();
  @Get("/")
  @Authorized(["admin", "tenant", "client"])
  getAll(@CurrentUser() user: any) {
    return user;
  }

  @Post("/login")
  async login(@Body() login: LoginPayloadReq) {
    const user = await this.authService.verifyCredentials(login);
    return user;
  }

  @Get("/users/:id")
  getOne(@Param("id") id: number) {
    return "This action returns user #" + id;
  }

  @Post("/users")
  post(@Body() user: any) {
    return "Saving user...";
  }

  @Put("/users/:id")
  put(@Param("id") id: number, @Body() user: any) {
    return "Updating a user...";
  }

  @Delete("/users/:id")
  remove(@Param("id") id: number) {
    return "Removing user...";
  }
}
