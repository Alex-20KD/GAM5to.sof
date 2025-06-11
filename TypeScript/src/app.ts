import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./database/data-source";
import { Adoptante } from "./models/Adoptante";
import { Mascota } from "./models/Mascota";
import { SolicitudAdopcion } from "./models/Solicitud_Adopcion";
import { AcuerdoAdopcion } from "./models/Acuerdo_Adopcion";

// Importación de rutas
import adoptanteRoutes from "./routes/adoptante.routes";
import mascotaRoutes from "./routes/mascota.routes";
import solicitudRoutes from "./routes/solicitud_adopcion.routes";
import acuerdoRoutes from "./routes/acuerdo_adopcion.routes";
import entrevistaRoutes from "./routes/entrevista.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/adoptantes", adoptanteRoutes);
app.use("/api/mascotas", mascotaRoutes);
app.use("/api/solicitudes", solicitudRoutes);
app.use("/api/acuerdos", acuerdoRoutes);
app.use("/api/entrevistas", entrevistaRoutes);

// Inicializar y poblar la base de datos
async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
    console.log("✅ Conectado a la base de datos");

    await AppDataSource.synchronize();
    console.log("✅ Tablas sincronizadas correctamente");

    await seedDatabase();
  } catch (error) {
    console.error("❌ Error al iniciar la base de datos:", error);
  }
}

async function seedDatabase() {
  const adoptanteRepo = AppDataSource.getRepository(Adoptante);
  const mascotaRepo = AppDataSource.getRepository(Mascota);
  const adopcionRepo = AppDataSource.getRepository(SolicitudAdopcion);
  const acuerdoRepo = AppDataSource.getRepository(AcuerdoAdopcion);

  const adoptante = adoptanteRepo.create({
    nombre: "Karlo Bello",
    correo: "karlo@example.com",
    telefono: "099999999",
    direccion: "Ciudad ULEAM",
  });
  await adoptanteRepo.save(adoptante);

  const mascota = mascotaRepo.create({
    nombre: "Sofi",
    especie: "Perro",
    raza: "Labrador",
    edad: 3,
    sexo: "Hembra",
    color: "Dorado",
    fecha_ingreso: new Date("2024-12-01"),
  });
  await mascotaRepo.save(mascota);

  const solicitud = adopcionRepo.create({
    adoptante,
    mascota,
    fecha_solicitud: new Date(),
    estado: "Pendiente",
  });
  await adopcionRepo.save(solicitud);

  const acuerdo = acuerdoRepo.create({
    solicitud,
    tipo: "Temporal",
    duracion_dias: 60,
    condiciones: "Seguimiento obligatorio cada 2 semanas.",
  });
  await acuerdoRepo.save(acuerdo);

  console.log("✅ Datos iniciales insertados:");
  console.table({ adoptante, mascota, solicitud, acuerdo });
}

initializeDatabase();

export default app;
