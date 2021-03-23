import {
  Body,
  Post,
  JsonController,
  Get,
  Param,
  CurrentUser,
  Authorized,
  BadRequestError,
  HttpCode,
} from "routing-controllers";
import { Ticket } from "../entities";
import { TicketCreateReq } from "../models";
import { JwtSignature } from "../models/auth/jwt-payload";
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
    return this.ticketService.getAll();
  }

  @Authorized(["admin"])
  @Get("/all")
  async getAll() {
    return this.ticketService.getAll();
  }

  @Authorized(["admin", "tenant"])
  @Get("/my-tickets")
  async getTicketFromCurrentUser(@CurrentUser() jwtSignature: JwtSignature) {
    const [tickets, count] = await this.ticketService.getTicketByUserId(
      jwtSignature.id
    );
    return { count, payload: tickets };
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
    const ticketStatusService = new TicketStatusService();
    const severityService = new SeverityService();
    const propertyService = new PropertyService();

    try {
      const user = await this.userService.getUserById(jwtSignature.id);
      const status = await ticketStatusService.getById(
        ticketCreateReq.statusId
      );
      const severity = await severityService.getById(
        ticketCreateReq.severityId
      );
      const property = await propertyService.getById(
        ticketCreateReq.propertyId
      );
      const ticket = new Ticket();
      ticket.title = ticketCreateReq.title;
      ticket.content = ticketCreateReq.content;
      ticket.user = user;
      ticket.severity = severity;
      ticket.property = property;
      ticket.status = status;

      await this.ticketService.create(ticket);

      return { success: true, created: ticket };
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }
}