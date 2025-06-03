import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Adopcion } from "./adopcion";

@Entity()
export class Adoptante {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  fecha!: Date;

  @OneToMany(() => Adopcion, (fecha) => fecha.adoptante)
  fechasAdopcion!: Adopcion[];
}