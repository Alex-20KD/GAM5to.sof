import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Adopcion } from "./adopcion";

@Entity()
export class Mascota {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  especie!: string;

  @OneToMany(() => Adopcion, (adopcion) => adopcion.mascota)
  adopciones!: Adopcion[];
  fechasAdopcion: any;
}
