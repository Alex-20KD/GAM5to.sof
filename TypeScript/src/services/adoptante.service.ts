import { AppDataSource } from "../database/data-source";
import { Adoptante } from "../models/Adoptante";

const adoptanteRepo = AppDataSource.getRepository(Adoptante);

export const findAllAdoptantes = () => adoptanteRepo.find();

export const findAdoptanteById = (id: number) =>
  adoptanteRepo.findOneBy({ id });

export const createAdoptante = (data: Partial<Adoptante>) =>
  adoptanteRepo.save(adoptanteRepo.create(data));

export const updateAdoptante = async (id: number, data: Partial<Adoptante>) => {
  await adoptanteRepo.update(id, data);
  return adoptanteRepo.findOneBy({ id });
};

export const deleteAdoptante = async (id: number) => {
  const adoptante = await adoptanteRepo.findOneBy({ id });
  if (adoptante) {
    await adoptanteRepo.remove(adoptante);
    return true;
  }
  return false;
};
