import { getRepository, Repository } from "typeorm";
import { Property } from "../entities";

export class PropertyService {
  private ticketStatusRepository: Repository<Property>;

  constructor() {
    this.ticketStatusRepository = getRepository(Property);
  }

  public async getById(id: number): Promise<Property> {
    return await this.ticketStatusRepository.findOneOrFail(id);
  }

  public async getAll() {
    return this.ticketStatusRepository.find();
  }
}
