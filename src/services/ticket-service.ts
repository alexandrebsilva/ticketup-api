import { getRepository, Repository } from "typeorm";
import { Ticket } from "../entities";

export class TicketService {
  private ticketRepository: Repository<Ticket>;

  constructor() {
    this.ticketRepository = getRepository(Ticket);
  }

  public async getTicketById(id: number): Promise<Ticket> {
    return await this.ticketRepository.findOneOrFail(id);
  }

  public async getTicketByUserId(userId: number): Promise<[Ticket[], number]> {
    return await this.ticketRepository.findAndCount({
      where: { user: userId },
      relations: ["property", "severity", "status"],
    });
  }

  public async getAll() {
    return this.ticketRepository.find();
  }

  public async create(ticket: Ticket): Promise<void> {
    await this.ticketRepository.insert(ticket);
  }
}
