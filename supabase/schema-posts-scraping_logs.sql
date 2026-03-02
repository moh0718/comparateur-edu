-- Schéma attendu pour les tables utilisées par /admin
-- Exécuter dans Supabase SQL Editor si les tables n'existent pas

-- Table posts (articles)
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  source_type TEXT DEFAULT 'manual' CHECK (source_type IN ('manual', 'auto')),
  content TEXT,
  excerpt TEXT,
  source_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table scraping_logs
CREATE TABLE IF NOT EXISTS scraping_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  banque TEXT,
  statut TEXT CHECK (statut IN ('OK', 'ERREUR')),
  message_erreur TEXT
);

-- Table banks (banques à scraper pour le comparateur et les fiches)
-- Le script comparateur.py charge les lignes actives et scrape site / PDF selon source_type
CREATE TABLE IF NOT EXISTS banks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  website_url TEXT,
  tarif_pdf_url TEXT,
  source_type TEXT DEFAULT 'direct' CHECK (source_type IN ('direct', 'serper')),
  is_active BOOLEAN DEFAULT true,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Liste complète des banques à insérer (à adapter avec website_url / tarif_pdf_url réels)
-- Publiques : CNEP, BNA, BEA, CPA, BADR, BDL, BNH | Privées : SGA, BNP, Banxy, AGB, Al Salam, Al Baraka, Bank ABC, Housing Bank, Fransabank, Trust Bank, Arab Bank | Spécial : Algérie Poste
-- INSERT INTO banks (name, slug, website_url, source_type, is_active, active) VALUES
--   ('CNEP-Banque', 'cnep-banque', NULL, 'serper', true, true),
--   ('BNA', 'bna', 'https://www.bna.dz', 'direct', true, true),
--   ('BEA', 'bea', 'https://www.bea.dz', 'direct', true, true),
--   ('CPA', 'cpa', 'https://www.cpa.dz', 'direct', true, true),
--   ('BADR', 'badr', 'https://www.badr.dz', 'direct', true, true),
--   ('BDL', 'bdl', 'https://www.bdl.dz', 'direct', true, true),
--   ('BNH', 'bnh', NULL, 'serper', true, true),
--   ('Société Générale Algérie', 'societe-generale-algerie', 'https://www.sga.dz', 'direct', true, true),
--   ('BNP Paribas El Djazaïr', 'bnp-paribas-algerie', 'https://www.bnpparibas.dz', 'direct', true, true),
--   ('Banxy', 'banxy', NULL, 'serper', true, true),
--   ('AGB', 'agb', 'https://www.agb.dz', 'direct', true, true),
--   ('Al Salam Bank Algeria', 'al-salam-bank-algeria', NULL, 'serper', true, true),
--   ('Banque Al Baraka d''Algérie', 'banque-al-baraka-algerie', NULL, 'serper', true, true),
--   ('Bank ABC', 'bank-abc-algeria', NULL, 'serper', true, true),
--   ('Housing Bank', 'housing-bank-hbtf', NULL, 'serper', true, true),
--   ('Fransabank El Djazaïr', 'fransabank-el-djazair', NULL, 'serper', true, true),
--   ('Trust Bank Algeria', 'trust-bank-algeria', NULL, 'serper', true, true),
--   ('Arab Bank PLC Algeria', 'arab-bank-plc-algeria', NULL, 'serper', true, true),
--   ('Algérie Poste', 'algerie-poste', NULL, 'serper', true, true);

-- Index pour les requêtes
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_scraping_logs_created_at ON scraping_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_banks_active ON banks(is_active) WHERE is_active = true;
