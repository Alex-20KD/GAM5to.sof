import { Request, Response } from 'express';

export const getSolicitudes = (req: Request, res: Response) => {
  res.json({ message: 'Obtener todas las solicitudes de adopción' });
};

export const getSolicitudById = (req: Request, res: Response) => {
  res.json({ message: `Obtener solicitud con ID: ${req.params.id}` });
};

export const createSolicitud = (req: Request, res: Response) => {
  res.json({ message: 'Crear nueva solicitud de adopción', data: req.body });
};

export const updateSolicitud = (req: Request, res: Response) => {
  res.json({ message: `Actualizar solicitud con ID: ${req.params.id}`, data: req.body });
};

export const deleteSolicitud = (req: Request, res: Response) => {
  res.json({ message: `Eliminar solicitud con ID: ${req.params.id}` });
};
