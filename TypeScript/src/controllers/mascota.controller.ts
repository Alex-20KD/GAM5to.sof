import { Request, Response } from 'express';

export const getMascotas = (req: Request, res: Response) => {
  res.json({ message: 'Obtener todas las mascotas' });
};

export const getMascotaById = (req: Request, res: Response) => {
  res.json({ message: `Obtener mascota con ID: ${req.params.id}` });
};

export const createMascota = (req: Request, res: Response) => {
  res.json({ message: 'Crear nueva mascota', data: req.body });
};

export const updateMascota = (req: Request, res: Response) => {
  res.json({ message: `Actualizar mascota con ID: ${req.params.id}`, data: req.body });
};

export const deleteMascota = (req: Request, res: Response) => {
  res.json({ message: `Eliminar mascota con ID: ${req.params.id}` });
};
