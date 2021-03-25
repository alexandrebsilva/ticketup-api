import { getRepository, Repository } from "typeorm";
import { PropertyType } from "../entities";

export class PropertyTypeService {
  private propertyTypeRepository: Repository<PropertyType>;

  constructor() {
    this.propertyTypeRepository = getRepository(PropertyType);
  }

  public async getById(id: number): Promise<PropertyType> {
    return await this.propertyTypeRepository.findOneOrFail(id);
  }

  public async getAll() {
    return this.propertyTypeRepository.findAndCount();
  }
}
