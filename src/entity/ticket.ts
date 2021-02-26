import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "./base";
import { Property } from "./property";
import { Severity } from "./severity";
import { TicketStatus } from "./ticket-status";
import { User } from "./user";

@Entity({ name: "tickets" })
export class Ticket extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  content!: string;

  @ManyToOne((type) => Severity, (severity) => severity.tickets)
  severity!: Severity;

  @ManyToOne((type) => Property, (property) => property.tickets)
  property!: Property;

  @ManyToOne((type) => User, (user) => user.tickets)
  user!: User;

  @ManyToOne((type) => TicketStatus, (ticketStatus) => ticketStatus.tickets)
  status!: TicketStatus;
}
