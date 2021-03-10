import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base";
import { User } from "./user";

@Entity({ name: "roles" })
export class Role extends BaseEntity {
  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany((type) => User, (user) => user.role)
  users?: User[];
}
