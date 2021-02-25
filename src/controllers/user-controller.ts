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

import getToken from "../factories/token-factory";

@Controller()
export class UserController {
  @Get("/users")
  @Authorized(["admin", "tenant", "client"])
  getAll(@CurrentUser() user: any) {
    return user;
  }
  @Get("/get-token")
  getToken() {
    return {
      token: getToken({
        firstName: "Alexandre",
        id: 1,
        lastName: "Borges",
        role: "admin",
      }),
    };
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
