import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Adoptante } from "./Adoptante";
import { SolicitudAdopcion } from "./Solicitud_Adopcion";

@Entity()
export class Mascota {
@PrimaryGeneratedColumn()
id!: number;

@Column()
nombre!: string;

@Column()
especie!: string;

@Column()
raza!: string;

@Column()
edad!: number;

@Column()
sexo!: string;

@Column()
color!: string;

@Column({ type: 'date' })
fecha_ingreso!: Date;

@Column()
estado_adopcion!: string; // Disponible / Adoptado / En Prueba

@Column()
tipo_adopcion!: string; // Temporal / Permanente

@ManyToOne(() => Adoptante, (adoptante) => adoptante.mascotas, { nullable: true })
adoptante?: Adoptante;

@OneToMany(() => SolicitudAdopcion, (solicitud) => solicitud.mascota)
solicitudes!: SolicitudAdopcion[];
}