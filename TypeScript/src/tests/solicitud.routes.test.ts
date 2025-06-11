import request from "supertest";
import app from "../app";

describe("📍 Rutas de Solicitudes de Adopción", () => {
  it("GET /api/solicitudes - debería devolver un array", async () => {
    const res = await request(app).get("/api/solicitudes");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
