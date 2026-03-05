-- Insertion établissements (supérieur, formation pro, langues, général, santé) : IFAG, INSIM, … INOOF, Paramely, Ibn Nafis, El Taraqui — fiches riches pour table institutions
-- À exécuter dans Supabase : SQL Editor → New query → coller et Run.
-- Utilise ON CONFLICT (slug) comme insert_enpei.sql (id reste auto-généré).
-- Si une colonne n'existe pas (ex. diploma_type, insertion_rate), ajoute-la via Table Editor ou une migration, ou retire-la de l'INSERT.

-- 1.1 — IFAG
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address, website_url,
  description, programmes, annual_cost_range, languages,
  bac_required, diploma_type, mesrs_recognized, intl_equivalence,
  admission_type, promo_size, internship_provided, internship_duration,
  insertion_rate, passerelles, corporate_partners, school_partners,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'IFAG · Institut de Formation en Administration et Gestion',
  'ifag-institut-formation-administration-gestion-hydra',
  'Superieur',
  'Alger',
  'Hydra',
  'Rue Belle Vue, GP66, Lot 49, Hydra, Alger',
  'https://ifag.edu.dz',
  'L''IFAG, situé à Hydra, Alger, est un établissement privé d''enseignement supérieur fondé dans les années 1990 au sein du groupe INSAG. Agréé MESRS (arrêté n°341 du 11 avril 2018), il délivre des diplômes nationaux LMD de la Licence au Master. Filières : marketing, management, comptabilité, finance, informatique de gestion. Pédagogie axée sur la professionnalisation, +8 000 diplômés depuis 1991, +48 entreprises partenaires. Taux d''insertion groupe INSAG (étude Emploitic) : 95,76 %.',
  'Marketing & Commerce · Comptabilité & Finance · Informatique de gestion · Management (Master). Licence LMD (Bac+3) + Master LMD (Bac+5) — diplômes nationaux d''État.',
  '450 000 – 650 000 DA / an (est. 2025-2026)',
  ARRAY['FR', 'EN'],
  TRUE,
  'Licence LMD (Bac+3) + Master LMD (Bac+5) — diplômes nationaux d''État',
  TRUE,
  'Possible via groupe INSAG (RNCP France + WES USA/Canada pour MBA)',
  'Sélective — dossier + tests écrits/oraux · Moyenne Bac recommandée : ~12–14/20',
  '~600 étudiants au total (toutes promos confondues)',
  TRUE,
  'Stage PFE obligatoire intégré au cursus',
  '95,76 % (groupe INSAG — étude Emploitic 2025)',
  'Équivalence RNCP France, WES USA/Canada pour MBA',
  '["Multinationales", "Grandes entreprises", "PME/PMI — +48 partenaires actifs"]'::jsonb,
  '["Groupe INSAG Business School", "Universités algériennes"]'::jsonb,
  ARRAY[
    'Agréé MESRS (arrêté n°341 du 11/04/2018)',
    'Taux d''insertion 95,76 % (groupe INSAG)',
    '+48 entreprises partenaires',
    'Stage PFE obligatoire',
    'Équivalence possible RNCP France, WES USA/Canada'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  website_url          = EXCLUDED.website_url,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  annual_cost_range    = EXCLUDED.annual_cost_range,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  diploma_type         = EXCLUDED.diploma_type,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  intl_equivalence     = EXCLUDED.intl_equivalence,
  admission_type       = EXCLUDED.admission_type,
  promo_size           = EXCLUDED.promo_size,
  internship_provided  = EXCLUDED.internship_provided,
  internship_duration  = EXCLUDED.internship_duration,
  insertion_rate       = EXCLUDED.insertion_rate,
  passerelles          = EXCLUDED.passerelles,
  corporate_partners   = EXCLUDED.corporate_partners,
  school_partners      = EXCLUDED.school_partners,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 1.2 — INSIM
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address, website_url,
  description, programmes, annual_cost_range, languages,
  bac_required, diploma_type, mesrs_recognized, intl_equivalence,
  admission_type, internship_provided, internship_duration,
  insertion_rate, passerelles, corporate_partners, school_partners,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'INSIM · Institut Supérieur de Management (cycle BTS)',
  'insim-institut-superieur-management-bts-hydra',
  'Formation Pro',
  'Alger',
  'Hydra',
  'Hydra (siège) + 11 antennes à travers l''Algérie',
  'https://insim.dz',
  'L''INSIM, fondé en 1994 à Hydra, est l''un des premiers établissements privés de formation professionnelle supérieure en Algérie. BTS d''État (Bac+2) du MFEP, 24 mois d''enseignement + 6 mois de stage obligatoire. Spécialités : informatique de gestion, commerce international, marketing, comptabilité, tourisme et hôtellerie. Réseau national (12 villes), +3 000 diplômés. Partenaires : Sonatrach, Air Algérie, multinationales. Passerelles vers Bachelor (Bac+3) ou MBA (Bac+5).',
  'Informatique de gestion · Commerce international · Marketing · Comptabilité · Tourisme & Hôtellerie · RH. BTS d''État (Bac+2) — diplôme officiel MFEP + Diplôme DESS INSIM.',
  '400 000 – 700 000 DA / an (est. 2025-2026)',
  ARRAY['FR'],
  TRUE,
  'BTS d''État (Bac+2) — diplôme officiel MFEP + Diplôme DESS INSIM',
  FALSE,
  'Passerelles vers universités canadiennes (Collège de Sherbrooke) et MBA UQAM',
  'Ouverte aux bacheliers — entretien de motivation possible',
  TRUE,
  '6 mois obligatoires + mémoire soutenu devant jury',
  '>95 % (taux de réussite aux examens)',
  'Vers Bachelor (Bac+3) ou MBA (Bac+5) après le BTS',
  '["Sonatrach", "Air Algérie", "multinationales du secteur privé"]'::jsonb,
  '["Collège de Sherbrooke", "UQAM", "5 partenaires étrangers"]'::jsonb,
  ARRAY[
    'Agréé MFEP depuis 1994',
    'Taux de réussite >95 %',
    '6 mois stage + mémoire',
    'Passerelles Sherbrooke, UQAM',
    'Réseau Sonatrach, Air Algérie'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  website_url          = EXCLUDED.website_url,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  annual_cost_range    = EXCLUDED.annual_cost_range,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  diploma_type         = EXCLUDED.diploma_type,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  intl_equivalence     = EXCLUDED.intl_equivalence,
  admission_type       = EXCLUDED.admission_type,
  internship_provided  = EXCLUDED.internship_provided,
  internship_duration  = EXCLUDED.internship_duration,
  insertion_rate       = EXCLUDED.insertion_rate,
  passerelles          = EXCLUDED.passerelles,
  corporate_partners   = EXCLUDED.corporate_partners,
  school_partners      = EXCLUDED.school_partners,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 1.3 — INSIM SUP
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, website_url,
  description, programmes, annual_cost_range, languages,
  bac_required, diploma_type, mesrs_recognized, admission_type,
  school_partners, points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'INSIM SUP · Université privée (cycle Licence & Master)',
  'insim-sup-universite-privee-licence-master-hydra',
  'Superieur',
  'Alger',
  'Hydra',
  'https://insimsup.dz',
  'INSIM SUP est la branche universitaire du groupe INSIM, agréée MESRS (arrêté n°845 du 30 octobre 2022). Licence (Bac+3) et Master (Bac+5) en sciences économiques, gestion, marketing digital, finance, informatique et intelligence artificielle. Offre bilingue avec spécialités en anglais (Business English, International Business). Business school à vocation internationale avec partenariats académiques à l''étranger.',
  'Sciences éco · Gestion · Marketing digital · Finance · Informatique · IA · Business English · Commerce international. Licence LMD (Bac+3) + Master LMD (Bac+5) — diplômes nationaux d''État.',
  '400 000 – 700 000 DA / an (estimation)',
  ARRAY['FR', 'EN'],
  TRUE,
  'Licence LMD (Bac+3) + Master LMD (Bac+5) — diplômes nationaux d''État',
  TRUE,
  'Sélective — dossier (modalités exactes non publiées)',
  '["Partenariats internationaux (non détaillés publiquement)"]'::jsonb,
  ARRAY[
    'Agréé MESRS (arrêté n°845 du 30/10/2022)',
    'Licence + Master LMD nationaux',
    'Enseignement bilingue FR/EN — spécialités en anglais',
    'Partenariats académiques internationaux'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  website_url          = EXCLUDED.website_url,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  annual_cost_range    = EXCLUDED.annual_cost_range,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  diploma_type         = EXCLUDED.diploma_type,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  admission_type       = EXCLUDED.admission_type,
  school_partners      = EXCLUDED.school_partners,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 1.4 — EM Alger Business School
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address, website_url,
  description, programmes, annual_cost_range, languages,
  bac_required, diploma_type, mesrs_recognized, admission_type,
  corporate_partners, school_partners, points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'EM Alger Business School',
  'em-alger-business-school-hydra',
  'Superieur',
  'Alger',
  'Hydra',
  '17, Rue Abdelkader Gadouche, Hydra, Alger',
  'https://em-alger.com',
  'L''EM Alger Business School, établie à Hydra, est une école supérieure privée de management agréée par le MESRS. Cursus du Bachelor (Bac+3) au MBA (Bac+5) : finance, marketing, management international, commerce. 30 enseignants-chercheurs, 8 partenaires entreprises, ~700 alumni. Partenariat avec l''ENAP (Québec). Admission ouverte aux bacheliers, licenciés et salariés en reprise d''études. Taux de réussite aux examens : 95 %.',
  'Finance · Marketing · Management international · Commerce. Bachelor (Bac+3) · Licence LMD · Master · MBA — diplômes nationaux.',
  '500 000 – 750 000 DA / an',
  ARRAY['FR', 'EN'],
  TRUE,
  'Bachelor (Bac+3) · Licence LMD · Master · MBA — diplômes nationaux',
  TRUE,
  'Ouverte — bacheliers, licenciés, salariés en reprise d''études',
  '["8 partenaires entreprises"]'::jsonb,
  '["ENAP Québec (Canada)"]'::jsonb,
  ARRAY[
    'Agréé MESRS',
    'Partenariat ENAP Québec (Canada)',
    '30 enseignants-chercheurs · ~700 alumni',
    'Taux de réussite 95 % aux examens',
    'Admission ouverte — bacheliers, licenciés, salariés'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  website_url          = EXCLUDED.website_url,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  annual_cost_range    = EXCLUDED.annual_cost_range,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  diploma_type         = EXCLUDED.diploma_type,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  admission_type       = EXCLUDED.admission_type,
  corporate_partners   = EXCLUDED.corporate_partners,
  school_partners      = EXCLUDED.school_partners,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 1.5 — INSAG Business School
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, website_url,
  description, programmes, annual_cost_range, languages,
  bac_required, diploma_type, mesrs_recognized, intl_equivalence,
  admission_type, insertion_rate, school_partners,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'INSAG Business School',
  'insag-business-school-hydra',
  'Superieur',
  'Alger',
  'Hydra',
  'https://insag.edu.dz',
  'L''INSAG Business School, à Hydra, est l''une des premières écoles privées de management agréées en Algérie et la tête de groupe de l''écosystème INSAG (dont fait partie l''IFAG). MBA et Masters spécialisés : transformation digitale, finance internationale, management stratégique. Double reconnaissance internationale : diplômes enregistrés au RNCP (France) et reconnus par WES (équivalence Master USA/Canada). +8 000 alumni depuis 1991, 5 partenaires académiques internationaux. Taux d''insertion groupe INSAG (Emploitic 2025) : 95,76 %.',
  'Transformation digitale · Finance internationale · Management stratégique · E-business. MBA · Master (Bac+5) — diplômes nationaux + RNCP France + WES USA/Canada.',
  '600 000 – 900 000 DA / an',
  ARRAY['FR', 'EN'],
  TRUE,
  'MBA · Master (Bac+5) — diplômes nationaux + RNCP France + WES USA/Canada',
  TRUE,
  'RNCP France + WES (équivalence Master USA/Canada)',
  'Sélective',
  '95,76 % (groupe INSAG — étude Emploitic 2025)',
  '["5 Business Schools internationales"]'::jsonb,
  ARRAY[
    'Agréé MESRS — l''un des premiers historiquement',
    'RNCP France + WES (équivalence Master USA/Canada)',
    '+8 000 alumni depuis 1991',
    '5 Business Schools partenaires internationales',
    'Taux d''insertion 95,76 % (groupe INSAG — Emploitic 2025)'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  website_url          = EXCLUDED.website_url,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  annual_cost_range    = EXCLUDED.annual_cost_range,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  diploma_type         = EXCLUDED.diploma_type,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  intl_equivalence     = EXCLUDED.intl_equivalence,
  admission_type       = EXCLUDED.admission_type,
  insertion_rate       = EXCLUDED.insertion_rate,
  school_partners      = EXCLUDED.school_partners,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 1.6 — ESST
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address, website_url,
  description, programmes, annual_cost_range, languages,
  bac_required, diploma_type, mesrs_recognized, admission_type,
  internship_provided, corporate_partners, school_partners,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'ESST · École Supérieure des Sciences et Technologies',
  'esst-ecole-superieure-sciences-technologies-el-achour',
  'Superieur',
  'Alger',
  'El Achour',
  'Butte des deux bassins, El Achour, Alger',
  'https://esst-sup.com',
  'L''ESST, à El Achour, est le premier établissement universitaire privé en Algérie entièrement dédié aux sciences exactes et aux technologies. Agréée MESRS, système LMD : Licence (Bac+3) et Master (Bac+5) en informatique (ISIL, SASR, DLTW, Big Data, IA), chimie pharmaceutique et sciences & techniques. Partenariat EFREI Paris. Partenaires industriels : Condor, Mobilis, Novartis, Ooredoo. Stage obligatoire dès la 2e année (L2). Admission sélective réservée aux bacheliers des séries scientifiques. Taux de réussite 2025 : 100 % annoncé.',
  'Informatique (ISIL, SASR, DLTW, Big Data, IA) · Chimie pharmaceutique · Sciences & Techniques · Télécoms · Cybersécurité. Licence LMD (Bac+3) + Master LMD (Bac+5) — diplômes nationaux d''État.',
  '450 000 – 650 000 DA / an',
  ARRAY['FR', 'EN'],
  TRUE,
  'Licence LMD (Bac+3) + Master LMD (Bac+5) — diplômes nationaux d''État',
  TRUE,
  'Sélective — dossier + concours propre (séries scientifiques : M, TM, S)',
  TRUE,
  '["Condor", "Mobilis", "Novartis", "Ooredoo"]'::jsonb,
  '["EFREI Paris (France)"]'::jsonb,
  ARRAY[
    'Agréé MESRS — 1er établissement privé dédié sciences & tech',
    'Partenariat EFREI Paris (France)',
    'Partenaires industriels : Condor, Mobilis, Novartis, Ooredoo',
    'Stage obligatoire dès L2 · Taux de réussite 100 % (2025)',
    'Admission sélective — séries scientifiques (M, TM, S)'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  website_url          = EXCLUDED.website_url,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  annual_cost_range    = EXCLUDED.annual_cost_range,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  diploma_type         = EXCLUDED.diploma_type,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  admission_type       = EXCLUDED.admission_type,
  internship_provided  = EXCLUDED.internship_provided,
  corporate_partners   = EXCLUDED.corporate_partners,
  school_partners      = EXCLUDED.school_partners,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 1.7 — EFTG Sup
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address, website_url,
  description, programmes, annual_cost_range, languages,
  bac_required, diploma_type, mesrs_recognized, admission_type,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'EFTG Sup · École de Gestion',
  'eftg-sup-ecole-gestion-dely-ibrahim',
  'Superieur',
  'Alger',
  'Dely Ibrahim',
  'Dely Ibrahim / Chéraga, Alger',
  'https://eftg-sup.com',
  'L''EFTG Sup, à Dely Ibrahim, revendique le statut de première école supérieure de gestion privée agréée en Algérie (fondation 1992). Agrément MESRS renouvelé arrêté n°397/2018. 6 Licences et 5 Masters : commerce international, systèmes informatiques, marketing digital, management hôtelier. Enseignement trilingue (français, anglais, espagnol). Incubateur GEM-START pour l''accompagnement entrepreneurial. Option double diplôme international. Stage intégré + soutenance mémoire devant jury de professionnels.',
  'Commerce international · Systèmes informatiques · Marketing digital · Management hôtelier (Master). 6 Licences + 5 Masters LMD (Bac+3 / Bac+5) — option double diplôme international.',
  '150 000 – 300 000 DA / an (estimation)',
  ARRAY['FR', 'EN', 'ES'],
  TRUE,
  'Licence LMD (Bac+3) + Master (Bac+5) · Option double diplôme international',
  TRUE,
  'Dossier + inscriptions ouvertes Licence 1',
  ARRAY[
    'Agréé MESRS (arrêté n°397/2018) — 1ère agréée dès 1992',
    'Enseignement trilingue FR · EN · ES',
    'Incubateur GEM-START (accompagnement entrepreneurial)',
    'Option double diplôme international',
    'Stage intégré + soutenance mémoire professionnel'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  website_url          = EXCLUDED.website_url,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  annual_cost_range    = EXCLUDED.annual_cost_range,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  diploma_type         = EXCLUDED.diploma_type,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  admission_type       = EXCLUDED.admission_type,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 1.8 — NCUK Algeria (hors MESRS — qualification UK, passerelle études à l'étranger)
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address, website_url,
  description, programmes, annual_cost_range, languages,
  bac_required, diploma_type, mesrs_recognized, intl_equivalence,
  admission_type, points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'NCUK Algeria · Centre International d''Études d''Alger',
  'ncuk-algeria-centre-international-etudes-alger',
  'Superieur',
  'Alger',
  'Dely Ibrahim',
  'Dely Ibrahim, Alger',
  'https://ncukalgeria.com',
  'NCUK Algeria (Algeria International Study Centre), à Dely Ibrahim, est un centre de préparation affilié au réseau NCUK (Northern Consortium UK). Qualifications britanniques (UK ENIC) pour accès direct aux universités partenaires (UK, Australie, USA, Canada). Programmes : International Foundation Year (IFY), Master''s Preparation. Enseignement exclusivement en anglais par locuteurs natifs. Admission : Bac min. 10/20 + Password Test (5 000 DA). 99 % succès visa, 90 % intègrent l''université de leur 1er choix. Accompagnement : orientation, dossiers, visa, logement à l''étranger. Ne délivre pas de diplôme national algérien.',
  'International Foundation Year (IFY) · Master''s Preparation — qualifications britanniques (UK ENIC). Accès direct universités partenaires (Manchester, Birmingham, Leeds, Bristol, Sheffield…).',
  '~13 000 USD / an (2025)',
  ARRAY['EN'],
  TRUE,
  'International Foundation Year (IFY) · Master''s Preparation — qualifications UK (UK ENIC)',
  FALSE,
  'UK ENIC · Accès direct universités UK, Australie, USA, Canada',
  'Bac min. 10/20 + Password Test (anglais, 5 000 DA)',
  ARRAY[
    'Qualification UK (UK ENIC) — accès direct universités UK, Australie, USA, Canada',
    '99 % succès visa · 90 % obtiennent université 1er choix',
    'Enseignement 100 % anglais — locuteurs natifs',
    'Accompagnement complet : orientation, dossiers, visa, logement à l''étranger',
    'Password Test 5 000 DA — Bac min. 10/20 requis'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  website_url          = EXCLUDED.website_url,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  annual_cost_range    = EXCLUDED.annual_cost_range,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  diploma_type         = EXCLUDED.diploma_type,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  intl_equivalence     = EXCLUDED.intl_equivalence,
  admission_type       = EXCLUDED.admission_type,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 1.9 — MDI Algiers Business School (ex-MGP)
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address, website_url,
  description, programmes, languages,
  bac_required, diploma_type, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'MDI Algiers Business School (ex-MGP)',
  'mdi-algiers-business-school-cheraga',
  'Superieur',
  'Alger',
  'Chéraga',
  'Chéraga, Alger',
  'https://mdi-alger.com',
  'La MDI Algiers Business School (ex-MGP — Management et Développement International), à Chéraga, est l''un des tout premiers établissements privés d''enseignement supérieur en management agréés en Algérie. Précurseur du secteur, elle propose des formations en management, finance et commerce international, selon un modèle pédagogique proche des grandes écoles. Diplômes nationaux Licence + Master. Informations détaillées (programmes, coûts, insertion) limitées publiquement.',
  'Management · Finance · Commerce international. Licence + Master — diplômes nationaux.',
  ARRAY['FR'],
  TRUE,
  'Licence + Master en management — diplômes nationaux',
  TRUE,
  ARRAY[
    'Agréé MESRS — l''un des premiers privés historiquement',
    'Management · Finance · Commerce international',
    'Modèle pédagogique type grande école'
  ],
  'medium',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  website_url          = EXCLUDED.website_url,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  diploma_type         = EXCLUDED.diploma_type,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 1.10 — CESI Algérie (agréé MFEP, hors MESRS)
INSERT INTO institutions (
  name, slug, category,
  wilaya, website_url,
  description, programmes, languages,
  bac_required, diploma_type, mesrs_recognized, intl_equivalence,
  corporate_partners, points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'CESI Algérie',
  'cesi-algerie',
  'Formation Pro',
  'Alger',
  'https://cesi-algerie.com',
  'CESI Algérie est la filiale algérienne du groupe français CESI, agréée MFEP depuis 2003. Formations en management et technologies de l''information : Bac+2 (Technicien Supérieur) au Bac+5 (cycle ingénieur CESI via Exia). Certifications professionnelles et titre d''ingénieur CESI reconnus par l''État algérien, hors système LMD. Équivalence RNCP France via CESI France. +5 000 personnes formées/an, 280 entreprises partenaires (dont Sonatrach), +200 experts. Formations continues entreprises.',
  'Management · Technologies de l''information · Informatique (Exia, titre ingénieur Bac+5). Certifications CESI Bac+2 à Bac+5 · Formation continue entreprises.',
  ARRAY['FR'],
  TRUE,
  'Certifications CESI (Bac+2 à Bac+5) · Titre ingénieur CESI (Exia) · Non-LMD',
  FALSE,
  'Certifications RNCP françaises via groupe CESI France',
  '["280 entreprises partenaires (dont Sonatrach)"]'::jsonb,
  ARRAY[
    'Agréé MFEP depuis 2003 — filiale CESI France',
    '+5 000 formés/an · 280 entreprises partenaires (dont Sonatrach)',
    'Certifications RNCP France · Titre ingénieur CESI (Exia)',
    '+200 experts intervenants · +1 000 diplômés'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  website_url          = EXCLUDED.website_url,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  diploma_type         = EXCLUDED.diploma_type,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  intl_equivalence     = EXCLUDED.intl_equivalence,
  corporate_partners   = EXCLUDED.corporate_partners,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 1.11 — ESG Educaform (formation continue, hors MESRS)
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address, website_url,
  description, programmes, annual_cost_range, languages,
  bac_required, diploma_type, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'ESG Educaform · École Supérieure de Gestion',
  'esg-educaform-ecole-superieure-gestion-birkhadem',
  'Formation Pro',
  'Alger',
  'Birkhadem',
  'Birkhadem, Alger',
  'https://esgalgerie.com',
  'L''ESG Educaform, à Birkhadem, est un organisme de formation continue et de coaching pour cadres supérieurs et dirigeants. Séminaires intensifs (2 à 5 jours) et formations de moyenne durée (FMD) : trésorerie, supply chain, gestion de crise, GPEC, management opérationnel. Partenaire des DRH et Directions Générales des grandes entreprises. Séminaires en hôtel 5* (Hyatt Regency) ou au siège. Certifications et attestations — pas de diplôme national LMD. Hors MESRS.',
  'Formation continue · Trésorerie · Supply chain · Gestion de crise · GPEC · Management opérationnel. Séminaires 2–5 jours · FMD. Public : cadres, DRH, DG.',
  'Séminaires : ~21 000 – 25 000 DA / participant / jour',
  ARRAY['FR'],
  FALSE,
  'Certifications et attestations de formation · Pas de diplôme national LMD',
  FALSE,
  ARRAY[
    'Formation continue cadres et dirigeants',
    'Séminaires 2–5 jours · FMD · Partenaire DRH et DG',
    'Prestations Hyatt Regency ou au siège'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  website_url          = EXCLUDED.website_url,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  annual_cost_range    = EXCLUDED.annual_cost_range,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  diploma_type         = EXCLUDED.diploma_type,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 1.12 — CACI Formation (rattachée CACI, agréé État)
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address, website_url,
  description, programmes, languages,
  bac_required, diploma_type, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'CACI Formation',
  'caci-formation-mohammadia',
  'Formation Pro',
  'Alger',
  'Mohammadia',
  'Mohammadia, Alger',
  'https://formations.caci.dz',
  'CACI Formation, rattachée à la Chambre Algérienne de Commerce et d''Industrie (CACI), à Mohammadia, propose des formations diplômantes de niveau Technicien Supérieur (TS) en commerce, ressources humaines et marketing. Émanation d''un organisme consulaire officiel : reconnaissance étatique et ancrage dans le réseau des entreprises membres de la chambre de commerce.',
  'Commerce · Ressources humaines · Marketing. Technicien Supérieur (TS) agréé État.',
  ARRAY['FR'],
  TRUE,
  'Technicien Supérieur (TS) agréé État — Commerce · RH · Marketing',
  FALSE,
  ARRAY[
    'Rattaché à la CACI (Chambre de Commerce officielle)',
    'Diplôme TS agréé État — Commerce · RH · Marketing',
    'Réseau des entreprises membres de la chambre'
  ],
  'medium',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  website_url          = EXCLUDED.website_url,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  diploma_type         = EXCLUDED.diploma_type,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 2.1 — Berlitz Algérie
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address, website_url,
  description, programmes, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'Berlitz Algérie',
  'berlitz-algerie-hydra',
  'Langues',
  'Alger',
  'Hydra',
  'Hydra, Alger',
  'https://www.berlitz.com/fr-fr/algerie',
  'Berlitz Algérie, franchise du groupe international Berlitz depuis 2002, à Hydra. Méthode d''immersion totale (langue cible dès la première leçon). 13 salles sur 3 niveaux. Catalogue : anglais, français, espagnol, allemand, coréen, japonais, russe. Public : particuliers (adultes et enfants), entreprises, institutions. Groupes limités à 9 personnes ; cours en présentiel et en ligne. Préparation IELTS, TOEFL, TOEIC.',
  'Anglais · Français · Espagnol · Allemand · Coréen · Japonais · Russe. Préparation IELTS · TOEFL · TOEIC · Attestations Berlitz. Groupes max 9 · Cours 1-à-1 · Présentiel et en ligne.',
  ARRAY['FR', 'EN', 'ES', 'DE', 'KR', 'JA', 'RU'],
  FALSE,
  FALSE,
  ARRAY[
    'Franchise Berlitz International depuis 2002',
    'Immersion totale — langue cible dès la 1re leçon',
    '13 salles · Groupes max 9 · Présentiel + en ligne',
    'Préparation IELTS, TOEFL, TOEIC',
    'Particuliers, entreprises, gouvernements'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  website_url          = EXCLUDED.website_url,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 2.2 — Institut Torii
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, annual_cost_range, languages,
  bac_required, mesrs_recognized, intl_equivalence,
  instagram_username, points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'Institut Torii',
  'institut-torii-el-achour',
  'Langues',
  'Alger',
  'El Achour',
  'El Achour, Alger',
  'L''Institut Torii, à El Achour, est le centre de référence en Algérie pour les langues d''Asie orientale. Préparation aux certifications officielles : JLPT (japonais, N5→N1), TOPIK (coréen), HSK (mandarin). Indispensables pour les bourses MEXT (Japon), NIIED (Corée), CSC (Chine) et pour les carrières en Asie. Forte communauté : +15 000 abonnés Instagram.',
  'Japonais (JLPT N5→N1) · Coréen (TOPIK) · Mandarin (HSK). Préparation bourses MEXT, NIIED, CSC. Certifications reconnues par les gouvernements japonais, coréen et chinois.',
  'Japonais à partir de 16 000 DA/session · Coréen 15 000 DA/session · Mandarin 20 000 DA/session',
  ARRAY['JA', 'KR', 'ZH'],
  FALSE,
  FALSE,
  'Certifications reconnues par gouvernements japonais, coréen et chinois',
  'instituttorii',
  ARRAY[
    'Référence nationale langues asiatiques — JLPT · TOPIK · HSK',
    'Bourses MEXT (Japon) · NIIED (Corée) · CSC (Chine)',
    'Certifications reconnues gouvernements JP/KR/CN',
    '+15 000 abonnés Instagram'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  annual_cost_range    = EXCLUDED.annual_cost_range,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  intl_equivalence     = EXCLUDED.intl_equivalence,
  instagram_username   = EXCLUDED.instagram_username,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 2.3 — DaF Akademie / DSIA
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, languages,
  bac_required, mesrs_recognized, intl_equivalence,
  school_partners, points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'DaF Akademie / DSIA',
  'daf-akademie-dsia-hydra',
  'Langues',
  'Alger',
  'Hydra',
  'Hydra, Alger',
  'La DaF Akademie et le DSIA, à Hydra, sont les centres de référence pour l''allemand en Algérie. Partenaires du Goethe-Institut, ils préparent aux examens officiels selon le CECRL (A1→C2). Diplômes Goethe reconnus par les ambassades allemande et autrichienne pour visas (études, travail, regroupement familial) et par les universités allemandes. Préparation TestDaF et ÖSD.',
  'Allemand — Examens Goethe-Institut (A1→C2) · TestDaF · ÖSD. Méthode CECRL. Reconnaissance ambassades et universités allemandes (souvent gratuites ou à faible coût).',
  ARRAY['DE'],
  FALSE,
  FALSE,
  'Reconnu par ambassades Allemagne/Autriche et universités allemandes',
  '["Goethe-Institut Algérie"]'::jsonb,
  ARRAY[
    'Partenaire Goethe-Institut Algérie',
    'Examens officiels A1→C2 (CECRL) · TestDaF · ÖSD',
    'Reconnu ambassades Allemagne/Autriche — visas études et travail',
    'Accès universités allemandes (souvent gratuites)'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  intl_equivalence     = EXCLUDED.intl_equivalence,
  school_partners      = EXCLUDED.school_partners,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 2.4 — IN-tuition
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, languages,
  bac_required, mesrs_recognized, intl_equivalence,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'IN-tuition',
  'in-tuition-alger',
  'Langues',
  'Alger',
  'Hydra',
  'Saïd Hamdine / Hydra, Alger · Réseau 16 wilayas',
  'IN-tuition, fondé en 2003, dispose d''agences à Saïd Hamdine et Hydra et d''un réseau national dans 16 wilayas. Spécialisé en langues pour particuliers et entreprises. Préparation aux tests standardisés : TOEFL (études USA/Canada), GRE (3e cycle aux États-Unis), TEF (immigration Canada). Formations sur mesure entreprises. 51 à 200 employés, plus de 20 ans d''activité.',
  'Anglais · Français · Autres langues. Préparation TOEFL · GRE · TEF (Canada). Attestations IN-tuition. Particuliers et entreprises (formations sur mesure). Présentiel et en ligne.',
  ARRAY['FR', 'EN'],
  FALSE,
  FALSE,
  'TOEFL/GRE pour USA/Canada · TEF pour immigration Canada',
  ARRAY[
    'Depuis 2003 · Réseau 16 wilayas',
    'Préparation TOEFL · GRE · TEF (immigration Canada)',
    'Formations sur mesure entreprises',
    'Présentiel et en ligne'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  intl_equivalence     = EXCLUDED.intl_equivalence,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 2.5 — Algerian School for Languages (ASL)
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'Algerian School for Languages (ASL)',
  'algerian-school-for-languages-asl-hydra',
  'Langues',
  'Alger',
  'Hydra',
  'Hydra, Alger',
  'L''Algerian School for Languages (ASL), à Hydra, est un centre spécialisé dans la préparation au TOEFL et à l''IELTS, tests requis pour l''admission dans les universités anglophones. Accompagne les étudiants préparant un dossier à l''étranger et les professionnels en quête de validation de leur niveau d''anglais.',
  'Anglais — Préparation TOEFL · IELTS. Admission universités anglophones · Mobilité professionnelle.',
  ARRAY['EN'],
  FALSE,
  FALSE,
  ARRAY[
    'Spécialité TOEFL et IELTS',
    'Préparation admission à l''étranger et mobilité professionnelle'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 2.6 — EF Education First Alger
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'EF Education First Alger',
  'ef-education-first-alger-hydra',
  'Langues',
  'Alger',
  'Hydra',
  'Hydra, Alger',
  'EF Education First est un groupe éducatif international suédois présent dans plus de 50 pays. L''agence algérienne, à Hydra, propose l''organisation de séjours linguistiques à l''étranger (Angleterre, USA, Irlande, Australie…) pour adolescents, adultes et professionnels, ainsi que des cours premium en présentiel à Alger. Intermédiaire entre familles algériennes et campus EF dans le monde.',
  'Séjours linguistiques internationaux · Cours premium en présentiel. Anglais (+ autres selon destination). Public : adolescents · adultes · professionnels.',
  ARRAY['EN'],
  FALSE,
  FALSE,
  ARRAY[
    'Franchise EF — groupe international, +50 pays',
    'Séjours linguistiques (UK, USA, Irlande, Australie…)',
    'Cours premium en présentiel à Alger'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 2.7 — Study Center
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'Study Center',
  'study-center-alger',
  'Langues',
  'Alger',
  'Hydra',
  'Hydra / Alger Centre',
  'Le Study Center est présent à Hydra et Alger Centre. Centre de langues proposant anglais, français, allemand, espagnol et turc. Offre diversifiée incluant le turc, répondant à l''intérêt pour la Turquie comme destination d''études et de tourisme.',
  'Anglais · Français · Allemand · Espagnol · Turc. Multi-langues — dont turc.',
  ARRAY['EN', 'FR', 'DE', 'ES', 'TR'],
  FALSE,
  FALSE,
  ARRAY[
    'Multi-langues : EN, FR, DE, ES, Turc',
    'Présence Hydra et Alger Centre'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 2.8 — My Coach-in
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'My Coach-in',
  'my-coach-in-birkhadem',
  'Langues',
  'Alger',
  'Birkhadem',
  'Birkhadem, Alger',
  'My Coach-in, à Birkhadem, est un centre orienté vers l''anglais actif et le développement des soft skills : prise de parole en public, communication professionnelle, leadership. Approche centrée sur l''usage pratique de la langue en contextes professionnels, alliant apprentissage linguistique et développement personnel.',
  'Anglais actif · Soft skills · Prise de parole · Communication professionnelle · Leadership. Contexte professionnel et développement personnel.',
  ARRAY['EN'],
  FALSE,
  FALSE,
  ARRAY[
    'Anglais actif et soft skills',
    'Prise de parole · Communication professionnelle · Leadership',
    'Usage pratique en contextes professionnels'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 3.1 — ACCA Algérie · Formation PNC Aéronautique
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, annual_cost_range, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'ACCA Algérie · Formation PNC Aéronautique',
  'acca-algerie-formation-pnc-aeronautique-hydra',
  'Formation Pro',
  'Alger',
  'Hydra',
  'Hydra, Alger',
  'ACCA Algérie, à Hydra depuis 2018, est un institut spécialisé dans la formation du personnel navigant commercial (PNC) — hôtesses et stewards. Agréé DACM/ANAC. Formation aux modules réglementaires : CSS (Certificat de Sécurité et de Sauvetage), secourisme aérien, Aero-English, procédures de sécurité en vol. Admission : Bac + critères physiques stricts. Débouchés : compagnies aériennes algériennes et internationales.',
  'PNC — CSS (Certificat de Sécurité et de Sauvetage) · Secourisme aérien · Aero-English · Sécurité en vol. Diplôme d''État obligatoire pour PNC en Algérie. Sessions ~15–25 stagiaires.',
  '~500 000 DA (formation complète PNC)',
  ARRAY['FR', 'EN'],
  TRUE,
  FALSE,
  ARRAY[
    'Agréé DACM / ANAC (Aviation Civile)',
    'Formation PNC complète — CSS obligatoire',
    'Débouchés compagnies aériennes algériennes et internationales',
    'Depuis 2018'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  annual_cost_range    = EXCLUDED.annual_cost_range,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 3.2 — Fly Fra Academy
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'Fly Fra Academy',
  'fly-fra-academy-alger-centre',
  'Formation Pro',
  'Alger',
  'Alger Centre',
  'Alger Centre',
  'Fly Fra Academy, à Alger Centre, est une école de formation aéronautique agréée par l''ANAC. Elle délivre le Certificat de Sécurité et de Sauvetage (CSS), qualification obligatoire pour exercer comme PNC en Algérie. Formateurs experts certifiés du secteur aviation. Accompagnement jusqu''au recrutement en compagnie aérienne : préparation entretiens et tests de sélection.',
  'CSS — Certificat de Sécurité et de Sauvetage (Diplôme d''État). Formation PNC. Accompagnement jusqu''au recrutement en compagnie aérienne.',
  ARRAY['FR', 'EN'],
  TRUE,
  FALSE,
  ARRAY[
    'Agréé ANAC',
    'CSS — qualification obligatoire PNC',
    'Accompagnement jusqu''au recrutement en compagnie aérienne',
    'Formateurs experts certifiés aviation'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 3.3 — Code 213 · Académie Digitale
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, annual_cost_range, languages,
  bac_required, mesrs_recognized, school_partners,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'Code 213 · Académie Digitale',
  'code-213-academie-digitale-val-hydra',
  'Formation Pro',
  'Alger',
  'Hydra',
  'Val d''Hydra, Alger',
  'Code 213, au Val d''Hydra, est une académie digitale agréée MFEP proposant des bootcamps dans les métiers du numérique. Accessible sans diplôme — sélection sur motivation et aptitudes logiques. Approche 100 % pratique, plateforme Noor AI. Formation 6 mois + stage garanti 6 mois en entreprise. Partenariat Simplon.co (France), soutien Wilaya d''Alger et Banque Mondiale. Bourses partielles. Certifications CompTIA.',
  'IA & Machine Learning · Data Science · Fullstack JavaScript · Digital Marketing · Python / Web. Bootcamps 11 à 24 sem. Certifications CompTIA. Stage 6 mois garanti.',
  'Expert IA & ML 49 000 DA · Data Science 199 000 DA · Fullstack JS 129 000 DA · Digital Marketing 99 000 DA · Python/Web 49 000 DA — réduction 10 % paiement en ligne',
  ARRAY['FR', 'EN'],
  FALSE,
  FALSE,
  '["Simplon.co (France)"]'::jsonb,
  ARRAY[
    'Agréé MFEP · Partenariat Simplon.co (France)',
    'Sans diplôme requis — sélection motivation et aptitudes',
    'Stage 6 mois garanti · Bourses partielles',
    'Soutien Wilaya d''Alger + Banque Mondiale'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  annual_cost_range    = EXCLUDED.annual_cost_range,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  school_partners      = EXCLUDED.school_partners,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 3.4 — BMGI Center
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address, website_url,
  description, programmes, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'BMGI Center',
  'bmgi-center-kouba',
  'Formation Pro',
  'Alger',
  'Kouba',
  '15, clos des Orangers, Kouba, Alger',
  'https://bmgi.ws',
  'Le BMGI Center, à Kouba, est un centre de formation et de certification agréé MFEP. Centre agréé Pearson Vue (management, certifications IT) et Certiport (Microsoft, Oracle, Cisco, Linux, Adobe). Formations courtes 2 à 5 jours : management de projet, informatique, bureautique, BTPH, construction métallique, mécanique moteurs, maintenance informatique. Évaluation par projet de mise en situation professionnelle devant jury.',
  'Management · Informatique · Bureautique · BTPH · Construction métallique · Mécanique · Maintenance. Certifications Pearson Vue et Certiport. Formations 2 à 5 jours.',
  ARRAY['FR'],
  NULL,
  FALSE,
  ARRAY[
    'Agréé MFEP · Pearson Vue et Certiport',
    'Certifications Microsoft, Oracle, Cisco, Linux, Adobe',
    'Formations courtes 2 à 5 jours',
    'Projet de mise en situation professionnelle évalué par jury'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  website_url          = EXCLUDED.website_url,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 3.5 — MEDAV
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, annual_cost_range, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'MEDAV',
  'medav-kolea-tipaza',
  'Formation Pro',
  'Tipaza',
  'Koléa',
  'Koléa, Tipaza',
  'MEDAV, à Koléa (Tipaza), propose des formations professionnelles à distance et hybride. Diplômes agréés par l''État (MFEP), tarifs très accessibles. Packs avec accès à vie aux contenus vidéo et diplôme officiel. Domaines : montage vidéo (Premiere, After Effects), design graphique (Illustrator, Photoshop, Canva), secrétariat bureautique, comptabilité, gestion de projet Agile.',
  'Montage vidéo (Adobe Premiere, After Effects) · Design graphique (Illustrator, Photoshop, Canva) · Bureautique · Comptabilité · Gestion de projet Agile. Diplômes agréés État. À distance / Hybride.',
  '~15 000 DA / pack (très accessible)',
  ARRAY['FR'],
  NULL,
  FALSE,
  ARRAY[
    'Agréé État (MFEP) · Formation à distance / hybride',
    'Accès à vie aux contenus vidéo + diplôme officiel',
    'Tarifs très accessibles (~15 000 DA / pack)',
    'Montage vidéo · Design · Bureautique · Comptabilité · Agile'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  annual_cost_range    = EXCLUDED.annual_cost_range,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 3.6 — ITM · Industrie & Management
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'ITM · Industrie & Management',
  'itm-industrie-management-ouled-fayet',
  'Formation Pro',
  'Alger',
  'Ouled Fayet',
  'Ouled Fayet, Alger',
  'L''ITM (Institut Technique et Management), à Ouled Fayet, est un centre de formation professionnelle spécialisé dans les métiers techniques industriels. Formations courtes (quelques jours à quelques semaines) : HSE, électricité industrielle, installation fibre optique FTTH, maintenance informatique. Certifications exigées sur chantiers Sonatrach, opérateurs télécom, BTP.',
  'HSE · Électricité industrielle · Fibre optique FTTH · Maintenance informatique. Formations courtes. Secteurs : Pétrole & Gaz · Télécommunications · BTP.',
  ARRAY['FR'],
  NULL,
  FALSE,
  ARRAY[
    'Agréé État — certifications chantiers industriels',
    'HSE · Fibre optique FTTH · Électricité industrielle',
    'Secteurs Pétrole & Gaz · Télécoms · BTP'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 3.7 — Inter Hotel School (IHS)
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, annual_cost_range, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'Inter Hotel School (IHS) · Arts culinaires',
  'inter-hotel-school-ihs-kouba',
  'Formation Pro',
  'Alger',
  'Kouba',
  'Kouba, Alger',
  'L''Inter Hotel School (IHS), à Kouba, est l''établissement de référence en Algérie pour les arts culinaires, la pâtisserie et la boulangerie. Agréé État (MFEP), diplômes CAP et CQP reconnus. Chefs Salah Eddine Amour et Billel Djehiche. Cuisines professionnelles et laboratoires de pâtisserie. Master Classes (viennoiserie, cake design) pour professionnels.',
  'CAP Pâtisserie / Cuisine (12 mois) · CQP Pâtisserie fine · CQP Boulangerie · Master Classes (viennoiserie, cake design). Diplômes d''État et CQP agréés MFEP.',
  'CAP ~25 000 DA/mois · Master Class Viennoiserie 35 000 DA (3 jours)',
  ARRAY['FR'],
  NULL,
  FALSE,
  ARRAY[
    'Référence nationale arts culinaires et pâtisserie',
    'CAP et CQP agréés État · Chefs Salah Eddine Amour, Billel Djehiche',
    'Cuisines et laboratoires professionnels · Master Classes'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  annual_cost_range    = EXCLUDED.annual_cost_range,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 3.8 — APTI
INSERT INTO institutions (
  name, slug, category,
  wilaya, website_url,
  description, programmes, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'APTI',
  'apti',
  'Formation Pro',
  'Alger',
  'https://apti.dz',
  'APTI est un centre de formation supérieure privé agréé proposant un BTS (Brevet de Technicien Supérieur) en informatique et technologies. Formation Bac+2 sanctionnée par un diplôme d''État reconnu par l''État algérien (MFEP).',
  'BTS Informatique (Bac+2) — diplôme d''État agréé MFEP. Informatique · Technologies.',
  ARRAY['FR'],
  TRUE,
  FALSE,
  ARRAY[
    'Agréé MFEP · BTS Informatique Bac+2',
    'Diplôme d''État reconnu'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  website_url          = EXCLUDED.website_url,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 4.1 — Lycée International Alexandre Dumas (LIAD)
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, annual_cost_range, languages,
  bac_required, mesrs_recognized, intl_equivalence,
  school_partners, points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'Lycée International Alexandre Dumas (LIAD)',
  'lycee-international-alexandre-dumas-liad-ben-aknoun',
  'General',
  'Alger',
  'Ben Aknoun',
  '17, Rue Ali Khodja, Ben Aknoun, Alger',
  'Le Lycée International Alexandre Dumas (LIAD), à Ben Aknoun, est l''établissement scolaire français de référence en Algérie. Homologué AEFE et ministère français de l''Éducation nationale. Programme français intégral, de la maternelle à la terminale, Baccalauréat général français reconnu mondialement. ~2 000 élèves. Frais : ~222 000 DA/an (élèves algériens) à ~730 000 DA/an (étrangers avec internat). Stage de découverte professionnelle obligatoire en 3e. Admission sélective (dossier + tests maths, français, LV).',
  'Maternelle → Terminale. Programme français officiel (AEFE). Brevet des Collèges · Baccalauréat général français. Enseignement renforcé anglais, espagnol, allemand.',
  '~222 000 DA / an (élèves algériens) — jusqu''à ~730 000 DA / an (étrangers avec internat)',
  ARRAY['FR', 'EN', 'ES', 'DE'],
  FALSE,
  FALSE,
  'Bac français reconnu dans ~180 pays',
  '["AEFE — 500+ établissements dans 139 pays"]'::jsonb,
  ARRAY[
    'Homologué AEFE · Programme français officiel',
    'Bac français reconnu dans ~180 pays · Réseau AEFE 500+ établissements',
    '~2 000 élèves · Maternelle à Terminale'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  annual_cost_range    = EXCLUDED.annual_cost_range,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  intl_equivalence     = EXCLUDED.intl_equivalence,
  school_partners      = EXCLUDED.school_partners,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 4.2 — Petite École d'Hydra (PEH / MLF)
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, languages,
  bac_required, mesrs_recognized, school_partners,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'Petite École d''Hydra (PEH / MLF)',
  'petite-ecole-hydra-peh-mlf',
  'General',
  'Alger',
  'Hydra',
  '34, Chemin Kouali, Hydra, Alger',
  'La Petite École d''Hydra (PEH), gérée par la Mission Laïque Française (MLF), au 34 chemin Kouali, Hydra. Établissement primaire homologué par le Ministère français de l''Éducation nationale. Maternelle au CM2, programme français bilingue, éveil culturel et linguistique. Réseau MLF international. Passerelle naturelle vers le LIAD ou autres établissements AEFE pour le secondaire.',
  'Maternelle → CM2 (primaire). Programme français homologué MEN France (MLF). Bilingue Français / Arabe + initiation anglais.',
  ARRAY['FR', 'AR', 'EN'],
  FALSE,
  FALSE,
  '["Mission Laïque Française (MLF)"]'::jsonb,
  ARRAY[
    'Mission Laïque Française (MLF) · Homologué MEN France',
    'Maternelle → CM2 · Programme français bilingue',
    'Passerelle vers LIAD et établissements AEFE'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  school_partners      = EXCLUDED.school_partners,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 4.3 — École La Majorelle
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'École La Majorelle',
  'ecole-la-majorelle-cheraga',
  'General',
  'Alger',
  'Chéraga',
  'Cité 380 Logements, Bât. 42A N°03, Chéraga, Alger',
  'L''École La Majorelle, à Chéraga, est un établissement privé agréé par l''État algérien accueillant plus de 450 élèves de la maternelle au lycée. Enseignement bilingue 50 % français / 50 % anglais dès la petite section. Petites classes, suivi individualisé. FabLab avec initiation STEM et Intelligence Artificielle dès le collège. Préparation au Baccalauréat algérien.',
  'Maternelle → Lycée. Bilingue 50 % FR / 50 % EN. FabLab · STEM · IA dès le collège. Baccalauréat algérien. Petites classes.',
  ARRAY['FR', 'EN'],
  FALSE,
  FALSE,
  ARRAY[
    'Bilingue FR/EN dès la petite section · +450 élèves',
    'FabLab · Initiation STEM et IA dès le collège',
    'Agréé État algérien (MEN)'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 4.4 — École El Manar
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'École El Manar',
  'ecole-el-manar-dely-ibrahim',
  'General',
  'Alger',
  'Dely Ibrahim',
  'Dely Ibrahim, Alger',
  'L''École El Manar, établissement privé historique de Dely Ibrahim, réputée pour sa rigueur académique. Primaire au lycée, préparation au Baccalauréat algérien. Plateforme e-learning pour suivi pédagogique (cours, exercices, résultats en ligne). Accent sur les langues étrangères. Agréé État algérien (MEN).',
  'Primaire → Lycée. Baccalauréat algérien. Plateforme e-learning intégrée. Rigueur académique · Langues étrangères.',
  ARRAY['FR', 'AR', 'EN'],
  FALSE,
  FALSE,
  ARRAY[
    'Plateforme e-learning pour suivi des élèves',
    'Rigueur académique · Langues étrangères',
    'Agréé État algérien (MEN)'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 4.5 — Groupe Scolaire Essalem
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'Groupe Scolaire Essalem',
  'groupe-scolaire-essalem-dely-ibrahim',
  'General',
  'Alger',
  'Dely Ibrahim',
  'Dely Ibrahim, Alger',
  'Le Groupe Scolaire Essalem, à Dely Ibrahim, est un établissement privé agréé couvrant la maternelle au lycée. Préparation au Baccalauréat algérien. Pédagogie classique d''excellence avec fort accent sur le trilinguisme (arabe, français, anglais) et les langues étrangères.',
  'Maternelle → Lycée. Trilingue Arabe · Français · Anglais. Baccalauréat algérien. Pédagogie classique d''excellence.',
  ARRAY['AR', 'FR', 'EN'],
  FALSE,
  FALSE,
  ARRAY[
    'Trilingue AR · FR · EN · Fort accent langues',
    'Maternelle → Lycée · Bac algérien',
    'Agréé État algérien (MEN)'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 4.6 — Groupe Scolaire Nedame (GSN)
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'Groupe Scolaire Nedame (GSN)',
  'groupe-scolaire-nedame-gsn-dar-el-beida',
  'General',
  'Alger',
  'Dar El Beïda',
  'Dar El Beïda, Alger',
  'Le Groupe Scolaire Nedame (GSN), à Dar El Beïda, a fait du trilinguisme précoce (arabe, français, anglais dès la petite section) son identité. Répond aux familles des pôles industriels, technologiques et aéroportuaires de l''Est algérois. Préparation au Baccalauréat algérien. Taux de réussite aux examens officiels : 98 %.',
  'Maternelle → Lycée. Trilingue dès la maternelle — Arabe · Français · Anglais. Baccalauréat algérien. Taux réussite 98 % (BEM + Bac).',
  ARRAY['AR', 'FR', 'EN'],
  FALSE,
  FALSE,
  ARRAY[
    'Trilinguisme dès la maternelle — AR · FR · EN',
    'Taux de réussite 98 % aux examens nationaux',
    'Agréé État algérien (MEN)'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 4.7 — Établissement Salim
INSERT INTO institutions (
  name, slug, category,
  wilaya, address, website_url,
  description, programmes, languages,
  bac_required, mesrs_recognized, has_internat,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'Établissement Salim',
  'etablissement-salim',
  'General',
  'Alger',
  'Alger Plage · Bordj El Bahri · Rouiba (3 sites)',
  'https://etablissementsalim.com',
  'L''Établissement Salim est un groupe scolaire privé agréé implanté sur trois sites dans l''est d''Alger : Alger Plage, Bordj El Bahri et Rouiba. Accompagnement personnalisé des élèves en difficulté, soutien scolaire, classes d''examen (BEM et Bac). Niveau d''exigence académique élevé. Option internat. Apprentissage des langues étrangères.',
  'Primaire → Lycée. Baccalauréat algérien. Accompagnement personnalisé · Soutien · Classes d''examen (BEM, Bac). Internat disponible. Multilingue.',
  ARRAY['AR', 'FR', 'EN'],
  FALSE,
  FALSE,
  TRUE,
  ARRAY[
    '3 sites : Alger Plage · Bordj El Bahri · Rouiba',
    'Accompagnement personnalisé · Classes d''examen BEM/Bac',
    'Internat disponible'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  address              = EXCLUDED.address,
  website_url          = EXCLUDED.website_url,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  has_internat         = EXCLUDED.has_internat,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 4.8 — Groupe Scolaire L'Écureuil
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'Groupe Scolaire L''Écureuil',
  'groupe-scolaire-ecureuil-blida',
  'General',
  'Blida',
  'Blida',
  'Blida',
  'Le Groupe Scolaire L''Écureuil, fondé en 2004 à Blida, est un établissement privé agréé par l''État algérien. Maternelle au lycée, scolarité continue jusqu''au Baccalauréat algérien. Infrastructures modernes. Inscription possible à tout moment de l''année scolaire.',
  'Maternelle → Lycée. Baccalauréat algérien. Scolarité continue. Inscription possible à tout moment de l''année.',
  ARRAY['FR', 'AR'],
  FALSE,
  FALSE,
  ARRAY[
    'Depuis 2004 · Blida',
    'Maternelle → Lycée · Bac algérien',
    'Inscription à tout moment de l''année scolaire'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 4.9 — École Meilleures Générations (EMG)
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'École Meilleures Générations (EMG)',
  'ecole-meilleures-generations-emg-draria',
  'General',
  'Alger',
  'Draria',
  'Draria, Alger',
  'L''École Meilleures Générations (EMG), à Draria, se distingue par une approche centrée sur le bien-être de l''enfant, l''autodiscipline et l''empathie. Pédagogies actives (Montessori, apprentissage par projets) tout en respectant le socle commun du programme national algérien. Maternelle au lycée. Préparation au Baccalauréat algérien. Agréé État algérien (MEN).',
  'Maternelle → Lycée. Pédagogies actives · Bien-être · Autodiscipline · Empathie. Socle commun programme national. Baccalauréat algérien.',
  ARRAY['FR', 'AR'],
  FALSE,
  FALSE,
  ARRAY[
    'Pédagogies actives (Montessori, apprentissage par projets)',
    'Bien-être · Autodiscipline · Empathie',
    'Agréé État algérien (MEN)'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 4.10 — École Éveil Scolaire
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, languages,
  bac_required, mesrs_recognized, intl_equivalence,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'École Éveil Scolaire',
  'ecole-eveil-scolaire-hydra',
  'General',
  'Alger',
  'Hydra',
  'Hydra, Alger',
  'L''École Éveil Scolaire, à Hydra, est un établissement privé titulaire du label France de l''Éducation nationale française, garantissant qualité et continuité pédagogique du préscolaire au lycée. Parcours scolaire complet, pédagogie de haut niveau. Préparation au Baccalauréat algérien avec passerelles vers le système éducatif français grâce au label. Agréé MEN Algérie + Label France.',
  'Préscolaire → Lycée. Label France (MEN France). Baccalauréat algérien. Passerelles vers système français. Continuité pédagogique garantie.',
  ARRAY['FR', 'AR'],
  FALSE,
  FALSE,
  'Label France — passerelles vers système éducatif français',
  ARRAY[
    'Label France (MEN France) — continuité pédagogique garantie',
    'Préscolaire → Lycée · Bac algérien',
    'Passerelles vers système éducatif français'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  intl_equivalence     = EXCLUDED.intl_equivalence,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 5.1 — INOOF · Institut National de l'Optique et de l'Optométrie
INSERT INTO institutions (
  name, slug, category,
  wilaya, commune, address,
  description, programmes, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'INOOF · Institut National de l''Optique et de l''Optométrie',
  'inoof-institut-national-optique-optometrie-hydra',
  'Sante',
  'Alger',
  'Hydra',
  'Hydra, Alger',
  'L''INOOF (Institut National de l''Optique et de l''Optométrie), à Hydra, est agréé par le Ministère de la Santé. Formation au Diplôme d''État d''opticien-lunetier (Bac+2), qualification officielle pour exercer en Algérie. Admission : bacheliers séries scientifiques (M, TM, S). Stages en magasins d''optique ou milieu hospitalier ophtalmologique. Pénurie nationale d''opticiens → insertion rapide.',
  'Diplôme d''État d''opticien-lunetier (Bac+2). Optique médicale · Optométrie. Stages pratiques magasin d''optique / hospitalier. Débouchés : opticien salarié ou indépendant.',
  ARRAY['FR'],
  TRUE,
  FALSE,
  ARRAY[
    'Agréé Ministère de la Santé',
    'Diplôme d''État opticien-lunetier (Bac+2)',
    'Stages pratiques · Insertion rapide (pénurie d''opticiens)'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  commune              = EXCLUDED.commune,
  address              = EXCLUDED.address,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 5.2 — Paramely
INSERT INTO institutions (
  name, slug, category,
  wilaya,
  description, programmes, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'Paramely',
  'paramely-alger',
  'Sante',
  'Alger',
  'Paramely, à Alger, est un établissement privé de formation paramédicale reconnu pour la qualité de ses enseignements pratiques. Forme infirmiers, aides-soignants et manipulateurs en radiologie. Titres officiels reconnus par le Ministère de la Santé, permettant l''exercice légal en cliniques et hôpitaux. Stages cliniques obligatoires intégrés au cursus.',
  'Infirmier · Aide-soignant · Manipulateur en radiologie. Titres officiels reconnus Ministère Santé. Stages cliniques obligatoires. Débouchés : cliniques privées · hôpitaux publics.',
  ARRAY['FR'],
  TRUE,
  FALSE,
  ARRAY[
    'Agréé Ministère de la Santé',
    'Infirmier · Aide-soignant · Manipulateur radiologie',
    'Stages cliniques obligatoires'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 5.3 — Institut Ibn Nafis
INSERT INTO institutions (
  name, slug, category,
  wilaya,
  description, programmes, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'Institut Ibn Nafis',
  'institut-ibn-nafis-alger',
  'Sante',
  'Alger',
  'L''Institut Ibn Nafis, à Alger, est un établissement privé de formation paramédicale (hommage au médecin Ibn al-Nafis). Propose des cycles Technicien Supérieur (TS) Santé (Bac+2) dans diverses spécialités. Stages cliniques obligatoires en établissements de santé conventionnés. Agréé État (Ministère Santé / MFEP).',
  'Technicien Supérieur (TS) Santé — Bac+2. Spécialités paramédicales. Stages cliniques obligatoires en établissements conventionnés.',
  ARRAY['FR'],
  TRUE,
  FALSE,
  ARRAY[
    'Agréé État (Ministère Santé / MFEP)',
    'TS Santé (Bac+2) — spécialités paramédicales',
    'Stages cliniques obligatoires'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;

-- 5.4 — Institut El Taraqui
INSERT INTO institutions (
  name, slug, category,
  wilaya,
  description, programmes, languages,
  bac_required, mesrs_recognized,
  points_forts, data_confidence, is_active, is_verified
)
VALUES (
  'Institut El Taraqui',
  'institut-el-taraqui-alger',
  'Sante',
  'Alger',
  'L''Institut El Taraqui est un établissement privé de formation paramédicale proposant des cycles de Technicien Supérieur (TS) dans diverses spécialités de santé. Stages cliniques obligatoires en partenariat avec des établissements hospitaliers conventionnés. Formation pratique pour une insertion professionnelle dans un marché paramédical à forte demande. Agréé État.',
  'Technicien Supérieur (TS) Santé. Spécialités paramédicales. Stages cliniques obligatoires en établissements hospitaliers conventionnés.',
  ARRAY['FR'],
  TRUE,
  FALSE,
  ARRAY[
    'Agréé État',
    'TS Santé — spécialités paramédicales',
    'Stages cliniques obligatoires'
  ],
  'high',
  TRUE,
  TRUE
)
ON CONFLICT (slug) DO UPDATE SET
  name                 = EXCLUDED.name,
  category             = EXCLUDED.category,
  wilaya               = EXCLUDED.wilaya,
  description          = EXCLUDED.description,
  programmes           = EXCLUDED.programmes,
  languages            = EXCLUDED.languages,
  bac_required         = EXCLUDED.bac_required,
  mesrs_recognized     = EXCLUDED.mesrs_recognized,
  points_forts         = EXCLUDED.points_forts,
  data_confidence      = EXCLUDED.data_confidence,
  is_active            = EXCLUDED.is_active,
  is_verified          = EXCLUDED.is_verified;
