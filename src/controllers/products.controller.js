import { Product } from '../models/product.model.js';

export const list = async (req, res) => res.json(await Product.find().populate('categoryId', 'name'));
export const getById = async (req, res) => {
  const p = await Product.findById(req.params.id);
  p ? res.json(p) : res.status(404).json({ error: 'No encontrado' });
};
export const create = async (req, res) => {
  try { res.status(201).json(await Product.create(req.body)); }
  catch (err) { res.status(422).json({ error: err.message }); }
};
export const update = async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  p ? res.json(p) : res.status(404).json({ error: 'No encontrado' });
};
export const remove = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).send();
};