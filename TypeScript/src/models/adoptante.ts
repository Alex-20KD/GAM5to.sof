import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SolicitudAdopcion } from "./Solicitud_Adopcion";
import { Entrevista } from "./Entrevista";
import { Mascota } from "./Mascota";

@Entity()
export class Adoptante {
@PrimaryGeneratedColumn()
id!: number;

@Column()
nombre!: string;

@Column()
correo!: string;

@Column()
telefono!: string;

@Column()
direccion!: string;

@Column()
tipo_documento!: string;

@Column()
numero_documento!: string;

@Column({ type: 'date' })
fecha_registro!: Date;

@Column()
estado!: string;

@OneToMany(() => SolicitudAdopcion, (solicitud) => solicitud.adoptante)
solicitudes!: SolicitudAdopcion[];

@OneToMany(() => Entrevista, (entrevista) => entrevista.adoptante)
entrevistas!: Entrevista[];

@OneToMany(() => Mascota, (mascota) => mascota.adoptante)
mascotas!: Mascota[];
}