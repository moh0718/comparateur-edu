-- Table institutions (établissements éducation privée algérienne)
-- Utilisée par scripts/crawler.py : ON CONFLICT (slug) DO UPDATE
CREATE TABLE IF NOT EXISTS institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  website_url TEXT,
  commune TEXT,
  address TEXT,
  phone TEXT,
  rating NUMERIC(3,2),
  reviews_count INT,
  reviews_sample JSONB,
  photos JSONB,
  opening_hours TEXT,
  annual_cost_range TEXT,
  languages TEXT[] CHECK (
    languages <@ ARRAY['FR', 'EN', 'AR', 'Bilingue']::TEXT[]
  ),
  description TEXT,
  programmes TEXT,
  instagram_username TEXT,
  instagram_followers INT,
  data_confidence TEXT CHECK (data_confidence IN ('high', 'medium', 'low')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Colonnes optionnelles pour scraping_logs (éducation)
-- Si la table existe déjà avec banque/statut/message_erreur, on ajoute etablissement + sources_used
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'scraping_logs'
  ) THEN
    CREATE TABLE scraping_logs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at TIMESTAMPTZ DEFAULT now(),
      banque TEXT,
      etablissement TEXT,
      statut TEXT CHECK (statut IN ('OK', 'ERREUR')),
      message_erreur TEXT,
      sources_used JSONB
    );
  ELSE
    ALTER TABLE scraping_logs ADD COLUMN IF NOT EXISTS etablissement TEXT;
    ALTER TABLE scraping_logs ADD COLUMN IF NOT EXISTS sources_used JSONB;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_institutions_slug ON institutions(slug);
CREATE INDEX IF NOT EXISTS idx_institutions_is_active ON institutions(is_active) WHERE is_active = true;
