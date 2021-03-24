import {
  Body,
  Post,
  JsonController,
  Get,
  Param,
  CurrentUser,
  Authorized,
  BadRequestError,
  Patch,
} from "routing-controllers";
import { Ticket } from "../entities";
import { createTicketObject } from "../factories/ticket-factory";
import { TicketCreateReq } from "../models";
import { JwtSignature } from "../models/auth/jwt-payload";
import { TicketUpdatableReq } from "../models/tickets";
import { PropertyService, SeverityService, UserService } from "../services";

import { TicketService } from "../services/ticket-service";
import { TicketStatusService } from "../services/ticket-status-service";

@JsonController("/ticket")
export class TicketController {
  private ticketService;

  private userService;
  constructor() {
    this.ticketService = new TicketService();
    this.userService = new UserService();
  }

  @Get("/")
  async getTicketsFromUser() {
    const [payload, count] = await this.ticketService.getAll();
    return { count, payload };
  }

  @Authorized(["admin"])
  @Get("/all")
  async getAll() {
    const [count, payload] = await this.ticketService.getAll();
    return { count, payload };
  }

  @Authorized(["admin", "tenant"])
  @Get("/my-tickets")
  async getTicketFromCurrentUser(@CurrentUser() jwtSignature: JwtSignature) {
    const [payload, count] = await this.ticketService.getTicketByUserId(
      jwtSignature.id
    );
    return { count, payload };
  }

  @Authorized(["admin", "tenant"])
  @Get("/:id")
  async getTicketById(@Param("id") id: number) {
    return this.ticketService.getTicketById(id);
  }

  @Authorized(["admin", "tenant"])
  @Post("/")
  async create(
    @CurrentUser() jwtSignature: JwtSignature,
    @Body({ validate: true }) ticketCreateReq: TicketCreateReq
  ) {
    try {
      const ticket = await createTicketObject(jwtSignature.id, ticketCreateReq);

      await this.ticketService.create(ticket);

      return { success: true, created: ticket };
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }
  @Authorized(["admin", "tenant"])
  @Patch("/:id")
  async update(
    @CurrentUser() jwtSignature: JwtSignature,
    @Body({ validate: true }) ticketUpdateReq: TicketUpdatableReq,
    @Param("id") id: number
  ) {
    try {
      const updatedTicket = await createTicketObject(
        jwtSignature.id,
        ticketUpdateReq,
        id
      );
      await this.ticketService.update(id, updatedTicket);
      return { success: true };
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }
}
