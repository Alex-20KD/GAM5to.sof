import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Adoptante } from "./Adoptante";

@Entity()
export class Entrevista {
@PrimaryGeneratedColumn()
id!: number;

@ManyToOne(() => Adoptante, (adoptante) => adoptante.entrevistas)
adoptante!: Adoptante;

@Column({ type: 'date' })
fecha!: Date;

@Column()
evaluador!: string;

@Column()
resultado!: string; // Aprobado / Rechazado / En Observación

@Column({ type: 'text', nullable: true })
notas?: string;
}