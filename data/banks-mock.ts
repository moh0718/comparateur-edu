export type BankType = "Publique" | "Privée" | "Islamique" | "Privée / Islamique";

export type CardTier = "Classique" | "Gold" | "Platinum";

export type BankRecord = {
  id: string;
  slug?: string;
  name: string;
  bankType: BankType;
  cardTier: CardTier;
  cost: string;
  offer: string;
  rate: string;
  insurance: string;
  dossierFees: string;
  cards: string;
  eligibility: string;
  accountOpeningDelay: string;
  processingDelays: string;
  acceptsFxAndInternational: boolean;
  customerServiceQuality: string;
  hasMobileApp: boolean;
  noHiddenFees: boolean;
  billPayment: boolean;
  storePayment: boolean;
  cashWithdrawal: boolean;
  hasForeignCurrencyAccount: boolean;
  atmFeaturesAdvanced: boolean;
};

const placeholder = (
  id: string,
  slug: string,
  name: string,
  bankType: BankRecord["bankType"]
): BankRecord => ({
  id,
  slug,
  name,
  bankType,
  cardTier: "Classique",
  cost: "—",
  offer: "—",
  rate: "—",
  insurance: "—",
  dossierFees: "—",
  cards: "—",
  eligibility: "—",
  accountOpeningDelay: "—",
  processingDelays: "—",
  acceptsFxAndInternational: false,
  customerServiceQuality: "—",
  hasMobileApp: false,
  noHiddenFees: false,
  billPayment: false,
  storePayment: false,
  cashWithdrawal: false,
  hasForeignCurrencyAccount: false,
  atmFeaturesAdvanced: false,
});

