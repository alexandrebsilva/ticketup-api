import { getRepository, Repository } from "typeorm";
import { TicketStatus } from "../entities";

export class TicketStatusService {
  private ticketStatusRepository: Repository<TicketStatus>;

  constructor() {
    this.ticketStatusRepository = getRepository(TicketStatus);
  }

  public async getById(id: number): Promise<TicketStatus> {
    return await this.ticketStatusRepository.findOneOrFail(id);
  }

  public async getAll() {
    return this.ticketStatusRepository.find();
  }
}
