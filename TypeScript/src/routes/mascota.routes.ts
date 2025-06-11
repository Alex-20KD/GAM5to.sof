import { Router } from 'express';
import {
  getMascotas,
  getMascotaById,
  createMascota,
  updateMascota,
  deleteMascota,
} from '../controllers/mascota.controller';

const router = Router();

router.get('/', getMascotas);
router.get('/:id', getMascotaById);
router.post('/', createMascota);
router.put('/:id', updateMascota);
router.delete('/:id', deleteMascota);

export default router;

