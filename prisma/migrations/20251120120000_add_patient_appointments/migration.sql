-- Add appointments JSON column to patient records for storing custom appointments
ALTER TABLE "Patient"
ADD COLUMN IF NOT EXISTS "appointments" JSONB;

