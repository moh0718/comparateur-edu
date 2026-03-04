"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LEAD_FORM_HREF } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type RankingKey =
  | "qsArab"
  | "theArab"
  | "webometrics"
  | "scimago"
  | "qsSustainability"
  | "adScientific"
  | "usNews";

type RankingColor = "orange" | "blue" | "green" | "purple";

type RankingInstitutionRow = {
  name: string;
  nationalRank: number | null;
  regionalRank?: string;
  globalRank?: string;
  disciplines: string[];
  why: string;
  note?: string;
};

type RankingConfig = {
  name: string;
  edition: string;
  publishedDate: string;
  url: string;
  measures: string;
  doesNotMeasure: string;
  highlight: string;
  color: RankingColor;
  institutions: RankingInstitutionRow[];
};

const rankingsData: Record<RankingKey, RankingConfig> = {
  qsArab: {
    name: "QS Arab Region University Rankings",
    edition: "2026",
    publishedDate: "16 octobre 2025",
    url: "https://www.topuniversities.com/arab-region-university-rankings",
    measures:
      "Réputation académique (30%), réputation employeur (20%), ratio étudiants/enseignants (15%), réseau de recherche international (10%), citations par article, impact web",
    doesNotMeasure: "La qualité des cours, les débouchés réels, la vie étudiante",
    highlight:
      "L'Algérie est le pays le plus représenté avec 46 universités — dont 32 nouvelles entrées. 1er pays arabe.",
    color: "orange",
    institutions: [
      {
        name: "Université Badji Mokhtar – Annaba",
        nationalRank: 1,
        regionalRank: "109",
        disciplines: ["Chimie", "Génie des matériaux"],
        why: "Fort en citations et réputation académique",
      },
      {
        name: "Université Abou Bekr Belkaid – Tlemcen",
        nationalRank: 2,
        regionalRank: "137",
        disciplines: ["Médecine", "Pharmacie", "Ingénierie"],
        why: "Transparence chercheurs, réseau de recherche actif",
      },
      {
        name: "ENP – École Nationale Polytechnique",
        nationalRank: 3,
        regionalRank: "151-160",
        disciplines: ["Ingénierie", "Génie civil", "Électronique"],
        why: "Seule grande école d'ingénieurs classée",
      },
      {
        name: "Université 8 Mai 1945 – Guelma",
        nationalRank: 4,
        regionalRank: "151-160",
        disciplines: ["Sciences exactes", "Chimie"],
        why: "Meilleur indicateur « citations par article »",
      },
      {
        name: "Université Frères Mentouri – Constantine 1",
        nationalRank: 5,
        regionalRank: "171-180",
        disciplines: ["Sciences", "Technologie"],
        why: "Volume de recherche et visibilité internationale",
      },
      {
        name: "Université Hassiba Ben Bouali – Chlef",
        nationalRank: 6,
        regionalRank: "171-180",
        disciplines: ["Sciences", "Technologie"],
        why: "",
      },
      {
        name: "Université de Biskra",
        nationalRank: 7,
        regionalRank: "171-180",
        disciplines: ["Sciences", "Architecture"],
        why: "",
      },
      {
        name: "Université USTO – Oran",
        nationalRank: 8,
        regionalRank: "181-190",
        disciplines: ["Sciences", "Technologie", "Ingénierie"],
        why: "",
      },
      {
        name: "Université Ferhat Abbas – Sétif 1",
        nationalRank: 9,
        regionalRank: "181-190",
        disciplines: ["Informatique", "Sciences exactes"],
        why: "",
      },
      {
        name: "Université Djillali Liabès – Sidi Bel Abbès",
        nationalRank: 10,
        regionalRank: "191-200",
        disciplines: ["Architecture", "Génie civil"],
        why: "Très forte en architecture/urbanisme et génie civil",
      },
      {
        name: "ENS Kouba (El-Ibrahimi)",
        nationalRank: 11,
        regionalRank: "191-200",
        disciplines: ["Éducation"],
        why: "",
      },
      {
        name: "USTHB – Alger",
        nationalRank: 12,
        regionalRank: "191-200",
        disciplines: ["Maths", "Physique", "Informatique"],
        why: "Présent dans le plus grand nombre de classements",
      },
      {
        name: "Université El Oued",
        nationalRank: 13,
        regionalRank: "191-200",
        disciplines: ["Sciences exactes", "Énergie"],
        why: "Progression très rapide",
      },
      {
        name: "ESI – École Nationale Sup. d'Informatique",
        nationalRank: 14,
        regionalRank: "201-250",
        disciplines: ["Informatique", "IA"],
        why: "",
      },
      {
        name: "Université Alger 1 – Benyoucef Benkhedda",
        nationalRank: 15,
        regionalRank: "201-250",
        disciplines: ["Médecine", "Droit"],
        why: "",
      },
      {
        name: "Université Blida 1 – Saâd Dahlab",
        nationalRank: 16,
        regionalRank: "201-250",
        disciplines: ["Aéronautique", "Médecine"],
        why: "",
      },
      {
        name: "Université Boumerdès (UMBB)",
        nationalRank: 17,
        regionalRank: "201-250",
        disciplines: ["Hydrocarbures", "Génie électrique"],
        why: "",
      },
      {
        name: "Université de Béjaïa",
        nationalRank: 18,
        regionalRank: "201-250",
        disciplines: ["Sciences", "Agroalimentaire"],
        why: "",
      },
      {
        name: "Université de Ouargla (Kasdi Merbah)",
        nationalRank: 19,
        regionalRank: "201-250",
        disciplines: ["Énergies renouvelables"],
        why: "",
      },
      {
        name: "~26 autres universités algériennes",
        nationalRank: null,
        regionalRank: "251-300",
        disciplines: [],
        why: "Incluant Tébessa, Tissemsilt (#1 citations/article), Mascara, Relizane, Mostaganem, Oran 1...",
      },
    ],
  },
  theArab: {
    name: "Times Higher Education Arab University Rankings",
    edition: "2026",
    publishedDate: "4 décembre 2024",
    url: "https://www.timeshighereducation.com/world-university-rankings/2026/arab-university-rankings",
    measures:
      "Enseignement (33%), qualité de la recherche/citations (33%), environnement de recherche, attractivité internationale (7,5%), transfert de connaissances vers l'industrie (2,5%)",
    doesNotMeasure: "La réputation employeur, les débouchés, le ratio frais/qualité",
    highlight:
      "42 universités algériennes classées — 3e pays le plus représenté. Université Djillali Liabès en tête du tableau national (THE Arab #81).",
    color: "blue",
    institutions: [
      {
        name: "Université Djillali Liabès – Sidi Bel Abbès",
        nationalRank: 1,
        regionalRank: "#81",
        disciplines: ["Architecture", "Urbanisme", "Génie civil"],
        why: "Meilleure algérienne THE — très fort en citations relatives dans ces disciplines",
      },
      {
        name: "Université El Oued",
        nationalRank: 2,
        regionalRank: "151-175",
        disciplines: ["Sciences exactes", "Énergie"],
        why: "Progression spectaculaire sur les dernières années",
      },
      {
        name: "Université d'Aïn Témouchent",
        nationalRank: 3,
        regionalRank: "151-175",
        disciplines: ["Agronomie", "Sciences naturelles"],
        why: "",
      },
      {
        name: "ENSERE – École Sup. Énergies Renouvelables",
        nationalRank: 4,
        regionalRank: "151-175",
        disciplines: ["Énergies renouvelables", "Environnement"],
        why: "Spécialité unique en Algérie",
      },
      {
        name: "USTHB, Sétif 1, Constantine 1, Blida 1, Boumerdès, Annaba, Béjaïa, Biskra, Batna 2, Chlef, Jijel, Ouargla, Laghouat, Mascara, Mostaganem, Tizi Ouzou, Oran 1, Skikda, Tlemcen, M'Sila, Guelma + autres",
        nationalRank: null,
        regionalRank: "175+",
        disciplines: [],
        why: "38 autres universités algériennes classées",
      },
    ],
  },
  webometrics: {
    name: "Webometrics Ranking of World Universities",
    edition: "Janvier 2025",
    publishedDate: "Janvier 2025",
    url: "https://www.webometrics.info/en/aw/algeria",
    measures:
      "Présence web (taille du domaine), visibilité (backlinks externes), transparence (chercheurs cités Google Scholar), excellence (articles dans le top 10 % Scopus)",
    doesNotMeasure: "La qualité de l'enseignement, la réputation employeur, les conditions d'étude",
    highlight:
      "93 institutions algériennes classées sur plus de 31 000 mondiales. Constantine 1 #1 nationale.",
    color: "blue",
    institutions: [
      {
        name: "Université Frères Mentouri – Constantine 1",
        nationalRank: 1,
        globalRank: "~2 333",
        disciplines: ["Sciences", "Technologie", "Multidisciplinaire"],
        why: "Présence web la plus forte + volume de publications indexées",
      },
      {
        name: "USTHB – Alger",
        nationalRank: 2,
        globalRank: "~2 452",
        disciplines: ["Maths", "Physique", "Génie"],
        why: "Excellence scientifique (Scopus top 10 %), visibilité internationale",
      },
      {
        name: "Université Abou Bekr Belkaid – Tlemcen",
        nationalRank: 3,
        globalRank: "~2 508",
        disciplines: ["Médecine", "Ingénierie"],
        why: "Transparence (chercheurs cités) et présence web soutenue",
      },
      {
        name: "Université M'Sila (Mohamed Boudiaf)",
        nationalRank: 4,
        globalRank: "~2 347",
        disciplines: ["Sciences", "Technologie"],
        why: "Bon ratio citations/chercheur",
      },
      {
        name: "Université de Béchar (Mohamed Tahri)",
        nationalRank: 44,
        globalRank: "~6 415",
        disciplines: ["Sciences appliquées"],
        why: "Représentativité régionale (top 20 % mondial)",
      },
    ],
  },
  scimago: {
    name: "SCImago Institutions Rankings (SIR)",
    edition: "2026",
    publishedDate: "Mars 2025",
    url: "https://www.scimagoir.com/rankings.php?sector=Higher+educ.&country=DZA",
    measures:
      "Production scientifique Scopus : nombre de publications, citations, H-index, collaboration internationale, indicateurs d'innovation",
    doesNotMeasure:
      "L'enseignement, la vie étudiante, la réputation employeur, l'accessibilité",
    highlight:
      "41 institutions algériennes classées. L'École Militaire Polytechnique (EMP) domine le classement global ; en public, Sétif 1 et l'ESI figurent en tête.",
    color: "blue",
    institutions: [
      {
        name: "École Militaire Polytechnique (EMP)",
        nationalRank: 1,
        globalRank: "N/C",
        disciplines: ["Ingénierie", "Physique"],
        why: "Ratio publications/chercheurs exceptionnel.",
        note: "⚠ École militaire — non accessible au public",
      },
      {
        name: "Université Ferhat Abbas – Sétif 1",
        nationalRank: 2,
        globalRank: "Top nationale",
        disciplines: ["Informatique", "Sciences exactes", "Biologie"],
        why: "#1 en public — très productif sur Scopus",
      },
      {
        name: "ESI – École Nationale Sup. d'Informatique",
        nationalRank: 3,
        globalRank: "Top nationale",
        disciplines: ["Informatique", "IA", "Systèmes d'information"],
        why: "Meilleur ratio citations/article de toutes les écoles",
      },
      {
        name: "Université 8 Mai 1945 – Guelma",
        nationalRank: 4,
        globalRank: "Top nationale",
        disciplines: ["Sciences exactes", "Chimie"],
        why: "Fort volume de publications indexées",
      },
      {
        name: "Université El Oued (Chahid Hamma Lakhdar)",
        nationalRank: 5,
        globalRank: "Top nationale",
        disciplines: ["Sciences", "Énergie"],
        why: "482 publications en 2025 (~2 400 cumulées) — progression record",
      },
      {
        name: "Université Oran 1 (Ahmed Ben Bella)",
        nationalRank: 6,
        globalRank: "Top nationale",
        disciplines: ["Sciences", "Technologie"],
        why: "",
      },
      {
        name: "Université 20 Août 1955 – Skikda",
        nationalRank: 7,
        globalRank: "Top nationale",
        disciplines: ["Pétrochimie", "Chimie"],
        why: "",
      },
      {
        name: "Université Mohamed Khider – Biskra",
        nationalRank: 8,
        globalRank: "Top nationale",
        disciplines: ["Sciences exactes", "Architecture"],
        why: "",
      },
      {
        name: "Université de Béjaïa",
        nationalRank: 9,
        globalRank: "Top nationale",
        disciplines: ["Sciences", "Agroalimentaire"],
        why: "",
      },
      {
        name: "USTHB – Alger",
        nationalRank: 10,
        globalRank: "Top nationale",
        disciplines: ["Maths", "Physique"],
        why: "Présent dans le plus grand nombre de classements internationaux",
      },
    ],
  },
  qsSustainability: {
    name: "QS World University Rankings: Sustainability",
    edition: "2024",
    publishedDate: "Décembre 2024",
    url: "https://www.qs.com/qs-world-university-rankings",
    measures:
      "Politiques environnementales, recherche sur le développement durable, responsabilité sociale, gouvernance",
    doesNotMeasure:
      "La qualité académique globale, les débouchés, l'ingénierie ou les sciences classiques",
    highlight:
      "Université Ferhat Abbas – Sétif 1 est la meilleure université algérienne (#1501 mondiale).",
    color: "green",
    institutions: [
      {
        name: "Université Ferhat Abbas – Sétif 1",
        nationalRank: 1,
        globalRank: "#1501",
        disciplines: ["Développement durable", "Sciences environnementales"],
        why: "Politiques de développement durable et publications sur l'environnement",
      },
    ],
  },
  adScientific: {
    name: "AD Scientific Index",
    edition: "2026",
    publishedDate: "2026",
    url: "https://www.adscientificindex.com/university-ranking/?country_code=dz",
    measures:
      "H-index total et par domaine des chercheurs permanents de chaque université (impact cumulé des publications)",
    doesNotMeasure:
      "L'enseignement, les conditions étudiantes, la réputation employeur",
    highlight: "112 universités et institutions algériennes classées.",
    color: "purple",
    institutions: [
      {
        name: "Université Djillali Liabès – Sidi Bel Abbès",
        nationalRank: 1,
        globalRank: "~3 502",
        disciplines: ["Architecture", "Génie civil", "Ingénierie"],
        why: "Plusieurs disciplines dans le top 30 national en H-index",
      },
      {
        name: "Université Ferhat Abbas – Sétif 1",
        nationalRank: 2,
        globalRank: "~3 783",
        disciplines: ["Informatique", "Sciences exactes"],
        why: "",
      },
      {
        name: "USTHB – Alger",
        nationalRank: 3,
        globalRank: "Top nationale",
        disciplines: ["Maths", "Physique"],
        why: "",
      },
    ],
  },
  usNews: {
    name: "U.S. News Best Global Universities",
    edition: "2025",
    publishedDate: "2025",
    url: "https://www.usnews.com/education/best-global-universities/search?region=arab-world&country=Algeria",
    measures:
      "Réputation académique mondiale, publications et citations dans Web of Science, collaboration internationale",
    doesNotMeasure:
      "L'enseignement local, les frais, les services étudiants, la vie de campus",
    highlight:
      "Université Djillali Liabès – Sidi Bel Abbès : #760 mondiale — meilleure algérienne selon ce classement.",
    color: "orange",
    institutions: [
      {
        name: "Université Djillali Liabès – Sidi Bel Abbès",
        nationalRank: 1,
        globalRank: "#760",
        disciplines: ["Architecture", "Génie civil", "Ingénierie"],
        why: "Publications internationales et citations dans Web of Science",
      },
    ],
  },
};

