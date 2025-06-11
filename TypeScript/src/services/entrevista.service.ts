import { AppDataSource } from "../database/data-source";
import { Entrevista } from "../models/Entrevista";

const entrevistaRepo = AppDataSource.getRepository(Entrevista);

export const findAllEntrevistas = () => entrevistaRepo.find();

export const findEntrevistaById = (id: number) =>
  entrevistaRepo.findOneBy({ id });

export const createEntrevista = (data: Partial<Entrevista>) =>
  entrevistaRepo.save(entrevistaRepo.create(data));

export const updateEntrevista = async (id: number, data: Partial<Entrevista>) => {
  await entrevistaRepo.update(id, data);
  return entrevistaRepo.findOneBy({ id });
};

export const deleteEntrevista = async (id: number) => {
  const entrevista = await entrevistaRepo.findOneBy({ id });
  if (entrevista) {
    await entrevistaRepo.remove(entrevista);
    return true;
  }
  return false;
};
