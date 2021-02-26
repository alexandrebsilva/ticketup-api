import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { BaseEntity } from "./base";
import { Property } from "./property";
import { Role } from "./role";
import { Ticket } from "./ticket";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ nullable: true })
  birthdate!: Date;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column({ default: false })
  confirmedAccount!: boolean;

  @Column({ default: false })
  isActive!: boolean;

  @Column()
  password!: string;

  @ManyToOne((type) => Role, (role) => role.users)
  role!: Role;

  @OneToMany((type) => Property, (properties) => properties.user)
  properties!: Property[];

  @OneToMany((type) => Ticket, (ticket) => ticket.user)
  tickets!: Ticket[];
}
