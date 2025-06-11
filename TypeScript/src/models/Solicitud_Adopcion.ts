import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Adoptante } from "./Adoptante";
import { Mascota } from "./Mascota";
import { AcuerdoAdopcion } from "./Acuerdo_Adopcion";

@Entity()
export class SolicitudAdopcion {
@PrimaryGeneratedColumn()
id!: number;

@ManyToOne(() => Adoptante, (adoptante) => adoptante.solicitudes)
adoptante!: Adoptante;

@ManyToOne(() => Mascota, (mascota) => mascota.solicitudes)
mascota!: Mascota;

@Column({ type: "date" })
fecha_solicitud!: Date;

@Column()
estado!: string;

@Column()
tipo_adopcion!: string; // Temporal / Permanente

@Column({ type: 'text', nullable: true })
comentarios?: string;

@OneToOne(() => AcuerdoAdopcion, (acuerdo) => acuerdo.solicitud)
acuerdo!: AcuerdoAdopcion;
}