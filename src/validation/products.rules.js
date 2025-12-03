import { body, param, query } from 'express-validator';

export const listQueryRules = [
  query('q').optional().isString(),
  query('active').optional().isBoolean().toBoolean(),
  query('minPrice').optional().isFloat({ min: 0 }).toFloat(),
  query('maxPrice').optional().isFloat({ min: 0 }).toFloat()
];

export const productCreateRules = [
  body('name').isString().trim().notEmpty().withMessage('name requerit'),
  body('sku').optional().isString().trim(),
  body('price').isFloat({ min: 0 }).withMessage('price >= 0'),
  body('stock').isInt({ min: 0 }).withMessage('stock >= 0'),
  body('active').optional().isBoolean()
];

export const productUpdateRules = [
  param('id').isString().notEmpty(),
  body('name').optional().isString().trim().notEmpty(),
  body('sku').optional().isString().trim(),
  body('price').optional().isFloat({ min: 0 }),
  body('stock').optional().isInt({ min: 0 }),
  body('active').optional().isBoolean()
];

export const productStockRules = [
  param('id').isString().notEmpty(),
  body('delta').isInt().withMessage('delta integer (positiu o negatiu)')
];
