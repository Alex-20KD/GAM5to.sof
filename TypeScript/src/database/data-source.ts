import "reflect-metadata";
import { DataSource } from "typeorm";
import { Adoptante } from "../models/Adoptante";
import { Mascota } from "../models/Mascota";
import { SolicitudAdopcion } from "../models/Solicitud_Adopcion";
import { AcuerdoAdopcion } from "../models/Acuerdo_Adopcion";
import { Entrevista } from "../models/Entrevista";

// Puedes usar dotenv para cargar variables de entorno desde un archivo .env
// import dotenv from "dotenv";
// dotenv.config();

export const AppDataSource = new DataSource({
type: "postgres",
host: "localhost",
port: 5432,
username: "postgres", // ← Poner usuario real de PostgreSQL
password: "admin123", // ← Poner contraseña real
database: "", // ← aun no tengo base de datos en PostgreSQL
synchronize: true, 
logging: true,
entities: [
Adoptante,
Mascota,
SolicitudAdopcion,
AcuerdoAdopcion,
Entrevista
],
migrations: [],
subscribers: [],
});