import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Role } from "./role";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  phone!: string;

  @ManyToOne((type) => Role, (role) => role.users)
  role!: string;

  @Column()
  birthdate!: Date;
}
