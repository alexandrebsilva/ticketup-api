import { getRepository, Repository } from "typeorm";
import { Ticket } from "../entities";
import { Severity, SeverityId } from "../entities";
import { TicketCreateReq } from "../models";

export class TicketService {
  private ticketRepository: Repository<Ticket>;

  constructor() {
    this.ticketRepository = getRepository(Ticket);
  }

  public async getTicketById(id: number): Promise<Ticket> {
    return await this.ticketRepository.findOneOrFail(id);
  }

  public async getAll() {
    return this.ticketRepository.find();
  }

  public async create(ticket: Ticket): Promise<void> {
    await this.ticketRepository.insert(ticket);
  }
}
