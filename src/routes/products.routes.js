import { Router } from 'express';
import * as controller from '../controllers/products.controller.memory.js';
import { listQueryRules, productCreateRules, productStockRules, productUpdateRules } from '../validation/products.rules.js';
import { validationResult } from 'express-validator';

const router = Router();

const validate = (rules) => [
  ...rules,
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(422).json({ errors: result.array() });
    next();
  }
];

router.get('/', validate(listQueryRules), controller.list);
router.get('/:id', controller.getById);
router.post('/', validate(productCreateRules), controller.create);
router.put('/:id', validate(productUpdateRules), controller.update);
router.patch('/:id/stock', validate(productStockRules), controller.adjustStock);
router.delete('/:id', controller.remove);

export default router;