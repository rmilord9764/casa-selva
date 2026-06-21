-- 003_modalities.sql
-- Add the 4 Casa Selva Experience booking modalities and generate bookable availability.

INSERT INTO experiences (slug,name,description,duration_min,base_price_cents,max_guests,image_url,active) VALUES
('private-experience','Private Experience','1 adult | 2-3 hours | full experience $350 | additional adult +$80. Booking deposit: $100.',180,10000,1,'/galeria/2.png',TRUE),
('private-experience-2','Private Experience for 2','2 adults | 2-3 hours | full experience. Booking deposit: $100.',180,10000,2,'/galeria/23.png',TRUE),
('join-group-session','Join a group session','Up to 8 adults | 2-3 hours | $150 per person | English or Spanish. Booking deposit: $50.',180,5000,8,'/galeria/1.png',TRUE),
('private-group','Private Group','Up to 8 adults | 2-3 hours | pricing on inquiry. Booking deposit: $200.',180,20000,8,'/galeria/22.png',TRUE)
ON CONFLICT (slug) DO NOTHING;

-- Generate availability for the 4 new modalities: next 21 days, two times per day (14:00 and 19:00 UTC).
INSERT INTO availability_slots (experience_id, starts_at, ends_at, capacity, booked, status)
SELECT e.id,
       slot_start,
       slot_start + (e.duration_min || ' minutes')::interval,
       e.max_guests,
       0,
       'open'
FROM experiences e
CROSS JOIN LATERAL (
  SELECT (date_trunc('day', now()) + (d || ' days')::interval + (h || ' hours')::interval) AS slot_start
  FROM generate_series(1, 21) AS d
  CROSS JOIN (VALUES (14), (19)) AS t(h)
) s
WHERE e.slug IN ('private-experience','private-experience-2','join-group-session','private-group')
ON CONFLICT (experience_id, starts_at) DO NOTHING;
