import { Router } from 'express';
import * as ctrl from '../controllers/suppliers.controller.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);
router.post('/', requireAuth, ctrl.create);
router.put('/:id', requireAuth, ctrl.update);
router.delete('/:id', requireAuth, ctrl.remove);

export default router;