type PodiumCard = {
  name: string;
  city: string;
  bestRank: string;
  disciplines: string[];
  rankings: string[];
  note: string;
  profileUrl: string;
};

const podiumData: PodiumCard[] = [
  {
    name: "Université Djillali Liabès",
    city: "Sidi Bel Abbès",
    bestRank: "THE Arab #81",
    disciplines: ["Architecture", "Génie Civil", "Ingénierie"],
    rankings: ["THE Arab", "QS Arab", "U.S. News", "Webometrics", "AD Scientific"],
    note: "Meilleure université algérienne au classement THE Arab",
    profileUrl: "/etablissements/djillali-liabes",
  },
  {
    name: "USTHB",
    city: "Alger",
    bestRank: "Webometrics #2 national",
    disciplines: ["Mathématiques", "Physique", "Informatique", "Génie"],
    rankings: ["Webometrics", "QS Arab", "THE Arab", "SCImago", "AD Scientific", "EduRank"],
    note: "Présent dans le plus grand nombre de classements",
    profileUrl: "/etablissements/usthb",
  },
  {
    name: "Université Ferhat Abbas – Sétif 1",
    city: "Sétif",
    bestRank: "SCImago #2 national",
    disciplines: ["Informatique", "Sciences exactes", "Développement durable"],
    rankings: ["SCImago", "QS Arab", "THE Arab", "QS Sustainability", "AD Scientific"],
    note: "Meilleure algérienne QS Sustainability (#1501 mondial)",
    profileUrl: "/etablissements/setif-1",
  },
  {
    name: "Université Frères Mentouri – Constantine 1",
    city: "Constantine",
    bestRank: "Webometrics #1 national",
    disciplines: ["Sciences", "Technologie", "Recherche multidisciplinaire"],
    rankings: ["Webometrics", "QS Arab", "THE Arab"],
    note: "1ère nationale Webometrics — plus grande présence web d'Algérie",
    profileUrl: "/etablissements/constantine-1",
  },
  {
    name: "Université Badji Mokhtar – Annaba",
    city: "Annaba",
    bestRank: "QS Arab #109",
    disciplines: ["Chimie", "Génie des matériaux", "Sciences"],
    rankings: ["QS Arab", "THE Arab"],
    note: "Meilleure algérienne QS Arab (#109)",
    profileUrl: "/etablissements/annaba",
  },
  {
    name: "Université Abou Bekr Belkaid – Tlemcen",
    city: "Tlemcen",
    bestRank: "QS Arab #137",
    disciplines: ["Médecine", "Pharmacie", "Ingénierie"],
    rankings: ["QS Arab", "Webometrics", "THE Arab", "AD Scientific"],
    note: "2e meilleure algérienne QS Arab",
    profileUrl: "/etablissements/tlemcen",
  },
  {
    name: "ENP – École Nationale Polytechnique",
    city: "Alger (El Harrach)",
    bestRank: "QS Arab #151-160",
    disciplines: ["Ingénierie générale", "Génie civil", "Électronique"],
    rankings: ["QS Arab"],
    note: "Seule grande école d'ingénieurs algérienne classée dans QS Arab",
    profileUrl: "/etablissements/enp",
  },
  {
    name: "ESI – École Nationale Sup. d'Informatique",
    city: "Alger (Oued Smar)",
    bestRank: "SCImago #3 national",
    disciplines: ["Informatique", "Intelligence Artificielle", "Cybersécurité"],
    rankings: ["SCImago", "QS Arab"],
    note: "3e nationale SCImago — meilleur ratio citations/articles de toutes les écoles",
    profileUrl: "/etablissements/esi",
  },
  {
    name: "Université El Oued",
    city: "El Oued",
    bestRank: "THE Arab 151-175",
    disciplines: ["Sciences exactes", "Énergie"],
    rankings: ["THE Arab", "SCImago", "QS Arab"],
    note: "Progression la plus rapide d'Algérie : +482 publications en 2025",
    profileUrl: "/etablissements/el-oued",
  },
  {
    name: "Université 8 Mai 1945 – Guelma",
    city: "Guelma",
    bestRank: "QS Arab #151-160",
    disciplines: ["Sciences exactes", "Chimie"],
    rankings: ["QS Arab", "SCImago"],
    note: "Meilleure pour l'indicateur Citations par article — QS Arab",
    profileUrl: "/etablissements/guelma",
  },
];

