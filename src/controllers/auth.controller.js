import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export async function register(req, res, next) {
  try {
    const { email, password, name } = req.body;
    // Encriptamos la contraseña (Seguridad)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    const user = await User.create({ email, password: passwordHash, name });
    res.status(201).json({ id: user._id, email: user.email });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Email ya registrado' });
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(401).json({ error: 'Credenciales incorrectas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Credenciales incorrectas' });

    // Generamos el Token JWT
    const token = jwt.sign(
      { sub: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.json({ token, user: { email: user.email, role: user.role } });
  } catch (err) { next(err); }
}