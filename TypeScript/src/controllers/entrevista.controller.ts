import { Request, Response } from 'express';

export const getEntrevistas = (req: Request, res: Response) => {
  res.json({ message: 'Obtener todas las entrevistas' });
};

export const getEntrevistaById = (req: Request, res: Response) => {
  res.json({ message: `Obtener entrevista con ID: ${req.params.id}` });
};

export const createEntrevista = (req: Request, res: Response) => {
  res.json({ message: 'Crear nueva entrevista', data: req.body });
};

export const updateEntrevista = (req: Request, res: Response) => {
  res.json({ message: `Actualizar entrevista con ID: ${req.params.id}`, data: req.body });
};

export const deleteEntrevista = (req: Request, res: Response) => {
  res.json({ message: `Eliminar entrevista con ID: ${req.params.id}` });
};
