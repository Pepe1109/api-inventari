import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  contactEmail: { type: String, required: true, lowercase: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export const Supplier = mongoose.model('Supplier', supplierSchema);