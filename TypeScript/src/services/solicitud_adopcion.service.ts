import { AppDataSource } from "../database/data-source";
import { SolicitudAdopcion } from "../models/Solicitud_Adopcion";

const solicitudRepo = AppDataSource.getRepository(SolicitudAdopcion);

export const findAllSolicitudes = () => solicitudRepo.find({
  relations: ["adoptante", "mascota"]
});

export const findSolicitudById = (id: number) =>
  solicitudRepo.findOne({
    where: { id },
    relations: ["adoptante", "mascota"]
  });

export const createSolicitud = (data: Partial<SolicitudAdopcion>) =>
  solicitudRepo.save(solicitudRepo.create(data));

export const updateSolicitud = async (id: number, data: Partial<SolicitudAdopcion>) => {
  await solicitudRepo.update(id, data);
  return solicitudRepo.findOneBy({ id });
};

export const deleteSolicitud = async (id: number) => {
  const solicitud = await solicitudRepo.findOneBy({ id });
  if (solicitud) {
    await solicitudRepo.remove(solicitud);
    return true;
  }
  return false;
};
