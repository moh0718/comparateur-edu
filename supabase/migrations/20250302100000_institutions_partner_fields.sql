-- Champs partenaire et vérification pour institutions (admin + fiches)
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS is_partner BOOLEAN DEFAULT false;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS partner_whatsapp TEXT;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS wilaya TEXT;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS points_forts TEXT[];
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS points_faibles TEXT[];
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS mesrs_recognized BOOLEAN;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS bac_required BOOLEAN;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS has_internat BOOLEAN;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS has_transport BOOLEAN;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS level_general TEXT[];
