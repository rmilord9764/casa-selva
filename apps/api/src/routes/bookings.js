import { Router } from 'express';
import { z } from 'zod';
import { randomBytes } from 'crypto';
import { pool, q } from '../db/pool.js';
import { holdSlot } from '../services/availability.js';
import { chargeCard, createSquareBooking } from '../services/square.js';
import { buildVoucher } from '../services/pdf.js';
import { sendEmail, templates } from '../services/email.js';
import { config } from '../config.js';
export const bookings = Router();
const ref = () => 'CS-' + new Date().getFullYear() + '-' + randomBytes(3).toString('hex').toUpperCase();
const schema = z.object({ slotId: z.string().uuid(), experienceId: z.string().uuid(),
  guestsCount: z.number().int().min(1).max(8),
  guest: z.object({ full_name: z.string().min(2), email: z.string().email(), phone: z.string().optional() }),
  sourceId: z.string() });
bookings.post('/', async (req, res) => {
  const parse = schema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  const { slotId, experienceId, guestsCount, guest, sourceId } = parse.data;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await holdSlot(client, slotId, guestsCount);
    const { rows: [slot] } = await client.query('SELECT * FROM availability_slots WHERE id=$1', [slotId]);
    const { rows: [exp] } = await client.query('SELECT * FROM experiences WHERE id=$1', [experienceId]);
    const { rows: [g] } = await client.query(
      `INSERT INTO guests (full_name,email,phone) VALUES ($1,$2,$3)
       ON CONFLICT (email) DO UPDATE SET full_name=EXCLUDED.full_name, phone=EXCLUDED.phone RETURNING *`,
      [guest.full_name, guest.email, guest.phone]);
    const amount = exp.base_price_cents + Math.max(0, guestsCount - 1) * 8000;
    const reference = ref();
    const { rows: [b] } = await client.query(
      `INSERT INTO bookings (reference,guest_id,experience_id,slot_id,guests_count,check_in,check_out,amount_cents,status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'pending') RETURNING *`,
      [reference, g.id, exp.id, slot.id, guestsCount, slot.starts_at, slot.ends_at, amount]);
    const payment = await chargeCard({ sourceId, amountCents: amount, referenceId: reference, note: exp.name });
    await client.query(`INSERT INTO payments (booking_id,square_payment_id,amount_cents,status,raw) VALUES ($1,$2,$3,$4,$5)`,
      [b.id, payment.id, amount, payment.status, payment]);
    let sq = null;
    try { sq = await createSquareBooking({ startAt: new Date(slot.starts_at).toISOString(),
      serviceVariationId: exp.square_service_id, customer: { note: guest.full_name + ' (' + reference + ')' } });
    } catch (e) { console.error('Square booking sync failed', e.message); }
    await client.query(`UPDATE bookings SET status='confirmed', square_payment_id=$2, square_booking_id=$3, updated_at=now() WHERE id=$1`,
      [b.id, payment.id, sq?.id || null]);
    await client.query('COMMIT');
    const pdf = await buildVoucher({ ...b, status:'confirmed' }, g, exp, config.property.fullAddress, config.property.mapsUrl);
    await sendEmail({ to: g.email, subject: `Reserva confirmada ${reference} - The Casa Selva`,
      html: templates.confirmation(b, g, exp),
      attachments: [{ content: pdf.toString('base64'), filename: `Voucher-${reference}.pdf`, type: 'application/pdf', disposition: 'attachment' }] });
    await q(`INSERT INTO notifications (booking_id,kind) VALUES ($1,'confirmation') ON CONFLICT DO NOTHING`, [b.id]);
    res.json({ reference, status: 'confirmed', amount_cents: amount,
      message: 'Reserva confirmada. Revisa tu correo para la direccion y el voucher.' });
  } catch (err) {
    await client.query('ROLLBACK');
    const map = { SLOT_UNAVAILABLE: 'La fecha ya no esta disponible', NO_CAPACITY: 'No hay capacidad para ese numero de huespedes' };
    res.status(409).json({ error: map[err.message] || 'No se pudo completar la reserva' });
  } finally { client.release(); }
});
