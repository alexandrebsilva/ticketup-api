import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base";
import { Ticket } from "./ticket";

export enum SeverityId {
  unknown = 1,
  low,
  medium,
  high,
  critical,
}
@Entity({ name: "severities" })
export class Severity extends BaseEntity {
  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany((type) => Ticket, (ticket) => ticket.severity)
  tickets?: Ticket[];
}
