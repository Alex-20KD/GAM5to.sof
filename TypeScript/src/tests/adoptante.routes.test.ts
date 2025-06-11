import request from "supertest";
import app from "../app";

describe("📍 Rutas de Adoptantes", () => {
  it("GET /api/adoptantes - debería devolver un array", async () => {
    const res = await request(app).get("/api/adoptantes");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /api/adoptantes - debería crear un adoptante", async () => {
    const nuevoAdoptante = {
      nombre: "Kristhian test",
      correo: "test@example.com",
      telefono: "0991234567",
      direccion: "Test City",
    };

    const res = await request(app)
      .post("/api/adoptantes")
      .send(nuevoAdoptante);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.nombre).toBe("Kristhian test");
  });
});