const rankingColorClasses: Record<RankingColor, string> = {
  orange: "border-orange-200 bg-orange-50 text-orange-800",
  blue: "border-sky-200 bg-sky-50 text-sky-800",
  green: "border-emerald-200 bg-emerald-50 text-emerald-800",
  purple: "border-violet-200 bg-violet-50 text-violet-800",
};

const rankingPillClasses: Record<RankingColor, string> = {
  orange: "bg-orange-100 text-orange-800",
  blue: "bg-sky-100 text-sky-800",
  green: "bg-emerald-100 text-emerald-800",
  purple: "bg-violet-100 text-violet-800",
};

const podiumRankingPillColor: Record<string, string> = {
  "THE Arab": "bg-sky-100 text-sky-800",
  "QS Arab": "bg-orange-100 text-orange-800",
  "Webometrics": "bg-sky-100 text-sky-800",
  SCImago: "bg-sky-100 text-sky-800",
  "QS Sustainability": "bg-emerald-100 text-emerald-800",
  "AD Scientific": "bg-violet-100 text-violet-800",
  EduRank: "bg-sky-50 text-sky-700",
};

const tabOrder: { key: RankingKey; label: string }[] = [
  { key: "qsArab", label: "QS Arab Region 2026" },
  { key: "theArab", label: "THE Arab University 2026" },
  { key: "webometrics", label: "Webometrics Jan. 2025" },
  { key: "scimago", label: "SCImago 2026" },
  { key: "qsSustainability", label: "QS Sustainability 2024" },
  { key: "adScientific", label: "AD Scientific Index 2026" },
  { key: "usNews", label: "U.S. News Global 2025" },
];

