import { Router } from 'express';
import {
  create,
  getAll,
  update,
  remove,
  search
} from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/authmiddleware.js';

const router = Router();

router.post('/', authMiddleware, create);
router.get('/', authMiddleware, getAll);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, remove);
router.get('/search', authMiddleware, search);

export default router;
