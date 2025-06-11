import { Request, Response } from 'express';

export const getAcuerdos = (req: Request, res: Response) => {
  res.json({ message: 'Obtener todos los acuerdos de adopción' });
};

export const getAcuerdoById = (req: Request, res: Response) => {
  res.json({ message: `Obtener acuerdo con ID: ${req.params.id}` });
};

export const createAcuerdo = (req: Request, res: Response) => {
  res.json({ message: 'Crear nuevo acuerdo de adopción', data: req.body });
};

export const updateAcuerdo = (req: Request, res: Response) => {
  res.json({ message: `Actualizar acuerdo con ID: ${req.params.id}`, data: req.body });
};

export const deleteAcuerdo = (req: Request, res: Response) => {
  res.json({ message: `Eliminar acuerdo con ID: ${req.params.id}` });
};
