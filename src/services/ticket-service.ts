import { getRepository, Repository } from "typeorm";
import { Ticket } from "../entities";
import { TicketUpdateReq } from "../models";

export class TicketService {
  private ticketRepository: Repository<Ticket>;

  constructor() {
    this.ticketRepository = getRepository(Ticket);
  }

  public async getTicketById(id: number): Promise<Ticket> {
    return this.ticketRepository.findOneOrFail(id, {
      relations: ["property", "severity", "status"],
    });
  }

  public async getTicketByUserId(userId: number): Promise<[Ticket[], number]> {
    return this.ticketRepository.findAndCount({
      where: { user: userId },
      relations: ["property", "severity", "status"],
    });
  }

  public async getAll(): Promise<[Ticket[], number]> {
    return this.ticketRepository.findAndCount();
  }

  public async create(ticket: Ticket): Promise<void> {
    await this.ticketRepository.insert(ticket);
  }

  public async update(id: number, ticket: TicketUpdateReq): Promise<void> {
    await this.ticketRepository.update(id, ticket);
  }
}
