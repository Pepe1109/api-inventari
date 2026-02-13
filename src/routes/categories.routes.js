import { Router } from 'express';
import * as ctrl from '../controllers/categories.controller.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);
// Protegidas (Solo con Token)
router.post('/', requireAuth, ctrl.create);
router.put('/:id', requireAuth, ctrl.update);
router.delete('/:id', requireAuth, ctrl.remove);

export default router;