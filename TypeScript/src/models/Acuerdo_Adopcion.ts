import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { SolicitudAdopcion } from "./Solicitud_Adopcion";

@Entity()
export class AcuerdoAdopcion {
@PrimaryGeneratedColumn()
id!: number;

@OneToOne(() => SolicitudAdopcion, (solicitud) => solicitud.acuerdo)
@JoinColumn()
solicitud!: SolicitudAdopcion;

@Column()
tipo_acuerdo!: string; // Temporal / Permanente

@Column({ nullable: true })
duracion_meses?: number;

@Column({ type: 'date' })
fecha_inicio!: Date;

@Column({ type: 'date', nullable: true })
fecha_final?: Date;

@Column({ type: 'text', nullable: true })
condiciones?: string;
  duracion_dias: number | undefined;
  tipo: string | undefined;
}