import { Router } from 'express';
import {
  getAcuerdos,
  getAcuerdoById,
  createAcuerdo,
  updateAcuerdo,
  deleteAcuerdo,
} from '../controllers/acuerdo_adopcion.controller';

const router = Router();

router.get('/', getAcuerdos);
router.get('/:id', getAcuerdoById);
router.post('/', createAcuerdo);
router.put('/:id', updateAcuerdo);
router.delete('/:id', deleteAcuerdo);

export default router;
