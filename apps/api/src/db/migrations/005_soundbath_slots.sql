-- 005_soundbath_slots.sql
-- Generate bookable availability for the Sound Bath experiences.
-- Monday to Friday, next 28 days, three times per day.
-- Times stored in UTC. Browser shows in UTC-7: 15:30->8:30am, 19:00->12:00pm, 22:30->3:30pm.
INSERT INTO availability_slots (experience_id, starts_at, ends_at, capacity, booked, status)
SELECT e.id,
       slot_start,
       slot_start + (e.duration_min || ' minutes')::interval,
       e.max_guests,
       0,
       'open'
FROM experiences e
CROSS JOIN LATERAL (
  SELECT (date_trunc('day', now()) + (d || ' days')::interval + (m || ' minutes')::interval) AS slot_start
  FROM generate_series(1, 28) AS d
  CROSS JOIN (VALUES (930), (1140), (1350)) AS t(m)
) s
WHERE e.slug IN ('private-sound-bath','group-sound-bath','water-sound-bath')
  AND EXTRACT(DOW FROM slot_start) BETWEEN 1 AND 5
ON CONFLICT (experience_id, starts_at) DO NOTHING;
