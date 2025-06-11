import { AppDataSource } from "../database/data-source";
import { Mascota } from "../models/Mascota";
import { Adoptante } from "../models/Adoptante";
import { SolicitudAdopcion } from "../models/Solicitud_Adopcion";
import { AcuerdoAdopcion } from "../models/Acuerdo_Adopcion";

export async function crearAdopcionCompleta() {
  
// Crear o buscar un adoptante
const adoptante = new Adoptante();
adoptante.nombre = "Fabiana Parra";
adoptante.correo = "Fabiana@example.com";
adoptante.telefono = "0999988888";
await AppDataSource.manager.save(adoptante);

// Crear mascota
const mascota = new Mascota();
mascota.nombre = "Sissy";
mascota.especie = "Gato";
mascota.edad = 2;
mascota.sexo = "Hembra";
await AppDataSource.manager.save(mascota);

// Crear solicitud de adopción
const solicitud = new SolicitudAdopcion();
solicitud.adoptante = adoptante;
solicitud.mascota = mascota;
solicitud.fecha_solicitud = new Date();
solicitud.estado = "Pendiente";
await AppDataSource.manager.save(solicitud);

// Crear acuerdo (temporal o permanente)
const acuerdo = new AcuerdoAdopcion();
acuerdo.solicitud = solicitud;
acuerdo.tipo = "Temporal"; // o "Permanente"
acuerdo.duracion_dias = 30;
acuerdo.condiciones = "Debe realizar control veterinario quincenal.";
await AppDataSource.manager.save(acuerdo);

console.log("Adopción creada con éxito");
}

export async function listarSolicitudesConMascotaYAdoptante() {
const solicitudes = await AppDataSource.getRepository(SolicitudAdopcion).find({
relations: ["adoptante", "mascota", "acuerdoAdopcion"]
});
return solicitudes;
}