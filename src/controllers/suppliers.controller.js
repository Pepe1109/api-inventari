import { Supplier } from '../models/supplier.model.js';

export const list = async (req, res, next) => {
  try { res.json(await Supplier.find().lean()); } catch (err) { next(err); }
};
export const getById = async (req, res, next) => {
  try {
    const item = await Supplier.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ error: 'No trobat' });
    res.json(item);
  } catch (err) { next(err); }
};
export const create = async (req, res, next) => {
  try { res.status(201).json(await Supplier.create(req.body)); } 
  catch (err) { res.status(422).json({ error: err.message }); }
};
export const update = async (req, res, next) => {
  try {
    const item = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'No trobat' });
    res.json(item);
  } catch (err) { next(err); }
};
export const remove = async (req, res, next) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};