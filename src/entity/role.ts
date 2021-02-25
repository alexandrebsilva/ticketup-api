import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./user";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description?: string;

  @OneToMany((type) => User, (user) => user.role)
  users?: User[];
}
