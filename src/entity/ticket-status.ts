import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base";
import { Ticket } from "./ticket";

@Entity({ name: "ticket_status" })
export class TicketStatus extends BaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany((type) => Ticket, (ticket) => ticket.status)
  tickets!: Ticket[];
}
