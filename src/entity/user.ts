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

  @Column({ nullable: true })
  cpf?: string;

  @Column({ nullable: true })
  refresh_token?: string;

  @Column({ nullable: true })
  refresh_token_version?: number;

  @Column({ length: 2, nullable: true })
  dddPhone!: string;

  @Column({ length: 9, nullable: true })
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