const profileLinkMap: Record<string, string> = {
  "USTHB – Alger": "/etablissements/usthb",
  "USTHB": "/etablissements/usthb",
  "Université Ferhat Abbas – Sétif 1": "/etablissements/setif-1",
  "Université Frères Mentouri – Constantine 1": "/etablissements/constantine-1",
  "Université Badji Mokhtar – Annaba": "/etablissements/annaba",
  "Université Abou Bekr Belkaid – Tlemcen": "/etablissements/tlemcen",
  "ENP – École Nationale Polytechnique": "/etablissements/enp",
  "ESI – École Nationale Sup. d'Informatique": "/etablissements/esi",
  "Université Djillali Liabès – Sidi Bel Abbès": "/etablissements/djillali-liabes",
  "Université El Oued": "/etablissements/el-oued",
  "Université 8 Mai 1945 – Guelma": "/etablissements/guelma",
};

const faqItems = [
  {
    question: "Ces classements reflètent-ils la qualité de l'enseignement ?",
    answer:
      "Pas directement. Ils mesurent surtout la production de recherche (publications, citations) et la visibilité web. Un étudiant en Licence ou Master ne bénéficiera pas automatiquement d'un rang élevé en recherche. Pour juger l'enseignement, les taux d'insertion professionnelle, les contenus de programme et les retours d'anciens étudiants sont souvent plus pertinents.",
  },
  {
    question:
      "Pourquoi l'ENP et l'ESI n'apparaissent-elles pas plus haut alors qu'elles sont considérées comme d'excellentes grandes écoles ?",
    answer:
      "Parce que la plupart des classements mondiaux sont dominés par le volume de publications scientifiques. L'ENP (~200 ingénieurs/an) et l'ESI (~150–200/an) comptent trop peu de chercheurs permanents pour rivaliser en volume avec des universités de 20 000+ étudiants. Leur prestige académique est réel, mais il est mal capturé par ces métriques centrées sur la recherche de masse.",
  },
  {
    question: "Quelle est la meilleure université algérienne ?",
    answer:
      "La réponse dépend du critère et du classement : selon THE Arab 2026, c'est l'Université Djillali Liabès (Sidi Bel Abbès) (#81) ; selon QS Arab 2026, c'est l'Université Badji Mokhtar (Annaba) (#109) ; selon Webometrics Jan. 2025, l'Université Constantine 1 est #1 nationale ; en SCImago, l'École Militaire Polytechnique domine, suivie par l'Université Sétif 1 en public. Pour les ingénieurs, ENP et ESI font consensus ; pour la médecine, Université Alger 1 reste une valeur sûre ; pour l'informatique, l'ESI (Oued Smar) est largement reconnue.",
  },
  {
    question: "L'Algérie progresse-t-elle dans les classements ?",
    answer:
      "Oui, nettement. En QS Arab, l'Algérie est passée de 14 universités classées en 2025 à 46 en 2026, devenant le pays arabe le plus représenté. En THE Arab, elle est passée d'environ 37 à 42 universités entre 2024 et 2026. Plusieurs universités de l'intérieur du pays (El Oued, Guelma, M'Sila…) affichent des progressions spectaculaires.",
  },
  {
    question: "Ces données sont-elles mises à jour ?",
    answer:
      "Oui. Webometrics est mis à jour deux fois par an (janvier et juillet). QS et THE publient chaque automne une nouvelle édition. SCImago met à jour son classement autour de mars. Cette page est actualisée à chaque nouvelle édition majeure, mais il est toujours conseillé de vérifier directement sur les sites officiels listés en bas de page.",
  },
];

