import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base";
import { Property } from "./property";
import { User } from "./user";

@Entity({ name: "property_types" })
export class PropertyType extends BaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany((type) => Property, (property) => property.propertyType)
  properties?: Property[];
}
