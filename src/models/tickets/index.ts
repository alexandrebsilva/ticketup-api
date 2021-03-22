import { IsString, IsNumber, IsIn, IsNotEmpty } from "class-validator";

export class TicketCreateReq {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  content!: string;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([1, 2, 3, 4, 5])
  severityId!: number;

  @IsNotEmpty()
  @IsNumber()
  propertyId!: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([1, 2, 3, 4, 5])
  statusId!: number;
}