const sourcesLinks = [
  {
    name: "QS Arab Region",
    url: "https://www.topuniversities.com/arab-region-university-rankings",
    desc: "Classement régional — 46 universités algériennes (2026)",
  },
  {
    name: "Times Higher Education Arab",
    url: "https://www.timeshighereducation.com/world-university-rankings/2026/arab-university-rankings",
    desc: "42 universités algériennes — basé sur la recherche (2026)",
  },
  {
    name: "Webometrics",
    url: "https://www.webometrics.info/en/aw/algeria",
    desc: "93 institutions algériennes — présence web + bibliométrie (Jan. 2025)",
  },
  {
    name: "SCImago SIR",
    url: "https://www.scimagoir.com/rankings.php?sector=Higher+educ.&country=DZA",
    desc: "41 institutions algériennes — production Scopus (2026)",
  },
  {
    name: "QS Sustainability",
    url: "https://www.qs.com/qs-world-university-rankings",
    desc: "Développement durable — Sétif 1 meilleure Algérie #1501 (2024)",
  },
  {
    name: "AD Scientific Index",
    url: "https://www.adscientificindex.com/university-ranking/?country_code=dz",
    desc: "H-index chercheurs — 112 universités algériennes (2026)",
  },
  {
    name: "U.S. News Global",
    url: "https://www.usnews.com/education/best-global-universities/search?region=arab-world&country=Algeria",
    desc: "Best Global Universities — Algérie (2025)",
  },
  {
    name: "EduRank Algérie",
    url: "https://edurank.org/geo/dz/",
    desc: "81 universités — publications et citations (2025)",
  },
  {
    name: "UniversityGuru Algérie",
    url: "https://www.universityguru.com/universities--algeria",
    desc: "Méta-classement — agrège 108 sources de classement",
  },
  {
    name: "orientation.mesrs.dz",
    url: "https://orientation.mesrs.dz",
    desc: "Source officielle MESRS — notes de coupure par filière (chaque rentrée)",
  },
];

