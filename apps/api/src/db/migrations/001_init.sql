CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), slug TEXT UNIQUE NOT NULL, name TEXT NOT NULL,
  description TEXT, duration_min INT NOT NULL DEFAULT 120, base_price_cents INT NOT NULL,
  max_guests INT NOT NULL DEFAULT 8, square_service_id TEXT, image_url TEXT,
  active BOOLEAN DEFAULT TRUE, created_at TIMESTAMPTZ DEFAULT now());

CREATE TABLE IF NOT EXISTS availability_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE,
  starts_at TIMESTAMPTZ NOT NULL, ends_at TIMESTAMPTZ NOT NULL,
  capacity INT NOT NULL DEFAULT 1, booked INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'open', square_booking_id TEXT,
  UNIQUE (experience_id, starts_at));

CREATE TABLE IF NOT EXISTS guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), full_name TEXT NOT NULL,
  email CITEXT NOT NULL UNIQUE, phone TEXT, created_at TIMESTAMPTZ DEFAULT now());

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), reference TEXT UNIQUE NOT NULL,
  guest_id UUID REFERENCES guests(id), experience_id UUID REFERENCES experiences(id),
  slot_id UUID REFERENCES availability_slots(id), guests_count INT NOT NULL DEFAULT 1,
  check_in TIMESTAMPTZ NOT NULL, check_out TIMESTAMPTZ NOT NULL,
  amount_cents INT NOT NULL, currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending', square_payment_id TEXT, square_booking_id TEXT,
  voucher_url TEXT, notes TEXT, created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now());

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  square_payment_id TEXT, amount_cents INT NOT NULL, status TEXT NOT NULL,
  raw JSONB, created_at TIMESTAMPTZ DEFAULT now());

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  kind TEXT NOT NULL, sent_at TIMESTAMPTZ DEFAULT now(), UNIQUE (booking_id, kind));

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email CITEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'admin', created_at TIMESTAMPTZ DEFAULT now());

CREATE OR REPLACE FUNCTION touch_updated_at() RETURNS trigger AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS trg_bookings_touch ON bookings;
CREATE TRIGGER trg_bookings_touch BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