export const banks: BankRecord[] = [
  // ——— Banques publiques ———
  placeholder("cnep", "cnep-banque", "CNEP-Banque", "Publique"),
  {
    id: "bna",
    slug: "bna",
    name: "BNA (Banque Nationale d'Algérie)",
    bankType: "Publique",
    cardTier: "Classique",
    cost: "Faible",
    offer: "Compte courant + épargne, finance islamique publique",
    rate: "3,5% (crédit immo indicatif)",
    insurance: "Incluse pour certains crédits",
    dossierFees: "1 500 DA",
    cards: "Carte Classique, Visa",
    eligibility: "Salaire min. 30 000 DA, CDI recommandé",
    accountOpeningDelay: "3 à 5 jours ouvrés",
    processingDelays: "Virements internes < 24h, externes 48-72h",
    acceptsFxAndInternational: true,
    customerServiceQuality: "Présence forte en agence, téléphone",
    hasMobileApp: true,
    noHiddenFees: false,
    billPayment: true,
    storePayment: true,
    cashWithdrawal: true,
    hasForeignCurrencyAccount: false,
    atmFeaturesAdvanced: true,
  },
  {
    id: "bea",
    slug: "bea",
    name: "BEA (Banque Extérieure d'Algérie)",
    bankType: "Publique",
    cardTier: "Platinum",
    cost: "Élevé",
    offer: "Large gamme particuliers, comptes devises, Visa/Mastercard",
    rate: "2,9% (crédit immo indicatif)",
    insurance: "Incluse dans les packs premium",
    dossierFees: "3 000 DA",
    cards: "Gold, Platinum, Visa",
    eligibility: "Salaire min. 80 000 DA, CDI",
    accountOpeningDelay: "7 à 10 jours ouvrés",
    processingDelays: "Virements internes < 24h, externes 48h",
    acceptsFxAndInternational: true,
    customerServiceQuality: "Conseiller dédié pour certains clients",
    hasMobileApp: true,
    noHiddenFees: false,
    billPayment: true,
    storePayment: true,
    cashWithdrawal: true,
    hasForeignCurrencyAccount: true,
    atmFeaturesAdvanced: true,
  },
  {
    id: "cpa",
    slug: "cpa",
    name: "CPA (Crédit Populaire d'Algérie)",
    bankType: "Publique",
    cardTier: "Gold",
    cost: "Moyen",
    offer: "Crédit conso, véhicules locaux, financement jeunes entrepreneurs",
    rate: "3,9% (crédit conso indicatif)",
    insurance: "Optionnelle",
    dossierFees: "2 000 DA",
    cards: "Classique, Gold, MasterCard",
    eligibility: "Salaire min. 40 000 DA, CDI",
    accountOpeningDelay: "5 à 7 jours ouvrés",
    processingDelays: "Virements internes 24-48h, externes 72h",
    acceptsFxAndInternational: true,
    customerServiceQuality: "Agence + centre d'appel",
    hasMobileApp: true,
    noHiddenFees: false,
    billPayment: true,
    storePayment: true,
    cashWithdrawal: true,
    hasForeignCurrencyAccount: true,
    atmFeaturesAdvanced: true,
  },
  placeholder("badr", "badr", "BADR (Banque de l'Agriculture et du Développement Rural)", "Publique"),
  placeholder("bdl", "bdl", "BDL (Banque de Développement Local)", "Publique"),
  placeholder("bnh", "bnh", "BNH (Banque Nationale de l'Habitat)", "Publique"),
  // ——— Banques privées et étrangères ———
  {
    id: "sga",
    slug: "societe-generale-algerie",
    name: "Société Générale Algérie (SGA)",
    bankType: "Privée",
    cardTier: "Gold",
    cost: "Moyen à élevé",
    offer: "Packs bancaires, applications mobiles",
    rate: "3,2% (crédit auto indicatif)",
    insurance: "Incluse dans la plupart des crédits",
    dossierFees: "2 500 DA",
    cards: "Classique, Gold, Visa, MasterCard",
    eligibility: "Salaire min. 50 000 DA, CDI",
    accountOpeningDelay: "5 à 7 jours ouvrés",
    processingDelays: "Virements internes 24h, externes 48h",
    acceptsFxAndInternational: true,
    customerServiceQuality: "Agence, téléphone, assistance dédiée",
    hasMobileApp: true,
    noHiddenFees: false,
    billPayment: true,
    storePayment: true,
    cashWithdrawal: true,
    hasForeignCurrencyAccount: true,
    atmFeaturesAdvanced: true,
  },
  {
    id: "bnp",
    slug: "bnp-paribas-algerie",
    name: "BNP Paribas El Djazaïr",
    bankType: "Privée",
    cardTier: "Platinum",
    cost: "Élevé",
    offer: "Cadres et segment premium",
    rate: "2,7% (crédit immo indicatif)",
    insurance: "Incluse dans les packs et crédits",
    dossierFees: "3 500 DA",
    cards: "Gold, Platinum, Visa, MasterCard",
    eligibility: "Salaire min. 90 000 DA, CDI",
    accountOpeningDelay: "5 à 10 jours ouvrés",
    processingDelays: "Virements internes < 24h, externes 48h",
    acceptsFxAndInternational: true,
    customerServiceQuality: "Agence, téléphone, WhatsApp, gestionnaire dédié",
    hasMobileApp: true,
    noHiddenFees: true,
    billPayment: true,
    storePayment: true,
    cashWithdrawal: true,
    hasForeignCurrencyAccount: true,
    atmFeaturesAdvanced: true,
  },
  placeholder("banxy", "banxy", "Banxy (Natixis Algérie)", "Privée"),
  {
    id: "agb",
    slug: "agb",
    name: "Gulf Bank Algeria (AGB)",
    bankType: "Privée / Islamique",
    cardTier: "Gold",
    cost: "Compétitif",
    offer: "Cartes internationales Visa/Mastercard accessibles, change",
    rate: "Financement participatif (sans intérêt)",
    insurance: "Conforme à la finance islamique",
    dossierFees: "1 800 DA",
    cards: "Classique, Gold, Visa",
    eligibility: "Salaire min. 35 000 DA, CDI ou CDD stable",
    accountOpeningDelay: "3 à 5 jours ouvrés",
    processingDelays: "Virements internes < 24h, externes 48-72h",
    acceptsFxAndInternational: true,
    customerServiceQuality: "Agence, téléphone, WhatsApp pour certaines agences",
    hasMobileApp: true,
    noHiddenFees: true,
    billPayment: true,
    storePayment: true,
    cashWithdrawal: true,
    hasForeignCurrencyAccount: true,
    atmFeaturesAdvanced: true,
  },
  placeholder("al-salam", "al-salam-bank-algeria", "Al Salam Bank Algeria", "Privée / Islamique"),
  placeholder("al-baraka", "banque-al-baraka-algerie", "Banque Al Baraka d'Algérie", "Privée / Islamique"),
  placeholder("bank-abc", "bank-abc-algeria", "Bank ABC (Arab Banking Corporation)", "Privée"),
  placeholder("housing-bank", "housing-bank-hbtf", "Housing Bank (HBTF)", "Privée"),
  placeholder("fransabank", "fransabank-el-djazair", "Fransabank El Djazaïr", "Privée"),
  placeholder("trust-bank", "trust-bank-algeria", "Trust Bank Algeria", "Privée"),
  placeholder("arab-bank", "arab-bank-plc-algeria", "Arab Bank PLC Algeria", "Privée"),
  // ——— Cas spécifique ———
  placeholder("algerie-poste", "algerie-poste", "Algérie Poste (Baridimob)", "Publique"),
];
