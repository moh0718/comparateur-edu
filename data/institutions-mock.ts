/**
 * Données fictives d'établissements pour le développement.
 * En production : chargement depuis Supabase (table institutions, is_active = true).
 */

export type DataConfidence = "high" | "medium" | "low";
export type ScrapingPriority = "high" | "medium" | "low";
export type InstitutionCategory =
  | "Superieur"
  | "Langues"
  | "Formation Pro"
  | "General"
  | "Sante"
  | "Prescolaire";

export interface Institution {
  id: string;
  name: string;
  slug: string;
  commune?: string | null;
  wilaya?: string | null;
  category?: InstitutionCategory | null;
  description?: string | null;
  website_url?: string | null;
  address?: string | null;
  phone?: string | null;
  opening_hours?: string | null;
  annual_cost_range?: string | null;
  languages?: string[] | null;
  rating?: number | null;
  reviews_count?: number | null;
  data_confidence?: DataConfidence | null;
  is_active?: boolean;
  is_partner?: boolean;
  is_verified?: boolean;
  partner_whatsapp?: string | null;
  logo_url?: string | null;
  points_forts?: string[] | null;
  points_faibles?: string[] | null;
  mesrs_recognized?: boolean | null;
  bac_required?: boolean | null;
  has_internat?: boolean | null;
  has_transport?: boolean | null;
  level_general?: string[] | null;
  instagram_username?: string | null;
  programmes?: string | null;
   /** Priorité de scraping (pour orchestrer Google Places, crawling, etc.). */
   scraping_priority?: ScrapingPriority | null;
   /** Coordonnées géographiques (latitude/longitude) dérivées de Google Places. */
   latitude?: number | null;
   longitude?: number | null;
   /** Adresse formatée et horaires tels que renvoyés par Google Places (facultatif si déjà mappé). */
   google_place_formatted_address?: string | null;
   google_place_opening_hours?: string | null;
   /** Identifiant Google Places pour rafraîchir les données plus tard. */
   google_place_id?: string | null;
}

