import jwt from 'jsonwebtoken';
import { config } from '../config.js';
export function requireAdmin(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  try { req.admin = jwt.verify(token, config.jwtSecret);
    if (req.admin.role !== 'admin') throw new Error('forbidden'); next();
  } catch { res.status(401).json({ error: 'No autorizado' }); }
}
