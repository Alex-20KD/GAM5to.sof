import { AppDataSource } from "../database/data-source";
import { Mascota } from "../models/Mascota";

const mascotaRepo = AppDataSource.getRepository(Mascota);

export const findAllMascotas = () => mascotaRepo.find();

export const findMascotaById = (id: number) =>
  mascotaRepo.findOneBy({ id });

export const createMascota = (data: Partial<Mascota>) =>
  mascotaRepo.save(mascotaRepo.create(data));

export const updateMascota = async (id: number, data: Partial<Mascota>) => {
  await mascotaRepo.update(id, data);
  return mascotaRepo.findOneBy({ id });
};

export const deleteMascota = async (id: number) => {
  const mascota = await mascotaRepo.findOneBy({ id });
  if (mascota) {
    await mascotaRepo.remove(mascota);
    return true;
  }
  return false;
};
