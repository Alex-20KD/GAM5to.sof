import { Request, Response } from 'express';

export const getAdoptantes = (req: Request, res: Response) => {
  res.json({ message: 'Obtener todos los adoptantes' });
};

export const getAdoptanteById = (req: Request, res: Response) => {
  res.json({ message: `Obtener adoptante con ID: ${req.params.id}` });
};

export const createAdoptante = (req: Request, res: Response) => {
  res.json({ message: 'Crear nuevo adoptante', data: req.body });
};

export const updateAdoptante = (req: Request, res: Response) => {
  res.json({ message: `Actualizar adoptante con ID: ${req.params.id}`, data: req.body });
};

export const deleteAdoptante = (req: Request, res: Response) => {
  res.json({ message: `Eliminar adoptante con ID: ${req.params.id}` });
};
