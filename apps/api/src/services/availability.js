import { q } from '../db/pool.js';
export async function getAvailability(experienceId, from, to) {
  const { rows } = await q(
    `SELECT id, experience_id, starts_at, ends_at, capacity, booked FROM availability_slots
      WHERE status='open' AND booked < capacity AND starts_at >= $2 AND starts_at <= $3
        AND ($1::uuid IS NULL OR experience_id = $1) ORDER BY starts_at`,
    [experienceId || null, from, to]);
  return rows;
}
export async function holdSlot(client, slotId, guestsCount) {
  const { rows } = await client.query(`SELECT capacity, booked, status FROM availability_slots WHERE id=$1 FOR UPDATE`, [slotId]);
  const slot = rows[0];
  if (!slot || slot.status !== 'open') throw new Error('SLOT_UNAVAILABLE');
  if (slot.booked + guestsCount > slot.capacity) throw new Error('NO_CAPACITY');
  const booked = slot.booked + guestsCount;
  await client.query(`UPDATE availability_slots SET booked=$2, status=CASE WHEN $2>=capacity THEN 'full' ELSE 'open' END WHERE id=$1`, [slotId, booked]);
}
