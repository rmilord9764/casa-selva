INSERT INTO experiences (slug,name,description,duration_min,base_price_cents,max_guests) VALUES
 ('private-sound-bath','Private Sound Bath','Sesion individual de sound healing',60,16000,1),
 ('group-sound-bath','Group Sound Bath','Clase grupal de cuencos',60,8000,8),
 ('water-sound-bath','Water Sound Bath','Inmersion en agua + sonido',60,23000,1)
ON CONFLICT (slug) DO NOTHING;
