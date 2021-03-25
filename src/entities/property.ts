import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BaseEntity } from "./base";
import { PropertyType } from "./property-type";
import { Ticket } from "./ticket";
import { User } from "./user";

@Entity({ name: "properties" })
export class Property extends BaseEntity {
  @Column({ nullable: false })
  uf!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  neighborhood?: string;

  @Column()
  zipcode!: string;

  @Column()
  address!: string;

  @Column({ nullable: true })
  detail!: string;

  @Column({ nullable: true })
  number?: string;

  @ManyToOne((type) => User, (user) => user.id, {
    cascade: true,
    nullable: false,
  })
  user?: User;

  @ManyToOne(
    (type) => PropertyType,
    (propertyType) => propertyType.properties,
    { nullable: false }
  )
  propertyType?: PropertyType;

  @OneToMany((type) => Ticket, (ticket) => ticket.property)
  tickets?: Ticket[];
}
