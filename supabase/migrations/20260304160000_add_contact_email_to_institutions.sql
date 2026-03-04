-- Ajouter un email de contact explicite pour chaque établissement
ALTER TABLE institutions
ADD COLUMN IF NOT EXISTS contact_email TEXT;

