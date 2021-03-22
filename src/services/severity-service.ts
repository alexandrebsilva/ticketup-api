import { getRepository, Repository } from "typeorm";
import { Severity } from "../entities";

export class SeverityService {
  private ticketStatusRepository: Repository<Severity>;

  constructor() {
    this.ticketStatusRepository = getRepository(Severity);
  }

  public async getById(id: number): Promise<Severity> {
    return await this.ticketStatusRepository.findOneOrFail(id);
  }

  public async getAll() {
    return this.ticketStatusRepository.find();
  }
}
