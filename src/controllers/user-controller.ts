import {
  Param,
  Get,
  Authorized,
  CurrentUser,
  JsonController,
} from "routing-controllers";
import { JwtSignature } from "../models/auth/jwt-payload";
import { UserService } from "../services";

@JsonController("/user")
export class UserController {
  private userService;

  constructor() {
    this.userService = new UserService();
  }

  @Get("/")
  @Authorized(["admin", "tenant", "client"])
  getLoggedUser(@CurrentUser() jwtSignature: JwtSignature) {
    return this.userService.getUserById(jwtSignature.id);
  }

  @Get("/all")
  @Authorized(["admin"])
  async getAll() {
    const [users, count] = await this.userService.getListOfUsers();
    return { count, payload: users };
  }

  @Get("/:id")
  @Authorized(["admin"])
  async getOne(@Param("id") id: number) {
    return this.userService.getUserById(id);
  }
}
