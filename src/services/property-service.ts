import { getRepository, Repository } from "typeorm";
import { Property } from "../entities";

export class PropertyService {
  private propertyRepository: Repository<Property>;

  constructor() {
    this.propertyRepository = getRepository(Property);
  }

  public async getById(id: number): Promise<Property> {
    return await this.propertyRepository.findOneOrFail(id, {
      relations: ["propertyType"],
    });
  }

  public async getAll() {
    return this.propertyRepository.findAndCount({
      relations: ["propertyType"],
    });
  }

  public async create(property: Property) {
    return this.propertyRepository.insert(property);
  }
}
