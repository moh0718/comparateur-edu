-- Ajout de la colonne slug à banks pour que le site puisse résoudre les fiches par URL (/fiche/slug).
-- À exécuter dans le SQL Editor Supabase après la création des tables.

ALTER TABLE banks ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

UPDATE banks SET slug = 'agb' WHERE name = 'AGB';
UPDATE banks SET slug = 'societe-generale-algerie' WHERE name = 'Societe Generale Algerie';
UPDATE banks SET slug = 'bnp-paribas-algerie' WHERE name = 'BNP Paribas El Djazair';
UPDATE banks SET slug = 'al-salam-bank-algeria' WHERE name = 'Al Salam Bank';
UPDATE banks SET slug = 'banque-al-baraka-algerie' WHERE name = 'Al Baraka';
UPDATE banks SET slug = 'banxy' WHERE name = 'Banxy';
UPDATE banks SET slug = 'cnep-banque' WHERE name = 'CNEP-Banque';
UPDATE banks SET slug = 'bea' WHERE name = 'BEA';
UPDATE banks SET slug = 'bna' WHERE name = 'BNA';
UPDATE banks SET slug = 'cpa' WHERE name = 'CPA';
UPDATE banks SET slug = 'badr' WHERE name = 'BADR';
UPDATE banks SET slug = 'bdl' WHERE name = 'BDL';
UPDATE banks SET slug = 'bnh' WHERE name = 'BNH';
UPDATE banks SET slug = 'bank-abc-algeria' WHERE name = 'Bank ABC';
UPDATE banks SET slug = 'housing-bank-hbtf' WHERE name = 'Housing Bank (HBTF)';
UPDATE banks SET slug = 'fransabank-el-djazair' WHERE name = 'Fransabank';
UPDATE banks SET slug = 'trust-bank-algeria' WHERE name = 'Trust Bank';
UPDATE banks SET slug = 'arab-bank-plc-algeria' WHERE name = 'Arab Bank';
UPDATE banks SET slug = 'algerie-poste' WHERE name = 'Baridimob';
UPDATE banks SET slug = 'banque-algerie' WHERE name = 'Banque Algerie';

CREATE UNIQUE INDEX IF NOT EXISTS idx_banks_slug ON banks(slug) WHERE slug IS NOT NULL;
