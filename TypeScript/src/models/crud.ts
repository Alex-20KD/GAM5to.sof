import { AppDataSource } from "../data-source";
import { Mascota } from "./mascota";
import { Adopcion } from "./adopcion";

export async function crearAdopcion() {
  const mascota = new Mascota();
  mascota.nombre = "Sissy";
  mascota.especie = "Gato";

  const adopcion = new Adopcion();
  adopcion.tipo = "Definitiva";  // O "Temporal", según se requiera
  adopcion.fecha = new Date();
  adopcion.mascota = mascota;

  await AppDataSource.manager.save(mascota);
  await AppDataSource.manager.save(adopcion);
}

export async function listarAdopciones() {
  return await AppDataSource.manager.find(Adopcion, {
    relations: ["mascota"],
  });
}
