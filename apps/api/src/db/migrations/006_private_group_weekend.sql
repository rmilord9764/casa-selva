-- Migration 006: add Saturday/Sunday 10:00 AM (local) availability for the Private Group experience
-- Remove the initial rows that were inserted with the wrong UTC offset (displayed as 3am instead of 10am)
DELETE FROM availability_slots a
USING experiences e
WHERE a.experience_id = e.id
  AND e.slug = 'private-group'
  AND EXTRACT(HOUR FROM a.starts_at) = 10
  AND a.booked = 0;

INSERT INTO availability_slots (experience_id, starts_at, ends_at, capacity, booked, status)
SELECT e.id, s.slot_start, s.slot_start + (e.duration_min || ' minutes')::interval, e.max_guests, 0, 'open'
FROM experiences e
CROSS JOIN LATERAL (
    SELECT (date_trunc('day', now()) + (d || ' days')::interval + (17 || ' hours')::interval) AS slot_start
    FROM generate_series(1, 90) AS d
  ) s
WHERE e.slug = 'private-group'
AND EXTRACT(DOW FROM s.slot_start) IN (0,6)
ON CONFLICT (experience_id, starts_at) DO NOTHING;
