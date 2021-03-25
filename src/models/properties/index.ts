import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { getUfs } from "../../helpers/uf";
export class PropertyCreateReq {
  @IsNotEmpty()
  @IsIn(getUfs())
  uf!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  neighborhood?: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  zipcode!: string;

  @IsNotEmpty()
  @IsString()
  address!: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsNotEmpty()
  @IsIn([1, 2, 3])
  propertyTypeId!: number;

  @IsNotEmpty()
  @IsNumber()
  userId!: number;
}
