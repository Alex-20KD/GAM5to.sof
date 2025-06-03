import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Adoptante } from "./models/adoptante";
import { Mascota } from "./models/mascota";
import { Adopcion } from "./models/adopcion";

async function initializeDatabase() {
  try {
    // Inicializa la conexión a PostgreSQL
    await AppDataSource.initialize();
    console.log("Base de datos conectada");

    // Sincroniza las entidades (crea tablas si no existen)
    await AppDataSource.synchronize();
    console.log("Tablas sincronizadas");

    // Ejemplo: Crear datos iniciales
    await seedDatabase();
  } catch (error) {
    console.error("Error al iniciar la base de datos:", error);
  }
}

// Función de ejemplo para poblar la base de datos
async function seedDatabase() {
  const adoptanteRepo = AppDataSource.getRepository(Adoptante);
  const mascotaRepo = AppDataSource.getRepository(Mascota);
  const fechaRepo = AppDataSource.getRepository(Adopcion);

  // Crear un adoptante
  const adoptante = new Adoptante();
  adoptante.nombre = "Karlo Bello";
  await adoptanteRepo.save(adoptante);

  // Crear una mascota
  const mascota = new Mascota();
  mascota.nombre = "Sofi";
  mascota.especie = "Perro";
  await mascotaRepo.save(mascota);

  // Registrar fecha de adopción
  const fechaAdopcion = new Adopcion();
  fechaAdopcion.fecha = new Date();
  fechaAdopcion.adoptante = adoptante;
  fechaAdopcion.mascota = mascota;
  await fechaRepo.save(fechaAdopcion);

  console.log("Datos iniciales creados:");
  console.log({ adoptante, mascota, fechaAdopcion });
}

// Ejecutar la inicialización
initializeDatabase();