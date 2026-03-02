-- Notes des applications mobiles (App Store / Google Play)
-- À exécuter dans le SQL Editor Supabase si les colonnes n'existent pas.

ALTER TABLE bank_rates
  ADD COLUMN IF NOT EXISTS app_rating_apple REAL,
  ADD COLUMN IF NOT EXISTS app_rating_google REAL,
  ADD COLUMN IF NOT EXISTS app_reviews_count INTEGER DEFAULT 0;

COMMENT ON COLUMN bank_rates.app_rating_apple IS 'Note moyenne App Store (0-5), mise à jour périodiquement';
COMMENT ON COLUMN bank_rates.app_rating_google IS 'Note moyenne Google Play (0-5), mise à jour périodiquement';
COMMENT ON COLUMN bank_rates.app_reviews_count IS 'Nombre d''avis (Apple + Google), pour pondérer la note';