export function RankingsClient() {
  const [activeTab, setActiveTab] = useState<RankingKey>("qsArab");
  const [podiumRegion, setPodiumRegion] = useState<"" | "Alger">("");
  const [openFaq, setOpenFaq] = useState<string | null>(faqItems[0].question);

  const currentRanking = rankingsData[activeTab];

  const filteredPodium = useMemo(() => {
    if (!podiumRegion) return podiumData;
    if (podiumRegion === "Alger") {
      return podiumData.filter((card) => card.city.toLowerCase().includes("alger"));
    }
    return podiumData;
  }, [podiumRegion]);

  const handleShare = async () => {
    try {
      const url =
        typeof window !== "undefined"
          ? window.location.href
          : "https://comparateur-edu.vercel.app/rankings";
      if (navigator.share) {
        await navigator.share({ title: "Rankings – kompar - edu", url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert("Lien copié dans le presse-papiers.");
      }
    } catch {
      // silence: partage non critique
    }
  };

  const renderRankCell = (row: RankingInstitutionRow) => {
    const regional = row.regionalRank;
    const global = row.globalRank;
    if (regional && global) return `${regional} / ${global}`;
    if (regional) return regional;
    if (global) return global;
    return "Classée";
  };

  return (
    <div className="mx-auto max-w-7xl space-y-10 md:space-y-12">
      {/* Hero */}
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-700 px-6 py-10 text-emerald-50 shadow-lg md:px-10 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-100 ring-1 ring-emerald-400/40">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              <span>Données issues de sources officielles internationales — mises à jour 2025/2026</span>
              <span className="ml-1 rounded-full bg-emerald-300 px-2 py-0.5 text-[10px] font-semibold text-emerald-900">
                Nouveau
              </span>
            </div>
            <h1 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-emerald-50 sm:text-4xl md:text-5xl">
              Rankings
            </h1>
            <p className="mt-3 max-w-xl text-sm text-emerald-100 sm:text-base">
              Où se situent les universités algériennes dans le monde ? Une vue claire et honnête des principaux
              classements internationaux.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                asChild
                variant="primary"
                size="lg"
                className="rounded-full bg-emerald-100 px-6 text-emerald-900 hover:bg-emerald-50"
              >
                <Link href={LEAD_FORM_HREF}>Trouver mon école</Link>
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={handleShare}
                className="rounded-full border-emerald-200 bg-transparent px-5 text-emerald-50 hover:bg-emerald-50/10"
              >
                Partager cette page
              </Button>
            </div>
          </div>
          <div className="rounded-2xl bg-slate-900/40 p-5 text-sm shadow-inner sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Fait marquant 2026
            </p>
            <p className="mt-2 text-base font-semibold text-emerald-50">
              46 universités algériennes classées dans QS Arab 2026
            </p>
            <p className="mt-1 text-sm text-emerald-100">
              1<sup>er</sup> pays du monde arabe en nombre d&apos;établissements représentés.
            </p>
          </div>
        </div>
      </section>

      {/* Avertissement pédagogique */}
      <section className="rounded-2xl border border-amber-200 bg-amber-50/80 px-5 py-4 text-sm text-amber-900 shadow-sm md:px-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-lg" aria-hidden>
            ⚠️
          </span>
          <p>
            <span className="font-semibold">Important à comprendre avant de lire ces classements :</span> ils mesurent
            principalement la{" "}
            <span className="font-semibold">production de recherche scientifique et la visibilité web</span> des
            universités — pas directement la qualité de l&apos;enseignement ni les débouchés professionnels. Une grande
            école comme l&apos;ENP ou l&apos;ESI peut avoir un enseignement d&apos;excellence sans figurer en tête des
            classements, simplement parce qu&apos;elle publie moins d&apos;articles qu&apos;une grande université.
            Utilisez ces données comme <span className="font-semibold">un indicateur parmi d&apos;autres</span>.
          </p>
        </div>
      </section>

      {/* Tabs classements */}
      <section aria-labelledby="rankings-tabs-title" className="space-y-6 md:space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="rankings-tabs-title" className="text-lg font-semibold text-slate-900 md:text-xl">
            Classements internationaux — vue par source
          </h2>
          <p className="text-xs text-slate-500">
            Chaque onglet correspond à un classement différent. Les données ne sont pas directement comparables entre
            eux.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          {tabOrder.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium transition-colors",
                activeTab === tab.key
                  ? "bg-slate-900 text-slate-50 shadow-sm"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100"
              )}
            >
              <span aria-hidden>📊</span>
              <span>{tab.label}</span>
              {tab.key === "qsArab" || tab.key === "theArab" || tab.key === "scimago" ? (
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                  2025/2026
                </span>
              ) : null}
            </button>
          ))}
        </div>

        <RankingBlock ranking={currentRanking} />
      </section>

      {/* Section podium */}
      <section aria-labelledby="podium-title" className="space-y-6 md:space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 id="podium-title" className="text-lg font-semibold text-slate-900 md:text-xl">
              Les établissements algériens les plus présents dans les classements
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              Vue rapide des universités et grandes écoles qui ressortent le plus souvent, tous classements confondus.
              Ce n&apos;est pas un « top 10 officiel », mais une photographie des présences récurrentes.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
            <button
              type="button"
              onClick={() => setPodiumRegion("")}
              className={cn(
                "rounded-full px-3 py-1",
                podiumRegion === "" ? "bg-slate-900 text-slate-50" : "hover:bg-slate-200"
              )}
            >
              Partout en Algérie
            </button>
            <button
              type="button"
              onClick={() => setPodiumRegion("Alger")}
              className={cn(
                "rounded-full px-3 py-1",
                podiumRegion === "Alger" ? "bg-slate-900 text-slate-50" : "hover:bg-slate-200"
              )}
            >
              Région d&apos;Alger
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredPodium.map((card) => (
            <article
              key={card.name}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-card"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{card.name}</h3>
                    <p className="text-xs text-slate-500">{card.city}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                    {card.bestRank}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {card.rankings.map((r) => (
                    <span
                      key={r}
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-medium",
                        podiumRankingPillColor[r] ?? "bg-slate-100 text-slate-700"
                      )}
                    >
                      {r}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate-600">
                  <span className="font-semibold">Disciplines fortes :</span> {card.disciplines.join(" · ")}
                </p>
                <p className="mt-1 text-xs text-emerald-700">{card.note}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Button asChild variant="secondary" size="sm" className="rounded-full px-4 py-1.5 text-xs">
                  <Link href={card.profileUrl}>Voir la fiche</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA intermédiaire */}
      <section className="rounded-2xl bg-emerald-50 px-6 py-7 text-center text-slate-900 shadow-card md:px-8">
        <h2 className="text-base font-semibold md:text-lg">
          Les classements donnent une photo globale. Pour ton{" "}
          <span className="font-display">projet à toi</span>, il faut croiser budget, filière et ville.
        </h2>
        <p className="mt-2 text-sm text-slate-700">
          Réponds à quelques questions et reçois une sélection d&apos;établissements publics et privés adaptée à ton
          profil (WhatsApp, gratuit).
        </p>
        <div className="mt-4 flex justify-center">
          <Button asChild variant="primary" size="lg" className="rounded-full px-8">
            <Link href={LEAD_FORM_HREF}>Lancer le formulaire kompar - edu</Link>
          </Button>
        </div>
      </section>

      {/* FAQ / Comprendre les classements */}
      <section aria-labelledby="faq-title" className="space-y-5 md:space-y-6">
        <div>
          <h2 id="faq-title" className="text-lg font-semibold text-slate-900 md:text-xl">
            Comprendre les classements
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Quelques repères pour interpréter les scores sans se tromper de signal. Les classements sont utiles, mais
            ils ne disent pas tout.
          </p>
        </div>
        <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {faqItems.map((item) => {
            const open = openFaq === item.question;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : item.question)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-900 md:px-5 md:py-4"
                  aria-expanded={open}
                >
                  <span>{item.question}</span>
                  <span className="ml-3 text-lg text-slate-400" aria-hidden>
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open && (
                  <div className="px-4 pb-4 text-sm text-slate-700 md:px-5">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Sources officielles */}
      <section aria-labelledby="sources-title" className="space-y-5 md:space-y-6">
        <div>
          <h2 id="sources-title" className="text-lg font-semibold text-slate-900 md:text-xl">
            Sources officielles
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Toujours vérifier à la source. Ces liens mènent vers les classements originaux et vers la plateforme
            officielle du MESRS.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sourcesLinks.map((s) => (
            <article
              key={s.name}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-800 shadow-card"
            >
              <h3 className="flex items-center justify-between text-sm font-semibold text-slate-900">
                <span>{s.name}</span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                  Officiel
                </span>
              </h3>
              <p className="mt-1 text-xs text-slate-600">{s.desc}</p>
              <Link
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:underline"
              >
                Ouvrir la source
                <span aria-hidden>↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="mb-8 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 px-6 py-8 text-center text-emerald-50 shadow-lg md:px-10 md:py-10">
        <h2 className="text-lg font-semibold md:text-xl">
          Tu hésites encore entre plusieurs universités publiques et privées ?
        </h2>
        <p className="mt-2 text-sm text-emerald-100 md:text-base">
          Les rankings donnent la vue macro. Pour ton cas personnel (bac, budget, ville, projet), remplis le
          formulaire et reçois une comparaison{" "}
          <span className="font-semibold">sur mesure par WhatsApp, gratuitement.</span>
        </p>
        <div className="mt-5 flex justify-center">
          <Button asChild variant="secondary" size="lg" className="rounded-full border-2 border-white px-8">
            <Link href={LEAD_FORM_HREF}>Lancer le formulaire kompar - edu</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

type RankingBlockProps = {
  ranking: RankingConfig;
};

function RankingBlock({ ranking }: RankingBlockProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card md:p-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold",
              rankingColorClasses[ranking.color]
            )}
          >
            <span aria-hidden>🏷️</span>
            <span>{ranking.name}</span>
          </div>
          <p className="text-xs text-slate-500">
            Édition {ranking.edition} · publié le {ranking.publishedDate}
          </p>
          <p className="text-xs text-slate-600">
            <span className="font-semibold">Ce que ça mesure :</span> {ranking.measures}
          </p>
          <p className="text-xs text-slate-600">
            <span className="font-semibold">Ce que ça ne mesure pas :</span> {ranking.doesNotMeasure}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 text-right">
          <Link
            href={ranking.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium shadow-sm",
              rankingColorClasses[ranking.color]
            )}
          >
            <span>Voir le classement officiel</span>
            <span aria-hidden>↗</span>
          </Link>
          <div className={cn("max-w-xs rounded-xl p-3 text-xs", rankingColorClasses[ranking.color])}>
            <p className="font-semibold">Fait marquant de l&apos;édition</p>
            <p className="mt-1">{ranking.highlight}</p>
            {ranking.name.includes("SCImago") && (
              <p className="mt-1 text-[11px] opacity-80">
                ⚠ EMP : école militaire — non accessible au public, mais incluse ici pour la lisibilité des données.
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-[760px] text-left text-xs text-slate-700">
          <thead className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2 text-left">Établissement</th>
              <th className="px-3 py-2 text-center">Rang national</th>
              <th className="px-3 py-2 text-center">Rang régional / mondial</th>
              <th className="px-3 py-2 text-left">Disciplines fortes</th>
              <th className="px-3 py-2 text-left">Pourquoi classé ici</th>
            </tr>
          </thead>
          <tbody>
            {ranking.institutions.map((row) => {
              const profile = profileLinkMap[row.name];
              const isMilitary = row.name.includes("École Militaire Polytechnique");
              return (
                <tr key={row.name} className="border-b border-slate-100 last:border-0">
                  <td className="px-3 py-2 align-middle">
                    {profile ? (
                      <Link
                        href={profile}
                        className="text-xs font-semibold text-emerald-700 hover:underline"
                      >
                        {row.name}
                      </Link>
                    ) : (
                      <span className="text-xs font-semibold text-slate-900">
                        {row.name}
                      </span>
                    )}
                    {isMilitary && (
                      <p className="mt-0.5 text-[10px] text-amber-700">
                        ⚠ École militaire — non accessible au public.
                      </p>
                    )}
                    {row.note && !isMilitary && (
                      <p className="mt-0.5 text-[10px] text-slate-500">{row.note}</p>
                    )}
                  </td>
                  <td className="px-3 py-2 align-middle text-center text-xs">
                    {row.nationalRank !== null ? `#${row.nationalRank}` : "Classée"}
                  </td>
                  <td className="px-3 py-2 align-middle text-center text-xs">{renderRankCell(row)}</td>
                  <td className="px-3 py-2 align-middle text-xs">
                    {row.disciplines.length ? row.disciplines.join(" · ") : "N/C"}
                  </td>
                  <td className="px-3 py-2 align-middle text-xs">{row.why || "N/C"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-[11px] text-slate-500">
        Ces données mesurent principalement la{" "}
        <span className="font-semibold">recherche et la visibilité web</span>, pas directement la qualité de
        l&apos;enseignement ni les débouchés professionnels. Vérifiez toujours les informations auprès de
        l&apos;établissement et complétez avec les taux d&apos;insertion, les contenus de programmes et vos propres
        critères.
      </p>
    </section>
  );
}

function renderRankCell(row: RankingInstitutionRow) {
  const regional = row.regionalRank;
  const global = row.globalRank;
  if (regional && global) return `${regional} / ${global}`;
  if (regional) return regional;
  if (global) return global;
  return "Classée";
}

