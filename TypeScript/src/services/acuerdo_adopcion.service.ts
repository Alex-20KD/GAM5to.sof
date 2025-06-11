import { AppDataSource } from "../database/data-source";
import { AcuerdoAdopcion } from "../models/Acuerdo_Adopcion";

const acuerdoRepo = AppDataSource.getRepository(AcuerdoAdopcion);

export const findAllAcuerdos = () => acuerdoRepo.find({
  relations: ["solicitud"]
});

export const findAcuerdoById = (id: number) =>
  acuerdoRepo.findOne({
    where: { id },
    relations: ["solicitud"]
  });

export const createAcuerdo = (data: Partial<AcuerdoAdopcion>) =>
  acuerdoRepo.save(acuerdoRepo.create(data));

export const updateAcuerdo = async (id: number, data: Partial<AcuerdoAdopcion>) => {
  await acuerdoRepo.update(id, data);
  return acuerdoRepo.findOneBy({ id });
};

export const deleteAcuerdo = async (id: number) => {
  const acuerdo = await acuerdoRepo.findOneBy({ id });
  if (acuerdo) {
    await acuerdoRepo.remove(acuerdo);
    return true;
  }
  return false;
};
