import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Mascota } from "./mascota";
import { Adoptante } from "./adoptante";

@Entity()
export class Adopcion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tipo!: string;

  @Column()
  fecha!: Date;

  @ManyToOne(() => Mascota, (mascota) => mascota.fechasAdopcion)
  mascota!: Mascota;

  @ManyToOne(() => Adoptante, (adoptante) => adoptante.fechasAdopcion)
  adoptante!: Adoptante;

}