export const institutionsMock: Institution[] = [
  {
    id: "1",
    name: "École Supérieure de Commerce Alger",
    slug: "ecole-superieure-commerce-alger",
    commune: "Alger",
    wilaya: "Alger",
    category: "Superieur",
    description: "Formation en commerce et management reconnue.",
    annual_cost_range: "200 000 - 450 000 DA",
    languages: ["FR", "EN"],
    data_confidence: "high",
    is_partner: true,
    is_verified: true,
    points_forts: ["Réseau entreprises", "Stages garantis"],
    logo_url: null,
    mesrs_recognized: true,
    bac_required: true,
  },
  {
    id: "2",
    name: "Campus Langues Blida",
    slug: "campus-langues-blida",
    commune: "Blida",
    wilaya: "Blida",
    category: "Langues",
    annual_cost_range: "80 000 - 150 000 DA",
    languages: ["FR", "AR", "Bilingue"],
    data_confidence: "medium",
    is_partner: false,
    is_verified: false,
    points_forts: ["Anglais, français, arabe", "Préparation TOEFL"],
  },
  {
    id: "3",
    name: "Lycée Privé Les Glycines",
    slug: "lycee-prive-les-glycines",
    commune: "Tipaza",
    wilaya: "Tipaza",
    category: "General",
    level_general: ["Lycee"],
    annual_cost_range: "150 000 - 280 000 DA",
    languages: ["FR"],
    data_confidence: "high",
    is_partner: true,
    is_verified: true,
    points_forts: ["Taux réussite bac élevé", "Internat"],
    has_internat: true,
    has_transport: true,
  },
  {
    id: "4",
    name: "Institut Formation Pro Boumerdès",
    slug: "institut-formation-pro-boumerdes",
    commune: "Boumerdès",
    wilaya: "Boumerdès",
    category: "Formation Pro",
    annual_cost_range: "100 000 - 220 000 DA",
    languages: ["FR"],
    data_confidence: "medium",
    is_partner: false,
    points_forts: ["Certifications reconnues", "Partenariats entreprises"],
  },
  {
    id: "5",
    name: "École Maternelle Les Petits Génies",
    slug: "ecole-maternelle-petits-genies",
    commune: "Alger",
    wilaya: "Alger",
    category: "Prescolaire",
    level_general: ["Maternelle"],
    annual_cost_range: "60 000 - 120 000 DA",
    languages: ["FR", "AR", "Bilingue"],
    data_confidence: "low",
    is_partner: false,
    points_forts: ["Éveil bilingue", "Activités créatives"],
  },
  {
    id: "6",
    name: "Institut Santé Alger",
    slug: "institut-sante-alger",
    commune: "Alger",
    wilaya: "Alger",
    category: "Sante",
    annual_cost_range: "300 000 - 600 000 DA",
    languages: ["FR"],
    data_confidence: "high",
    is_partner: true,
    is_verified: true,
    mesrs_recognized: true,
    points_forts: ["Formations paramédicales", "Stages en cliniques"],
  },
  // 1.1 — IFAG (données manuelles Mars 2026)
  {
    id: "ifag-hydra",
    name: "IFAG · Institut de Formation en Administration et Gestion",
    slug: "ifag-institut-formation-administration-gestion-hydra",
    commune: "Hydra",
    wilaya: "Alger",
    category: "Superieur",
    description:
      "L'IFAG, situé à Hydra, Alger, est un établissement privé d'enseignement supérieur fondé dans les années 1990 au sein du groupe INSAG. Agréé MESRS (arrêté n°341 du 11 avril 2018), il délivre des diplômes nationaux LMD de la Licence au Master. Filières : marketing, management, comptabilité, finance, informatique de gestion. Pédagogie axée sur la professionnalisation, +8 000 diplômés depuis 1991, +48 entreprises partenaires. Taux d'insertion groupe INSAG (étude Emploitic) : 95,76 %.",
    address: "Rue Belle Vue, GP66, Lot 49, Hydra, Alger",
    website_url: "https://ifag.edu.dz",
    annual_cost_range: "450 000 – 650 000 DA / an (est. 2025-2026)",
    languages: ["FR", "EN"],
    programmes:
      "Marketing & Commerce · Comptabilité & Finance · Informatique de gestion · Management (Master). Licence LMD (Bac+3) + Master LMD (Bac+5) — diplômes nationaux d'État.",
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: true,
    bac_required: true,
    points_forts: [
      "Agréé MESRS (arrêté n°341 du 11/04/2018)",
      "Taux d'insertion 95,76 % (groupe INSAG — Emploitic 2025)",
      "+48 entreprises partenaires",
      "Stage PFE obligatoire",
      "Équivalence possible RNCP France, WES USA/Canada pour MBA",
    ],
  },
  // 1.2 — INSIM (données manuelles Mars 2026)
  {
    id: "insim-hydra",
    name: "INSIM · Institut Supérieur de Management (cycle BTS)",
    slug: "insim-institut-superieur-management-bts-hydra",
    commune: "Hydra",
    wilaya: "Alger",
    category: "Formation Pro",
    description:
      "L'INSIM, fondé en 1994 à Hydra, est l'un des premiers établissements privés de formation professionnelle supérieure en Algérie. BTS d'État (Bac+2) du MFEP, 24 mois d'enseignement + 6 mois de stage obligatoire. Spécialités : informatique de gestion, commerce international, marketing, comptabilité, tourisme et hôtellerie. Réseau national (12 villes), +3 000 diplômés. Partenaires : Sonatrach, Air Algérie, multinationales. Passerelles vers Bachelor (Bac+3) ou MBA (Bac+5).",
    address: "Hydra (siège) + 11 antennes à travers l'Algérie",
    website_url: "https://insim.dz",
    annual_cost_range: "400 000 – 700 000 DA / an (est. 2025-2026)",
    languages: ["FR"],
    programmes:
      "Informatique de gestion · Commerce international · Marketing · Comptabilité · Tourisme & Hôtellerie · RH. BTS d'État (Bac+2) — diplôme officiel MFEP + Diplôme DESS INSIM.",
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: true,
    points_forts: [
      "Agréé MFEP depuis 1994",
      "Taux de réussite aux examens >95 %",
      "6 mois de stage obligatoire + mémoire",
      "Passerelles Collège de Sherbrooke, UQAM (Canada)",
      "Réseau : Sonatrach, Air Algérie, multinationales",
    ],
  },
  // 1.3 — INSIM SUP (données manuelles Mars 2026)
  {
    id: "insim-sup-hydra",
    name: "INSIM SUP · Université privée (cycle Licence & Master)",
    slug: "insim-sup-universite-privee-licence-master-hydra",
    commune: "Hydra",
    wilaya: "Alger",
    category: "Superieur",
    description:
      "INSIM SUP est la branche universitaire du groupe INSIM, agréée MESRS (arrêté n°845 du 30 octobre 2022). Licence (Bac+3) et Master (Bac+5) en sciences économiques, gestion, marketing digital, finance, informatique et intelligence artificielle. Offre bilingue avec spécialités en anglais (Business English, International Business). Business school à vocation internationale avec partenariats académiques à l'étranger.",
    website_url: "https://insimsup.dz",
    annual_cost_range: "400 000 – 700 000 DA / an (estimation)",
    languages: ["FR", "EN"],
    programmes:
      "Sciences éco · Gestion · Marketing digital · Finance · Informatique · IA · Business English · Commerce international. Licence LMD (Bac+3) + Master LMD (Bac+5) — diplômes nationaux d'État.",
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: true,
    bac_required: true,
    points_forts: [
      "Agréé MESRS (arrêté n°845 du 30/10/2022)",
      "Licence + Master LMD nationaux",
      "Enseignement bilingue FR/EN — spécialités en anglais",
      "Partenariats académiques internationaux",
    ],
  },
  // 1.4 — EM Alger Business School (données manuelles Mars 2026)
  {
    id: "em-alger-hydra",
    name: "EM Alger Business School",
    slug: "em-alger-business-school-hydra",
    commune: "Hydra",
    wilaya: "Alger",
    address: "17, Rue Abdelkader Gadouche, Hydra, Alger",
    category: "Superieur",
    description:
      "L'EM Alger Business School, établie à Hydra, est une école supérieure privée de management agréée par le MESRS. Cursus du Bachelor (Bac+3) au MBA (Bac+5) : finance, marketing, management international, commerce. 30 enseignants-chercheurs, 8 partenaires entreprises, ~700 alumni. Partenariat avec l'ENAP (Québec). Admission ouverte aux bacheliers, licenciés et salariés en reprise d'études. Taux de réussite aux examens : 95 %.",
    website_url: "https://em-alger.com",
    annual_cost_range: "500 000 – 750 000 DA / an",
    languages: ["FR", "EN"],
    programmes:
      "Finance · Marketing · Management international · Commerce. Bachelor (Bac+3) · Licence LMD · Master · MBA — diplômes nationaux.",
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: true,
    bac_required: true,
    points_forts: [
      "Agréé MESRS",
      "Partenariat ENAP Québec (Canada)",
      "30 enseignants-chercheurs · ~700 alumni",
      "Taux de réussite 95 % aux examens",
      "Admission ouverte — bacheliers, licenciés, salariés",
    ],
  },
  // 1.5 — INSAG Business School (données manuelles Mars 2026)
  {
    id: "insag-business-school-hydra",
    name: "INSAG Business School",
    slug: "insag-business-school-hydra",
    commune: "Hydra",
    wilaya: "Alger",
    category: "Superieur",
    description:
      "L'INSAG Business School, à Hydra, est l'une des premières écoles privées de management agréées en Algérie et la tête de groupe de l'écosystème INSAG (dont fait partie l'IFAG). MBA et Masters spécialisés : transformation digitale, finance internationale, management stratégique. Double reconnaissance internationale : diplômes enregistrés au RNCP (France) et reconnus par WES (équivalence Master USA/Canada). +8 000 alumni depuis 1991, 5 partenaires académiques internationaux. Taux d'insertion groupe INSAG (Emploitic 2025) : 95,76 %.",
    website_url: "https://insag.edu.dz",
    annual_cost_range: "600 000 – 900 000 DA / an",
    languages: ["FR", "EN"],
    programmes:
      "Transformation digitale · Finance internationale · Management stratégique · E-business. MBA · Master (Bac+5) — diplômes nationaux + RNCP France + WES USA/Canada.",
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: true,
    bac_required: true,
    points_forts: [
      "Agréé MESRS — l'un des premiers historiquement",
      "RNCP France + WES (équivalence Master USA/Canada)",
      "+8 000 alumni depuis 1991",
      "5 Business Schools partenaires internationales",
      "Taux d'insertion 95,76 % (groupe INSAG — Emploitic 2025)",
    ],
  },
  // 1.6 — ESST (données manuelles Mars 2026)
  {
    id: "esst-el-achour",
    name: "ESST · École Supérieure des Sciences et Technologies",
    slug: "esst-ecole-superieure-sciences-technologies-el-achour",
    commune: "El Achour",
    wilaya: "Alger",
    address: "Butte des deux bassins, El Achour, Alger",
    category: "Superieur",
    description:
      "L'ESST, à El Achour, est le premier établissement universitaire privé en Algérie entièrement dédié aux sciences exactes et aux technologies. Agréée MESRS, système LMD : Licence (Bac+3) et Master (Bac+5) en informatique (ISIL, SASR, DLTW, Big Data, IA), chimie pharmaceutique et sciences & techniques. Partenariat EFREI Paris. Partenaires industriels : Condor, Mobilis, Novartis, Ooredoo. Stage obligatoire dès la 2e année (L2). Admission sélective réservée aux bacheliers des séries scientifiques. Taux de réussite 2025 : 100 % annoncé.",
    website_url: "https://esst-sup.com",
    annual_cost_range: "450 000 – 650 000 DA / an",
    languages: ["FR", "EN"],
    programmes:
      "Informatique (ISIL, SASR, DLTW, Big Data, IA) · Chimie pharmaceutique · Sciences & Techniques · Télécoms · Cybersécurité. Licence LMD (Bac+3) + Master LMD (Bac+5) — diplômes nationaux d'État.",
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: true,
    bac_required: true,
    points_forts: [
      "Agréé MESRS — 1er établissement privé dédié sciences & tech",
      "Partenariat EFREI Paris (France)",
      "Partenaires industriels : Condor, Mobilis, Novartis, Ooredoo",
      "Stage obligatoire dès L2 · Taux de réussite 100 % (2025)",
      "Admission sélective — séries scientifiques (M, TM, S)",
    ],
  },
  // 1.7 — EFTG Sup (données manuelles Mars 2026)
  {
    id: "eftg-sup-dely-ibrahim",
    name: "EFTG Sup · École de Gestion",
    slug: "eftg-sup-ecole-gestion-dely-ibrahim",
    commune: "Dely Ibrahim",
    wilaya: "Alger",
    address: "Dely Ibrahim / Chéraga, Alger",
    category: "Superieur",
    description:
      "L'EFTG Sup, à Dely Ibrahim, revendique le statut de première école supérieure de gestion privée agréée en Algérie (fondation 1992). Agrément MESRS renouvelé arrêté n°397/2018. 6 Licences et 5 Masters : commerce international, systèmes informatiques, marketing digital, management hôtelier. Enseignement trilingue (français, anglais, espagnol). Incubateur GEM-START pour l'accompagnement entrepreneurial. Option double diplôme international. Stage intégré + soutenance mémoire devant jury de professionnels.",
    website_url: "https://eftg-sup.com",
    annual_cost_range: "150 000 – 300 000 DA / an (estimation)",
    languages: ["FR", "EN", "ES"],
    programmes:
      "Commerce international · Systèmes informatiques · Marketing digital · Management hôtelier (Master). 6 Licences + 5 Masters LMD (Bac+3 / Bac+5) — option double diplôme international.",
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: true,
    bac_required: true,
    points_forts: [
      "Agréé MESRS (arrêté n°397/2018) — 1ère agréée dès 1992",
      "Enseignement trilingue FR · EN · ES",
      "Incubateur GEM-START (accompagnement entrepreneurial)",
      "Option double diplôme international",
      "Stage intégré + soutenance mémoire professionnel",
    ],
  },
  // 1.8 — NCUK Algeria (données manuelles Mars 2026)
  {
    id: "ncuk-algeria-dely-ibrahim",
    name: "NCUK Algeria · Centre International d'Études d'Alger",
    slug: "ncuk-algeria-centre-international-etudes-alger",
    commune: "Dely Ibrahim",
    wilaya: "Alger",
    address: "Dely Ibrahim, Alger",
    category: "Superieur",
    description:
      "NCUK Algeria (Algeria International Study Centre), à Dely Ibrahim, est un centre de préparation affilié au réseau NCUK (Northern Consortium UK). Il offre aux bacheliers des qualifications britanniques (UK ENIC) pour un accès direct aux universités partenaires au Royaume-Uni, en Australie, aux USA et au Canada. Programme phare : International Foundation Year (IFY) ; Master's Preparation disponible. Enseignement exclusivement en anglais par locuteurs natifs. Admission : Bac min. 10/20 + Password Test (5 000 DA). 99 % de succès visa, 90 % intègrent l'université de leur 1er choix. Accompagnement : orientation, dossiers de candidature, aide visa, logement à l'étranger. Ne délivre pas de diplôme national algérien — destiné aux études à l'étranger.",
    website_url: "https://ncukalgeria.com",
    annual_cost_range: "~13 000 USD / an (2025)",
    languages: ["EN"],
    programmes:
      "International Foundation Year (IFY) · Master's Preparation — qualifications britanniques (UK ENIC). Accès direct universités partenaires (Manchester, Birmingham, Leeds, Bristol, Sheffield…).",
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: true,
    points_forts: [
      "Qualification UK (UK ENIC) — accès direct universités UK, Australie, USA, Canada",
      "99 % succès visa · 90 % obtiennent université 1er choix",
      "Enseignement 100 % anglais — locuteurs natifs",
      "Accompagnement complet : orientation, dossiers, visa, logement à l'étranger",
      "Password Test 5 000 DA — Bac min. 10/20 requis",
    ],
  },
  // 1.9 — MDI Algiers Business School (données manuelles Mars 2026)
  {
    id: "mdi-algiers-cheraga",
    name: "MDI Algiers Business School (ex-MGP)",
    slug: "mdi-algiers-business-school-cheraga",
    commune: "Chéraga",
    wilaya: "Alger",
    address: "Chéraga, Alger",
    category: "Superieur",
    description:
      "La MDI Algiers Business School (ex-MGP — Management et Développement International), à Chéraga, est l'un des tout premiers établissements privés d'enseignement supérieur en management agréés en Algérie. Précurseur du secteur, elle propose des formations en management, finance et commerce international, selon un modèle pédagogique proche des grandes écoles. Diplômes nationaux Licence + Master. Informations détaillées (programmes, coûts, insertion) limitées publiquement.",
    website_url: "https://mdi-alger.com",
    languages: ["FR"],
    programmes:
      "Management · Finance · Commerce international. Licence + Master — diplômes nationaux.",
    data_confidence: "medium",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: true,
    bac_required: true,
    points_forts: [
      "Agréé MESRS — l'un des premiers privés historiquement",
      "Management · Finance · Commerce international",
      "Modèle pédagogique type grande école",
    ],
  },
  // 1.10 — CESI Algérie (données manuelles Mars 2026)
  {
    id: "cesi-algerie",
    name: "CESI Algérie",
    slug: "cesi-algerie",
    wilaya: "Alger",
    category: "Formation Pro",
    description:
      "CESI Algérie est la filiale algérienne du groupe français CESI, agréée MFEP depuis 2003. Formations en management et technologies de l'information : Bac+2 (Technicien Supérieur) au Bac+5 (cycle ingénieur CESI via Exia). Certifications professionnelles et titre d'ingénieur CESI reconnus par l'État algérien, hors système LMD. Équivalence RNCP France via CESI France. +5 000 personnes formées/an, 280 entreprises partenaires (dont Sonatrach), +200 experts. Formations continues entreprises.",
    website_url: "https://cesi-algerie.com",
    languages: ["FR"],
    programmes:
      "Management · Technologies de l'information · Informatique (Exia, titre ingénieur Bac+5). Certifications CESI Bac+2 à Bac+5 · Formation continue entreprises.",
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: true,
    points_forts: [
      "Agréé MFEP depuis 2003 — filiale CESI France",
      "+5 000 formés/an · 280 entreprises partenaires (dont Sonatrach)",
      "Certifications RNCP France · Titre ingénieur CESI (Exia)",
      "+200 experts intervenants · +1 000 diplômés",
    ],
  },
  // 1.11 — ESG Educaform (données manuelles Mars 2026)
  {
    id: "esg-educaform-birkhadem",
    name: "ESG Educaform · École Supérieure de Gestion",
    slug: "esg-educaform-ecole-superieure-gestion-birkhadem",
    commune: "Birkhadem",
    wilaya: "Alger",
    address: "Birkhadem, Alger",
    category: "Formation Pro",
    description:
      "L'ESG Educaform, à Birkhadem, est un organisme de formation continue et de coaching pour cadres supérieurs et dirigeants. Séminaires intensifs (2 à 5 jours) et formations de moyenne durée (FMD) : trésorerie, supply chain, gestion de crise, GPEC, management opérationnel. Partenaire des DRH et Directions Générales des grandes entreprises. Séminaires en hôtel 5* (Hyatt Regency) ou au siège. Certifications et attestations — pas de diplôme national LMD. Hors MESRS.",
    website_url: "https://esgalgerie.com",
    annual_cost_range: "Séminaires : ~21 000 – 25 000 DA / participant / jour",
    languages: ["FR"],
    programmes:
      "Formation continue · Trésorerie · Supply chain · Gestion de crise · GPEC · Management opérationnel. Séminaires 2–5 jours · FMD. Public : cadres, DRH, DG.",
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: false,
    points_forts: [
      "Formation continue cadres et dirigeants",
      "Séminaires 2–5 jours · FMD · Partenaire DRH et DG",
      "Prestations Hyatt Regency ou au siège",
    ],
  },
  // 1.12 — CACI Formation (données manuelles Mars 2026)
  {
    id: "caci-formation-mohammadia",
    name: "CACI Formation",
    slug: "caci-formation-mohammadia",
    commune: "Mohammadia",
    wilaya: "Alger",
    address: "Mohammadia, Alger",
    category: "Formation Pro",
    description:
      "CACI Formation, rattachée à la Chambre Algérienne de Commerce et d'Industrie (CACI), à Mohammadia, propose des formations diplômantes de niveau Technicien Supérieur (TS) en commerce, ressources humaines et marketing. Émanation d'un organisme consulaire officiel : reconnaissance étatique et ancrage dans le réseau des entreprises membres de la chambre de commerce.",
    website_url: "https://formations.caci.dz",
    languages: ["FR"],
    programmes:
      "Commerce · Ressources humaines · Marketing. Technicien Supérieur (TS) agréé État.",
    data_confidence: "medium",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: true,
    points_forts: [
      "Rattaché à la CACI (Chambre de Commerce officielle)",
      "Diplôme TS agréé État — Commerce · RH · Marketing",
      "Réseau des entreprises membres de la chambre",
    ],
  },
  // 2.1 — Berlitz Algérie (données manuelles Mars 2026)
  {
    id: "berlitz-algerie-hydra",
    name: "Berlitz Algérie",
    slug: "berlitz-algerie-hydra",
    commune: "Hydra",
    wilaya: "Alger",
    address: "Hydra, Alger",
    category: "Langues",
    description:
      "Berlitz Algérie, franchise du groupe international Berlitz depuis 2002, à Hydra. Méthode d'immersion totale (langue cible dès la première leçon). 13 salles sur 3 niveaux. Catalogue : anglais, français, espagnol, allemand, coréen, japonais, russe. Public : particuliers (adultes et enfants), entreprises, institutions. Groupes limités à 9 personnes ; cours en présentiel et en ligne. Préparation IELTS, TOEFL, TOEIC.",
    website_url: "https://www.berlitz.com/fr-fr/algerie",
    languages: ["FR", "EN", "ES", "DE", "KR", "JA", "RU"],
    programmes:
      "Anglais · Français · Espagnol · Allemand · Coréen · Japonais · Russe. Préparation IELTS · TOEFL · TOEIC · Attestations Berlitz. Groupes max 9 · Cours 1-à-1 · Présentiel et en ligne.",
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: false,
    points_forts: [
      "Franchise Berlitz International depuis 2002",
      "Immersion totale — langue cible dès la 1re leçon",
      "13 salles · Groupes max 9 · Présentiel + en ligne",
      "Préparation IELTS, TOEFL, TOEIC",
      "Particuliers, entreprises, gouvernements",
    ],
  },
  // 2.2 — Institut Torii (données manuelles Mars 2026)
  {
    id: "institut-torii-el-achour",
    name: "Institut Torii",
    slug: "institut-torii-el-achour",
    commune: "El Achour",
    wilaya: "Alger",
    address: "El Achour, Alger",
    category: "Langues",
    description:
      "L'Institut Torii, à El Achour, est le centre de référence en Algérie pour les langues d'Asie orientale. Préparation aux certifications officielles : JLPT (japonais, N5→N1), TOPIK (coréen), HSK (mandarin). Indispensables pour les bourses MEXT (Japon), NIIED (Corée), CSC (Chine) et pour les carrières en Asie. Forte communauté : +15 000 abonnés Instagram.",
    annual_cost_range: "Japonais à partir de 16 000 DA/session · Coréen 15 000 DA/session · Mandarin 20 000 DA/session",
    languages: ["JA", "KR", "ZH"],
    programmes:
      "Japonais (JLPT N5→N1) · Coréen (TOPIK) · Mandarin (HSK). Préparation bourses MEXT, NIIED, CSC. Certifications reconnues par les gouvernements japonais, coréen et chinois.",
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: false,
    instagram_username: "instituttorii",
    points_forts: [
      "Référence nationale langues asiatiques — JLPT · TOPIK · HSK",
      "Bourses MEXT (Japon) · NIIED (Corée) · CSC (Chine)",
      "Certifications reconnues gouvernements JP/KR/CN",
      "+15 000 abonnés Instagram",
    ],
  },
  // 2.3 — DaF Akademie / DSIA (données manuelles Mars 2026)
  {
    id: "daf-akademie-dsia-hydra",
    name: "DaF Akademie / DSIA",
    slug: "daf-akademie-dsia-hydra",
    commune: "Hydra",
    wilaya: "Alger",
    address: "Hydra, Alger",
    category: "Langues",
    description:
      "La DaF Akademie et le DSIA, à Hydra, sont les centres de référence pour l'allemand en Algérie. Partenaires du Goethe-Institut, ils préparent aux examens officiels selon le CECRL (A1→C2). Diplômes Goethe reconnus par les ambassades allemande et autrichienne pour visas (études, travail, regroupement familial) et par les universités allemandes. Préparation TestDaF et ÖSD.",
    languages: ["DE"],
    programmes:
      "Allemand — Examens Goethe-Institut (A1→C2) · TestDaF · ÖSD. Méthode CECRL. Reconnaissance ambassades et universités allemandes (souvent gratuites ou à faible coût).",
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: false,
    points_forts: [
      "Partenaire Goethe-Institut Algérie",
      "Examens officiels A1→C2 (CECRL) · TestDaF · ÖSD",
      "Reconnu ambassades Allemagne/Autriche — visas études et travail",
      "Accès universités allemandes (souvent gratuites)",
    ],
  },
  // 2.4 — IN-tuition (données manuelles Mars 2026)
  {
    id: "in-tuition-alger",
    name: "IN-tuition",
    slug: "in-tuition-alger",
    commune: "Hydra",
    wilaya: "Alger",
    address: "Saïd Hamdine / Hydra, Alger · Réseau 16 wilayas",
    category: "Langues",
    description:
      "IN-tuition, fondé en 2003, dispose d'agences à Saïd Hamdine et Hydra et d'un réseau national dans 16 wilayas. Spécialisé en langues pour particuliers et entreprises. Préparation aux tests standardisés : TOEFL (études USA/Canada), GRE (3e cycle aux États-Unis), TEF (immigration Canada). Formations sur mesure entreprises. 51 à 200 employés, plus de 20 ans d'activité.",
    languages: ["FR", "EN"],
    programmes:
      "Anglais · Français · Autres langues. Préparation TOEFL · GRE · TEF (Canada). Attestations IN-tuition. Particuliers et entreprises (formations sur mesure). Présentiel et en ligne.",
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: false,
    points_forts: [
      "Depuis 2003 · Réseau 16 wilayas",
      "Préparation TOEFL · GRE · TEF (immigration Canada)",
      "Formations sur mesure entreprises",
      "Présentiel et en ligne",
    ],
  },
  // 2.5 — Algerian School for Languages (données manuelles Mars 2026)
  {
    id: "asl-hydra",
    name: "Algerian School for Languages (ASL)",
    slug: "algerian-school-for-languages-asl-hydra",
    commune: "Hydra",
    wilaya: "Alger",
    address: "Hydra, Alger",
    category: "Langues",
    description:
      "L'Algerian School for Languages (ASL), à Hydra, est un centre spécialisé dans la préparation au TOEFL et à l'IELTS, tests requis pour l'admission dans les universités anglophones. Accompagne les étudiants préparant un dossier à l'étranger et les professionnels en quête de validation de leur niveau d'anglais.",
    languages: ["EN"],
    programmes:
      "Anglais — Préparation TOEFL · IELTS. Admission universités anglophones · Mobilité professionnelle.",
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: false,
    points_forts: [
      "Spécialité TOEFL et IELTS",
      "Préparation admission à l'étranger et mobilité professionnelle",
    ],
  },
  // 2.6 — EF Education First Alger (données manuelles Mars 2026)
  {
    id: "ef-education-first-alger-hydra",
    name: "EF Education First Alger",
    slug: "ef-education-first-alger-hydra",
    commune: "Hydra",
    wilaya: "Alger",
    address: "Hydra, Alger",
    category: "Langues",
    description:
      "EF Education First est un groupe éducatif international suédois présent dans plus de 50 pays. L'agence algérienne, à Hydra, propose l'organisation de séjours linguistiques à l'étranger (Angleterre, USA, Irlande, Australie…) pour adolescents, adultes et professionnels, ainsi que des cours premium en présentiel à Alger. Intermédiaire entre familles algériennes et campus EF dans le monde.",
    languages: ["EN"],
    programmes:
      "Séjours linguistiques internationaux · Cours premium en présentiel. Anglais (+ autres selon destination). Public : adolescents · adultes · professionnels.",
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: false,
    points_forts: [
      "Franchise EF — groupe international, +50 pays",
      "Séjours linguistiques (UK, USA, Irlande, Australie…)",
      "Cours premium en présentiel à Alger",
    ],
  },
  // 2.7 — Study Center (données manuelles Mars 2026)
  {
    id: "study-center-alger",
    name: "Study Center",
    slug: "study-center-alger",
    commune: "Hydra",
    wilaya: "Alger",
    address: "Hydra / Alger Centre",
    category: "Langues",
    description:
      "Le Study Center est présent à Hydra et Alger Centre. Centre de langues proposant anglais, français, allemand, espagnol et turc. Offre diversifiée incluant le turc, répondant à l'intérêt pour la Turquie comme destination d'études et de tourisme.",
    languages: ["EN", "FR", "DE", "ES", "TR"],
    programmes:
      "Anglais · Français · Allemand · Espagnol · Turc. Multi-langues — dont turc.",
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: false,
    points_forts: [
      "Multi-langues : EN, FR, DE, ES, Turc",
      "Présence Hydra et Alger Centre",
    ],
  },
  // 2.8 — My Coach-in (données manuelles Mars 2026)
  {
    id: "my-coach-in-birkhadem",
    name: "My Coach-in",
    slug: "my-coach-in-birkhadem",
    commune: "Birkhadem",
    wilaya: "Alger",
    address: "Birkhadem, Alger",
    category: "Langues",
    description:
      "My Coach-in, à Birkhadem, est un centre orienté vers l'anglais actif et le développement des soft skills : prise de parole en public, communication professionnelle, leadership. Approche centrée sur l'usage pratique de la langue en contextes professionnels, alliant apprentissage linguistique et développement personnel.",
    languages: ["EN"],
    programmes:
      "Anglais actif · Soft skills · Prise de parole · Communication professionnelle · Leadership. Contexte professionnel et développement personnel.",
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: false,
    points_forts: [
      "Anglais actif et soft skills",
      "Prise de parole · Communication professionnelle · Leadership",
      "Usage pratique en contextes professionnels",
    ],
  },
  // 3.1 — ACCA Algérie · Formation PNC Aéronautique (données manuelles Mars 2026)
  {
    id: "acca-algerie-hydra",
    name: "ACCA Algérie · Formation PNC Aéronautique",
    slug: "acca-algerie-formation-pnc-aeronautique-hydra",
    commune: "Hydra",
    wilaya: "Alger",
    address: "Hydra, Alger",
    category: "Formation Pro",
    description:
      "ACCA Algérie, à Hydra depuis 2018, est un institut spécialisé dans la formation du personnel navigant commercial (PNC) — hôtesses et stewards. Agréé DACM/ANAC. Formation aux modules réglementaires : CSS (Certificat de Sécurité et de Sauvetage), secourisme aérien, Aero-English, procédures de sécurité en vol. Admission : Bac + critères physiques stricts. Débouchés : compagnies aériennes algériennes et internationales.",
    programmes:
      "PNC — CSS (Certificat de Sécurité et de Sauvetage) · Secourisme aérien · Aero-English · Sécurité en vol. Diplôme d'État obligatoire pour PNC en Algérie. Sessions ~15–25 stagiaires.",
    annual_cost_range: "~500 000 DA (formation complète PNC)",
    languages: ["FR", "EN"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: true,
    points_forts: [
      "Agréé DACM / ANAC (Aviation Civile)",
      "Formation PNC complète — CSS obligatoire",
      "Débouchés compagnies aériennes algériennes et internationales",
      "Depuis 2018",
    ],
  },
  // 3.2 — Fly Fra Academy (données manuelles Mars 2026)
  {
    id: "fly-fra-academy-alger-centre",
    name: "Fly Fra Academy",
    slug: "fly-fra-academy-alger-centre",
    commune: "Alger Centre",
    wilaya: "Alger",
    address: "Alger Centre",
    category: "Formation Pro",
    description:
      "Fly Fra Academy, à Alger Centre, est une école de formation aéronautique agréée par l'ANAC. Elle délivre le Certificat de Sécurité et de Sauvetage (CSS), qualification obligatoire pour exercer comme PNC en Algérie. Formateurs experts certifiés du secteur aviation. Accompagnement jusqu'au recrutement en compagnie aérienne : préparation entretiens et tests de sélection.",
    programmes:
      "CSS — Certificat de Sécurité et de Sauvetage (Diplôme d'État). Formation PNC. Accompagnement jusqu'au recrutement en compagnie aérienne.",
    languages: ["FR", "EN"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: true,
    points_forts: [
      "Agréé ANAC",
      "CSS — qualification obligatoire PNC",
      "Accompagnement jusqu'au recrutement en compagnie aérienne",
      "Formateurs experts certifiés aviation",
    ],
  },
  // 3.3 — Code 213 (données manuelles Mars 2026)
  {
    id: "code-213-val-hydra",
    name: "Code 213 · Académie Digitale",
    slug: "code-213-academie-digitale-val-hydra",
    commune: "Hydra",
    wilaya: "Alger",
    address: "Val d'Hydra, Alger",
    category: "Formation Pro",
    description:
      "Code 213, au Val d'Hydra, est une académie digitale agréée MFEP proposant des bootcamps dans les métiers du numérique. Accessible sans diplôme — sélection sur motivation et aptitudes logiques. Approche 100 % pratique, plateforme Noor AI. Formation 6 mois + stage garanti 6 mois en entreprise. Partenariat Simplon.co (France), soutien Wilaya d'Alger et Banque Mondiale. Bourses partielles. Certifications CompTIA.",
    annual_cost_range: "Expert IA & ML 49 000 DA · Data Science 199 000 DA · Fullstack JS 129 000 DA · Digital Marketing 99 000 DA · Python/Web 49 000 DA — réduction 10 % paiement en ligne",
    programmes:
      "IA & Machine Learning · Data Science · Fullstack JavaScript · Digital Marketing · Python / Web. Bootcamps 11 à 24 sem. Certifications CompTIA. Stage 6 mois garanti.",
    languages: ["FR", "EN"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: false,
    points_forts: [
      "Agréé MFEP · Partenariat Simplon.co (France)",
      "Sans diplôme requis — sélection motivation et aptitudes",
      "Stage 6 mois garanti · Bourses partielles",
      "Soutien Wilaya d'Alger + Banque Mondiale",
    ],
  },
  // 3.4 — BMGI Center (données manuelles Mars 2026)
  {
    id: "bmgi-center-kouba",
    name: "BMGI Center",
    slug: "bmgi-center-kouba",
    commune: "Kouba",
    wilaya: "Alger",
    address: "15, clos des Orangers, Kouba, Alger",
    category: "Formation Pro",
    description:
      "Le BMGI Center, à Kouba, est un centre de formation et de certification agréé MFEP. Centre agréé Pearson Vue (management, certifications IT) et Certiport (Microsoft, Oracle, Cisco, Linux, Adobe). Formations courtes 2 à 5 jours : management de projet, informatique, bureautique, BTPH, construction métallique, mécanique moteurs, maintenance informatique. Évaluation par projet de mise en situation professionnelle devant jury.",
    website_url: "https://bmgi.ws",
    programmes:
      "Management · Informatique · Bureautique · BTPH · Construction métallique · Mécanique · Maintenance. Certifications Pearson Vue et Certiport. Formations 2 à 5 jours.",
    languages: ["FR"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: null,
    points_forts: [
      "Agréé MFEP · Pearson Vue et Certiport",
      "Certifications Microsoft, Oracle, Cisco, Linux, Adobe",
      "Formations courtes 2 à 5 jours",
      "Projet de mise en situation professionnelle évalué par jury",
    ],
  },
  // 3.5 — MEDAV (données manuelles Mars 2026)
  {
    id: "medav-kolea",
    name: "MEDAV",
    slug: "medav-kolea-tipaza",
    commune: "Koléa",
    wilaya: "Tipaza",
    address: "Koléa, Tipaza",
    category: "Formation Pro",
    description:
      "MEDAV, à Koléa (Tipaza), propose des formations professionnelles à distance et hybride. Diplômes agréés par l'État (MFEP), tarifs très accessibles. Packs avec accès à vie aux contenus vidéo et diplôme officiel. Domaines : montage vidéo (Premiere, After Effects), design graphique (Illustrator, Photoshop, Canva), secrétariat bureautique, comptabilité, gestion de projet Agile.",
    programmes:
      "Montage vidéo (Adobe Premiere, After Effects) · Design graphique (Illustrator, Photoshop, Canva) · Bureautique · Comptabilité · Gestion de projet Agile. Diplômes agréés État. À distance / Hybride.",
    annual_cost_range: "~15 000 DA / pack (très accessible)",
    languages: ["FR"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: null,
    points_forts: [
      "Agréé État (MFEP) · Formation à distance / hybride",
      "Accès à vie aux contenus vidéo + diplôme officiel",
      "Tarifs très accessibles (~15 000 DA / pack)",
      "Montage vidéo · Design · Bureautique · Comptabilité · Agile",
    ],
  },
  // 3.6 — ITM · Industrie & Management (données manuelles Mars 2026)
  {
    id: "itm-ouled-fayet",
    name: "ITM · Industrie & Management",
    slug: "itm-industrie-management-ouled-fayet",
    commune: "Ouled Fayet",
    wilaya: "Alger",
    address: "Ouled Fayet, Alger",
    category: "Formation Pro",
    description:
      "L'ITM (Institut Technique et Management), à Ouled Fayet, est un centre de formation professionnelle spécialisé dans les métiers techniques industriels. Formations courtes (quelques jours à quelques semaines) : HSE, électricité industrielle, installation fibre optique FTTH, maintenance informatique. Certifications exigées sur chantiers Sonatrach, opérateurs télécom, BTP.",
    programmes:
      "HSE · Électricité industrielle · Fibre optique FTTH · Maintenance informatique. Formations courtes. Secteurs : Pétrole & Gaz · Télécommunications · BTP.",
    languages: ["FR"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: null,
    points_forts: [
      "Agréé État — certifications chantiers industriels",
      "HSE · Fibre optique FTTH · Électricité industrielle",
      "Secteurs Pétrole & Gaz · Télécoms · BTP",
    ],
  },
  // 3.7 — Inter Hotel School (données manuelles Mars 2026)
  {
    id: "inter-hotel-school-kouba",
    name: "Inter Hotel School (IHS) · Arts culinaires",
    slug: "inter-hotel-school-ihs-kouba",
    commune: "Kouba",
    wilaya: "Alger",
    address: "Kouba, Alger",
    category: "Formation Pro",
    description:
      "L'Inter Hotel School (IHS), à Kouba, est l'établissement de référence en Algérie pour les arts culinaires, la pâtisserie et la boulangerie. Agréé État (MFEP), diplômes CAP et CQP reconnus. Chefs Salah Eddine Amour et Billel Djehiche. Cuisines professionnelles et laboratoires de pâtisserie. Master Classes (viennoiserie, cake design) pour professionnels.",
    programmes:
      "CAP Pâtisserie / Cuisine (12 mois) · CQP Pâtisserie fine · CQP Boulangerie · Master Classes (viennoiserie, cake design). Diplômes d'État et CQP agréés MFEP.",
    annual_cost_range: "CAP ~25 000 DA/mois · Master Class Viennoiserie 35 000 DA (3 jours)",
    languages: ["FR"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: null,
    points_forts: [
      "Référence nationale arts culinaires et pâtisserie",
      "CAP et CQP agréés État · Chefs Salah Eddine Amour, Billel Djehiche",
      "Cuisines et laboratoires professionnels · Master Classes",
    ],
  },
  // 3.8 — APTI (données manuelles Mars 2026)
  {
    id: "apti",
    name: "APTI",
    slug: "apti",
    wilaya: "Alger",
    category: "Formation Pro",
    description:
      "APTI est un centre de formation supérieure privé agréé proposant un BTS (Brevet de Technicien Supérieur) en informatique et technologies. Formation Bac+2 sanctionnée par un diplôme d'État reconnu par l'État algérien (MFEP).",
    website_url: "https://apti.dz",
    programmes:
      "BTS Informatique (Bac+2) — diplôme d'État agréé MFEP. Informatique · Technologies.",
    languages: ["FR"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: true,
    points_forts: [
      "Agréé MFEP · BTS Informatique Bac+2",
      "Diplôme d'État reconnu",
    ],
  },
  // 4.1 — Lycée International Alexandre Dumas (données manuelles Mars 2026)
  {
    id: "lycee-international-alexandre-dumas-ben-aknoun",
    name: "Lycée International Alexandre Dumas (LIAD)",
    slug: "lycee-international-alexandre-dumas-liad-ben-aknoun",
    commune: "Ben Aknoun",
    wilaya: "Alger",
    address: "17, Rue Ali Khodja, Ben Aknoun, Alger",
    category: "General",
    description:
      "Le Lycée International Alexandre Dumas (LIAD), à Ben Aknoun, est l'établissement scolaire français de référence en Algérie. Homologué AEFE et ministère français de l'Éducation nationale. Programme français intégral, de la maternelle à la terminale, Baccalauréat général français reconnu mondialement. ~2 000 élèves. Frais : ~222 000 DA/an (élèves algériens) à ~730 000 DA/an (étrangers avec internat). Stage de découverte professionnelle obligatoire en 3e. Admission sélective (dossier + tests maths, français, LV).",
    annual_cost_range: "~222 000 DA / an (élèves algériens) — jusqu'à ~730 000 DA / an (étrangers avec internat)",
    languages: ["FR", "EN", "ES", "DE"],
    programmes:
      "Maternelle → Terminale. Programme français officiel (AEFE). Brevet des Collèges · Baccalauréat général français. Enseignement renforcé anglais, espagnol, allemand.",
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: false,
    points_forts: [
      "Homologué AEFE · Programme français officiel",
      "Bac français reconnu dans ~180 pays · Réseau AEFE 500+ établissements",
      "~2 000 élèves · Maternelle à Terminale",
    ],
  },
  // 4.2 — Petite École d'Hydra (données manuelles Mars 2026)
  {
    id: "petite-ecole-hydra-peh",
    name: "Petite École d'Hydra (PEH / MLF)",
    slug: "petite-ecole-hydra-peh-mlf",
    commune: "Hydra",
    wilaya: "Alger",
    address: "34, Chemin Kouali, Hydra, Alger",
    category: "General",
    description:
      "La Petite École d'Hydra (PEH), gérée par la Mission Laïque Française (MLF), au 34 chemin Kouali, Hydra. Établissement primaire homologué par le Ministère français de l'Éducation nationale. Maternelle au CM2, programme français bilingue, éveil culturel et linguistique. Réseau MLF international. Passerelle naturelle vers le LIAD ou autres établissements AEFE pour le secondaire.",
    programmes:
      "Maternelle → CM2 (primaire). Programme français homologué MEN France (MLF). Bilingue Français / Arabe + initiation anglais.",
    languages: ["FR", "AR", "EN"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: false,
    points_forts: [
      "Mission Laïque Française (MLF) · Homologué MEN France",
      "Maternelle → CM2 · Programme français bilingue",
      "Passerelle vers LIAD et établissements AEFE",
    ],
  },
  // 4.3 — École La Majorelle (données manuelles Mars 2026)
  {
    id: "ecole-la-majorelle-cheraga",
    name: "École La Majorelle",
    slug: "ecole-la-majorelle-cheraga",
    commune: "Chéraga",
    wilaya: "Alger",
    address: "Cité 380 Logements, Bât. 42A N°03, Chéraga, Alger",
    category: "General",
    description:
      "L'École La Majorelle, à Chéraga, est un établissement privé agréé par l'État algérien accueillant plus de 450 élèves de la maternelle au lycée. Enseignement bilingue 50 % français / 50 % anglais dès la petite section. Petites classes, suivi individualisé. FabLab avec initiation STEM et Intelligence Artificielle dès le collège. Préparation au Baccalauréat algérien.",
    programmes:
      "Maternelle → Lycée. Bilingue 50 % FR / 50 % EN. FabLab · STEM · IA dès le collège. Baccalauréat algérien. Petites classes.",
    languages: ["FR", "EN"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: false,
    points_forts: [
      "Bilingue FR/EN dès la petite section · +450 élèves",
      "FabLab · Initiation STEM et IA dès le collège",
      "Agréé État algérien (MEN)",
    ],
  },
  // 4.4 — École El Manar (données manuelles Mars 2026)
  {
    id: "ecole-el-manar-dely-ibrahim",
    name: "École El Manar",
    slug: "ecole-el-manar-dely-ibrahim",
    commune: "Dely Ibrahim",
    wilaya: "Alger",
    address: "Dely Ibrahim, Alger",
    category: "General",
    description:
      "L'École El Manar, établissement privé historique de Dely Ibrahim, réputée pour sa rigueur académique. Primaire au lycée, préparation au Baccalauréat algérien. Plateforme e-learning pour suivi pédagogique (cours, exercices, résultats en ligne). Accent sur les langues étrangères. Agréé État algérien (MEN).",
    programmes:
      "Primaire → Lycée. Baccalauréat algérien. Plateforme e-learning intégrée. Rigueur académique · Langues étrangères.",
    languages: ["FR", "AR", "EN"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: false,
    points_forts: [
      "Plateforme e-learning pour suivi des élèves",
      "Rigueur académique · Langues étrangères",
      "Agréé État algérien (MEN)",
    ],
  },
  // 4.5 — Groupe Scolaire Essalem (données manuelles Mars 2026)
  {
    id: "groupe-scolaire-essalem-dely-ibrahim",
    name: "Groupe Scolaire Essalem",
    slug: "groupe-scolaire-essalem-dely-ibrahim",
    commune: "Dely Ibrahim",
    wilaya: "Alger",
    address: "Dely Ibrahim, Alger",
    category: "General",
    description:
      "Le Groupe Scolaire Essalem, à Dely Ibrahim, est un établissement privé agréé couvrant la maternelle au lycée. Préparation au Baccalauréat algérien. Pédagogie classique d'excellence avec fort accent sur le trilinguisme (arabe, français, anglais) et les langues étrangères.",
    programmes:
      "Maternelle → Lycée. Trilingue Arabe · Français · Anglais. Baccalauréat algérien. Pédagogie classique d'excellence.",
    languages: ["AR", "FR", "EN"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: false,
    points_forts: [
      "Trilingue AR · FR · EN · Fort accent langues",
      "Maternelle → Lycée · Bac algérien",
      "Agréé État algérien (MEN)",
    ],
  },
  // 4.6 — Groupe Scolaire Nedame (données manuelles Mars 2026)
  {
    id: "groupe-scolaire-nedame-dar-el-beida",
    name: "Groupe Scolaire Nedame (GSN)",
    slug: "groupe-scolaire-nedame-gsn-dar-el-beida",
    commune: "Dar El Beïda",
    wilaya: "Alger",
    address: "Dar El Beïda, Alger",
    category: "General",
    description:
      "Le Groupe Scolaire Nedame (GSN), à Dar El Beïda, a fait du trilinguisme précoce (arabe, français, anglais dès la petite section) son identité. Répond aux familles des pôles industriels, technologiques et aéroportuaires de l'Est algérois. Préparation au Baccalauréat algérien. Taux de réussite aux examens officiels : 98 %.",
    programmes:
      "Maternelle → Lycée. Trilingue dès la maternelle — Arabe · Français · Anglais. Baccalauréat algérien. Taux réussite 98 % (BEM + Bac).",
    languages: ["AR", "FR", "EN"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: false,
    points_forts: [
      "Trilinguisme dès la maternelle — AR · FR · EN",
      "Taux de réussite 98 % aux examens nationaux",
      "Agréé État algérien (MEN)",
    ],
  },
  // 4.7 — Établissement Salim (données manuelles Mars 2026)
  {
    id: "etablissement-salim",
    name: "Établissement Salim",
    slug: "etablissement-salim",
    wilaya: "Alger",
    address: "Alger Plage · Bordj El Bahri · Rouiba (3 sites)",
    category: "General",
    description:
      "L'Établissement Salim est un groupe scolaire privé agréé implanté sur trois sites dans l'est d'Alger : Alger Plage, Bordj El Bahri et Rouiba. Accompagnement personnalisé des élèves en difficulté, soutien scolaire, classes d'examen (BEM et Bac). Niveau d'exigence académique élevé. Option internat. Apprentissage des langues étrangères.",
    website_url: "https://etablissementsalim.com",
    programmes:
      "Primaire → Lycée. Baccalauréat algérien. Accompagnement personnalisé · Soutien · Classes d'examen (BEM, Bac). Internat disponible. Multilingue.",
    languages: ["AR", "FR", "EN"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: false,
    has_internat: true,
    points_forts: [
      "3 sites : Alger Plage · Bordj El Bahri · Rouiba",
      "Accompagnement personnalisé · Classes d'examen BEM/Bac",
      "Internat disponible",
    ],
  },
  // 4.8 — Groupe Scolaire L'Écureuil (données manuelles Mars 2026)
  {
    id: "groupe-scolaire-ecureuil-blida",
    name: "Groupe Scolaire L'Écureuil",
    slug: "groupe-scolaire-ecureuil-blida",
    commune: "Blida",
    wilaya: "Blida",
    address: "Blida",
    category: "General",
    description:
      "Le Groupe Scolaire L'Écureuil, fondé en 2004 à Blida, est un établissement privé agréé par l'État algérien. Maternelle au lycée, scolarité continue jusqu'au Baccalauréat algérien. Infrastructures modernes. Inscription possible à tout moment de l'année scolaire.",
    programmes:
      "Maternelle → Lycée. Baccalauréat algérien. Scolarité continue. Inscription possible à tout moment de l'année.",
    languages: ["FR", "AR"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: false,
    points_forts: [
      "Depuis 2004 · Blida",
      "Maternelle → Lycée · Bac algérien",
      "Inscription à tout moment de l'année scolaire",
    ],
  },
  // 4.9 — École Meilleures Générations (données manuelles Mars 2026)
  {
    id: "ecole-meilleures-generations-draria",
    name: "École Meilleures Générations (EMG)",
    slug: "ecole-meilleures-generations-emg-draria",
    commune: "Draria",
    wilaya: "Alger",
    address: "Draria, Alger",
    category: "General",
    description:
      "L'École Meilleures Générations (EMG), à Draria, se distingue par une approche centrée sur le bien-être de l'enfant, l'autodiscipline et l'empathie. Pédagogies actives (Montessori, apprentissage par projets) tout en respectant le socle commun du programme national algérien. Maternelle au lycée. Préparation au Baccalauréat algérien. Agréé État algérien (MEN).",
    programmes:
      "Maternelle → Lycée. Pédagogies actives · Bien-être · Autodiscipline · Empathie. Socle commun programme national. Baccalauréat algérien.",
    languages: ["FR", "AR"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: false,
    points_forts: [
      "Pédagogies actives (Montessori, apprentissage par projets)",
      "Bien-être · Autodiscipline · Empathie",
      "Agréé État algérien (MEN)",
    ],
  },
  // 4.10 — École Éveil Scolaire (données manuelles Mars 2026)
  {
    id: "ecole-eveil-scolaire-hydra",
    name: "École Éveil Scolaire",
    slug: "ecole-eveil-scolaire-hydra",
    commune: "Hydra",
    wilaya: "Alger",
    address: "Hydra, Alger",
    category: "General",
    description:
      "L'École Éveil Scolaire, à Hydra, est un établissement privé titulaire du label France de l'Éducation nationale française, garantissant qualité et continuité pédagogique du préscolaire au lycée. Parcours scolaire complet, pédagogie de haut niveau. Préparation au Baccalauréat algérien avec passerelles vers le système éducatif français grâce au label. Agréé MEN Algérie + Label France.",
    programmes:
      "Préscolaire → Lycée. Label France (MEN France). Baccalauréat algérien. Passerelles vers système français. Continuité pédagogique garantie.",
    languages: ["FR", "AR"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: false,
    points_forts: [
      "Label France (MEN France) — continuité pédagogique garantie",
      "Préscolaire → Lycée · Bac algérien",
      "Passerelles vers système éducatif français",
    ],
  },
  // 5.1 — INOOF (données manuelles Mars 2026)
  {
    id: "inoof-hydra",
    name: "INOOF · Institut National de l'Optique et de l'Optométrie",
    slug: "inoof-institut-national-optique-optometrie-hydra",
    commune: "Hydra",
    wilaya: "Alger",
    address: "Hydra, Alger",
    category: "Sante",
    description:
      "L'INOOF (Institut National de l'Optique et de l'Optométrie), à Hydra, est agréé par le Ministère de la Santé. Formation au Diplôme d'État d'opticien-lunetier (Bac+2), qualification officielle pour exercer en Algérie. Admission : bacheliers séries scientifiques (M, TM, S). Stages en magasins d'optique ou milieu hospitalier ophtalmologique. Pénurie nationale d'opticiens → insertion rapide.",
    programmes:
      "Diplôme d'État d'opticien-lunetier (Bac+2). Optique médicale · Optométrie. Stages pratiques magasin d'optique / hospitalier. Débouchés : opticien salarié ou indépendant.",
    languages: ["FR"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: true,
    points_forts: [
      "Agréé Ministère de la Santé",
      "Diplôme d'État opticien-lunetier (Bac+2)",
      "Stages pratiques · Insertion rapide (pénurie d'opticiens)",
    ],
  },
  // 5.2 — Paramely (données manuelles Mars 2026)
  {
    id: "paramely-alger",
    name: "Paramely",
    slug: "paramely-alger",
    wilaya: "Alger",
    category: "Sante",
    description:
      "Paramely, à Alger, est un établissement privé de formation paramédicale reconnu pour la qualité de ses enseignements pratiques. Forme infirmiers, aides-soignants et manipulateurs en radiologie. Titres officiels reconnus par le Ministère de la Santé, permettant l'exercice légal en cliniques et hôpitaux. Stages cliniques obligatoires intégrés au cursus.",
    programmes:
      "Infirmier · Aide-soignant · Manipulateur en radiologie. Titres officiels reconnus Ministère Santé. Stages cliniques obligatoires. Débouchés : cliniques privées · hôpitaux publics.",
    languages: ["FR"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: true,
    points_forts: [
      "Agréé Ministère de la Santé",
      "Infirmier · Aide-soignant · Manipulateur radiologie",
      "Stages cliniques obligatoires",
    ],
  },
  // 5.3 — Institut Ibn Nafis (données manuelles Mars 2026)
  {
    id: "institut-ibn-nafis-alger",
    name: "Institut Ibn Nafis",
    slug: "institut-ibn-nafis-alger",
    wilaya: "Alger",
    category: "Sante",
    description:
      "L'Institut Ibn Nafis, à Alger, est un établissement privé de formation paramédicale (hommage au médecin Ibn al-Nafis). Propose des cycles Technicien Supérieur (TS) Santé (Bac+2) dans diverses spécialités. Stages cliniques obligatoires en établissements de santé conventionnés. Agréé État (Ministère Santé / MFEP).",
    programmes:
      "Technicien Supérieur (TS) Santé — Bac+2. Spécialités paramédicales. Stages cliniques obligatoires en établissements conventionnés.",
    languages: ["FR"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: true,
    points_forts: [
      "Agréé État (Ministère Santé / MFEP)",
      "TS Santé (Bac+2) — spécialités paramédicales",
      "Stages cliniques obligatoires",
    ],
  },
  // 5.4 — Institut El Taraqui (données manuelles Mars 2026)
  {
    id: "institut-el-taraqui-alger",
    name: "Institut El Taraqui",
    slug: "institut-el-taraqui-alger",
    wilaya: "Alger",
    category: "Sante",
    description:
      "L'Institut El Taraqui est un établissement privé de formation paramédicale proposant des cycles de Technicien Supérieur (TS) dans diverses spécialités de santé. Stages cliniques obligatoires en partenariat avec des établissements hospitaliers conventionnés. Formation pratique pour une insertion professionnelle dans un marché paramédical à forte demande. Agréé État.",
    programmes:
      "Technicien Supérieur (TS) Santé. Spécialités paramédicales. Stages cliniques obligatoires en établissements hospitaliers conventionnés.",
    languages: ["FR"],
    data_confidence: "high",
    is_active: true,
    is_partner: false,
    is_verified: true,
    mesrs_recognized: false,
    bac_required: true,
    points_forts: [
      "Agréé État",
      "TS Santé — spécialités paramédicales",
      "Stages cliniques obligatoires",
    ],
  },
];
