import { Router } from 'express';
import {
  getAdoptantes,
  getAdoptanteById,
  createAdoptante,
  updateAdoptante,
  deleteAdoptante,
} from '../controllers/adoptante.controller';

const router = Router();

router.get('/', getAdoptantes);
router.get('/:id', getAdoptanteById);
router.post('/', createAdoptante);
router.put('/:id', updateAdoptante);
router.delete('/:id', deleteAdoptante);

export default router;
