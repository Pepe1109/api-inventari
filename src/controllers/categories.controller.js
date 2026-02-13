import { Category } from '../models/category.model.js';

export const list = async (req, res, next) => {
  try {
    const data = await Category.find().sort({ name: 1 }).lean();
    res.json(data);
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const item = await Category.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json(item);
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const created = await Category.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    if (err.name === 'ValidationError') return res.status(422).json({ error: err.message });
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
    if (!updated) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json(updated);
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.status(204).send();
  } catch (err) { next(err); }
};