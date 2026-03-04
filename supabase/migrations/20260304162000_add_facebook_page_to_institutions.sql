-- Ajouter une page Facebook pour chaque établissement (facultatif)
ALTER TABLE institutions
ADD COLUMN IF NOT EXISTS facebook_page TEXT;

