import { Property } from "../entities";
import { PropertyCreateReq } from "../models/properties";
import { PropertyTypeService, UserService } from "../services";

export async function createPropertyObject(
  propertyReq: PropertyCreateReq
  // propertyId?: number | undefined
): Promise<Property> {
  let property = new Property();

  const propertyTypeService = new PropertyTypeService();
  const propertyType = await propertyTypeService.getById(
    propertyReq.propertyTypeId
  );

  const userService = new UserService();
  const user = await userService.getUserById(propertyReq.userId);

  property.name = propertyReq.name;
  property.description = propertyReq.description;
  property.uf = propertyReq.uf;
  property.zipcode = propertyReq.zipcode;
  property.number = propertyReq.number;
  property.address = propertyReq.address;

  return { ...property, user, propertyType };
}
