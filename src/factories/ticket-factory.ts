import { Ticket } from "../entities";
import { TicketCreateReq, TicketUpdateReq } from "../models/tickets";
import {
  PropertyService,
  SeverityService,
  TicketService,
  TicketStatusService,
  UserService,
} from "../services";
export async function createTicketObject(
  userId: number,
  ticketReq: TicketCreateReq | TicketUpdateReq,
  ticketId?: number | undefined
): Promise<Ticket> {
  const userService = new UserService();
  const ticketStatusService = new TicketStatusService();
  const ticketService = new TicketService();

  let ticket = new Ticket();
  if (ticketReq instanceof TicketUpdateReq) {
    ticket = await ticketService.getTicketById(ticketId!);
  }

  const user = await userService.getUserById(userId);

  const status =
    (await ticketStatusService.getById(ticketReq.statusId!)) ?? ticket.status;

  const severityService = new SeverityService();
  const severity =
    (await severityService.getById(ticketReq.severityId!)) ?? ticket.severity;

  const propertyService = new PropertyService();
  const property =
    (await propertyService.getById(ticketReq.propertyId!)) ?? ticket.property;

  ticket.title = ticketReq.title ?? ticket.title;
  ticket.content = ticketReq.content ?? ticket.content;
  ticket.user = user;
  ticket.severity = severity;
  ticket.property = property;
  ticket.status = status;

  return ticket;
}
