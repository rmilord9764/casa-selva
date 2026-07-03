-- Migration 006: add Saturday/Sunday 10:00 AM availability for the Private Group experience
INSERT INTO availability_slots (experience_id, starts_at, ends_at, capacity, booked, status)
SELECT e.id, s.slot_start, s.slot_start + (e.duration_min || ' minutes')::interval, e.max_guests, 0, 'open'
FROM experiences e
  CROSS JOIN LATERAL (
    SELECT (date_trunc('day', now()) + (d || ' days')::interval + (10 || ' hours')::interval) AS slot_start
    FROM generate_series(1, 90) AS d
  ) s
WHERE e.slug = 'private-group'
AND EXTRACT(DOW FROM s.slot_start) IN (0,6)
ON CONFLICT (experience_id, starts_at) DO NOTHING;
