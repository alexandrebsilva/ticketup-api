import {
  Param,
  Get,
  Authorized,
  JsonController,
  Post,
  Body,
  BadRequestError,
} from "routing-controllers";
import { createPropertyObject } from "../factories/property-factory";
import { PropertyCreateReq } from "../models/properties";
import { PropertyService } from "../services";

@JsonController("/property")
export class PropertyController {
  private propertyService;

  constructor() {
    this.propertyService = new PropertyService();
  }

  @Get("/all")
  @Authorized(["admin"])
  async getAll() {
    const [properties, count] = await this.propertyService.getAll();
    return { count, payload: properties };
  }

  @Get("/:id")
  @Authorized(["admin"])
  async getOne(@Param("id") id: number) {
    return this.propertyService.getById(id);
  }

  @Post("/")
  @Authorized(["admin"])
  async create(@Body({ validate: true }) req: PropertyCreateReq) {
    try {
      const property = await createPropertyObject(req);
      await this.propertyService.create(property);
      return property;
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }
}
