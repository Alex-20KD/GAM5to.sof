import request from "supertest";
import app from "../app";

describe("📍 Rutas de Mascotas", () => {
  it("GET /api/mascotas - debería devolver un array", async () => {
    const res = await request(app).get("/api/mascotas");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /api/mascotas - debería crear una mascota", async () => {
    const nuevaMascota = {
      nombre: "Simba",
      especie: "Perro",
      raza: "dalmata",
      edad: 4,
      sexo: "Macho",
      color: "Negro con blanco",
      fecha_ingreso: new Date().toISOString(),
    };

    const res = await request(app)
      .post("/api/mascotas")
      .send(nuevaMascota);

    expect(res.statusCode).toBe(201);
    expect(res.body.nombre).toBe("Simba");
  });
});
