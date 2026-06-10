import { Router } from 'express';
import { q } from '../db/pool.js';
import { config } from '../config.js';
export const account = Router();
account.post('/lookup', async (req, res) => {
  const { reference, email } = req.body;
  const { rows: [b] } = await q(
    `SELECT b.*, g.full_name, g.email, e.name AS experience FROM bookings b
       JOIN guests g ON g.id=b.guest_id JOIN experiences e ON e.id=b.experience_id
      WHERE b.reference=$1 AND lower(g.email)=lower($2)`, [reference, email]);
  if (!b) return res.status(404).json({ error: 'Reserva no encontrada' });
  const show = ['paid','confirmed','completed','rescheduled'].includes(b.status);
  res.json({ ...b, address: show ? config.property.fullAddress : null, maps_url: show ? config.property.mapsUrl : null });
});
