import { Router } from 'express';
import {
  getEntrevistas,
  getEntrevistaById,
  createEntrevista,
  updateEntrevista,
  deleteEntrevista,
} from '../controllers/entrevista.controller';

const router = Router();

router.get('/', getEntrevistas);
router.get('/:id', getEntrevistaById);
router.post('/', createEntrevista);
router.put('/:id', updateEntrevista);
router.delete('/:id', deleteEntrevista);

export default router;
