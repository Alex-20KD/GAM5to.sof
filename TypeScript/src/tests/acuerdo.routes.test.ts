import request from "supertest";
import app from "../app";

describe("📍 Rutas de Acuerdos de Adopción", () => {
  it("GET /api/acuerdos - debería devolver un array", async () => {
    const res = await request(app).get("/api/acuerdos");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
