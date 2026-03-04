export type Lang = "fr" | "ar";

export const DEFAULT_LANG: Lang = "fr";

type Messages = Record<string, string>;

const fr: Messages = {
  "nav.etablissements": "Annuaire établissements",
  "nav.metiersSalons": "Métiers & Salons",
  "nav.fichesMetiers": "Fiches métiers",
  "nav.salons": "Salons étudiants",
  "nav.blog": "Le Mag'",
  "nav.contact": "Contact",
  "nav.rankings": "Rankings",
  "nav.cta": "Trouver mon École",
  "header.tagline":
    "1er comparateur neutre d'établissements scolaires en Algérie — publics et privés, données vérifiées, filtres avancés et recommandations gratuites par WhatsApp.",
  "home.hero.badge": "Comparateur gratuit · Tiers de confiance",
  "home.hero.title": "Une décision simplifiée pour vos études en Algérie",
  "home.hero.subtitle":
    "Agrégateur d'informations vérifiées : tableaux comparatifs, filtres dynamiques. Alger, Blida, Tipaza, Boumerdès.",
  "home.hero.primaryCta": "Trouver mon école",
  "home.hero.secondaryCta": "Comparer les établissements",
  "home.search.aria": "Recherche rapide",
  "home.search.placeholder": "Nom d'établissement...",
  "home.search.category": "Catégorie",
  "home.search.wilaya": "Wilaya",
  "home.search.submit": "Rechercher",
  "home.categories.title": "Catégories d'établissements",
  "home.why.title": "Pourquoi kompar - edu ?",
  "home.why.lead":
    "On ne vend pas le rêve : on vous aide à simplifier votre décision. Le formulaire d'orientation est l'échange valeur/information pour mériter une recommandation personnalisée.",
  "home.why.card1.title": "Agrégateur d'informations",
  "home.why.card1.text":
    "Données vérifiées (sites officiels, Google Maps). Pas d'annuaire statique : tableaux comparatifs et filtres dynamiques.",
  "home.why.card2.title": "Comparatif transparent",
  "home.why.card2.text":
    "Comparez côte à côte : coût, reconnaissance MESRS, langues, options. Outils de simulation pour affiner votre choix.",
  "home.why.card3.title": "Décision simplifiée",
  "home.why.card3.text":
    "Quelques questions → recommandations personnalisées. Échange de valeur : vous donnez vos critères, on vous oriente. Gratuit.",
  "home.cta.title": "Décision simplifiée : trouvez votre école en quelques clics",
  "home.cta.text":
    "Le formulaire est le passage pour mériter une recommandation personnalisée. Échange valeur/information, pas de contrainte.",
  "home.cta.button": "Trouver mon école",
  "home.visuals.title": "L'éducation privée, en images",
  "home.visuals.text":
    "Un aperçu concret des situations que nous aidons à éclairer : parents en recherche d'une école, étudiants en supérieur, vie au sein d'un établissement.",
  "home.visuals.card1":
    "Savoir où inscrire son enfant. Enfin. Plus de décisions prises dans le flou.",
  "home.visuals.card2":
    "Choisir sa filière. Pas la subir. Débouchés, salaires, avis réels — tout est là.",
  "home.visuals.card3":
    "Être vu par les bons profils. Les étudiants qui vous cherchent vous trouveront.",
  "footer.links.mentions": "Mentions légales",
  "footer.links.faq": "FAQ",
  "footer.links.conditions": "Conditions générales et politique de confidentialité",
  "footer.family.label": "De la même famille :",
  "footer.family.bank": "kompar - banques · comparateur de banques en Algérie",
  "footer.copyright": "© 2026 kompar - edu. Tous droits réservés.",
  "footer.disclaimer":
    "Les informations présentées sur ce site sont collectées à partir de sources publiques (sites officiels, Google Maps, réseaux sociaux des établissements) à titre informatif. Elles ne constituent pas un conseil pédagogique officiel et peuvent être incomplètes. Vérifiez toujours directement auprès de l'établissement avant toute inscription. Ce site est géré par un particulier et n'est affilié à aucun établissement d'enseignement.",
  "contact.title": "Contactez-nous",
  "rankings.hero.badge": "Données issues de sources officielles internationales — mises à jour 2025/2026",
  "rankings.hero.title": "Rankings",
  "rankings.hero.subtitle":
    "Où se situent les universités algériennes dans le monde ? Une vue claire et honnête des principaux classements internationaux.",
  "rankings.hero.cta.primary": "Trouver mon école",
  "rankings.hero.cta.share": "Partager cette page",
  "rankings.hero.highlight.title": "Fait marquant 2026",
  "rankings.hero.highlight.line1": "46 universités algériennes classées dans QS Arab 2026",
  "rankings.hero.highlight.line2":
    "1er pays du monde arabe en nombre d'établissements représentés.",
};

const ar: Messages = {
  "nav.etablissements": "دليل المؤسسات",
  "nav.metiersSalons": "المهن والصالونات",
  "nav.fichesMetiers": "بطاقات المهن",
  "nav.salons": "الصالونات الطلابية",
  "nav.blog": "المجلة",
  "nav.contact": "اتصال",
  "nav.rankings": "التصنيفات",
  "nav.cta": "ابحث عن مدرستي",
  "header.tagline":
    "أول مقارن محايد للمؤسسات التعليمية في الجزائر — عمومية وخاصة، معطيات موثوقة، فلاتر متقدمة وتوصيات مجانية عبر واتساب.",
  "home.hero.badge": "مقارنة مجانية · طرف موثوق",
  "home.hero.title": "قرار دراسي أسهل لمستقبلك في الجزائر",
  "home.hero.subtitle":
    "تجميع للمعلومات الموثوقة: جداول مقارنة، فلاتر ديناميكية. Alger، Blida، Tipaza، Boumerdès.",
  "home.hero.primaryCta": "ابحث عن مدرستي",
  "home.hero.secondaryCta": "قارن بين المؤسسات",
  "home.search.aria": "بحث سريع",
  "home.search.placeholder": "اسم المؤسسة...",
  "home.search.category": "الفئة",
  "home.search.wilaya": "الولاية",
  "home.search.submit": "بحث",
  "home.categories.title": "فئات المؤسسات",
  "home.why.title": "لماذا kompar - edu ؟",
  "home.why.lead":
    "لا نبيع الأحلام: نساعدك على تبسيط قرارك. استمارة التوجيه هي تبادل قيمة/معلومة للحصول على توصية شخصية.",
  "home.why.card1.title": "مجمِّع للمعلومات",
  "home.why.card1.text":
    "معطيات موثوقة (مواقع رسمية، Google Maps). ليس مجرد دليل ثابت بل جداول مقارنة وفلاتر ديناميكية.",
  "home.why.card2.title": "مقارنة شفافة",
  "home.why.card2.text":
    "قارن جنباً إلى جنب: التكلفة، اعتراف MESRS، اللغات، الخيارات. أدوات للمحاكاة لتدقيق اختيارك.",
  "home.why.card3.title": "قرار مبسَّط",
  "home.why.card3.text":
    "بضع أسئلة → توصيات شخصية. تبادل قيمة: أنت تعطي معاييرك، ونحن نوجّهك. مجاناً.",
  "home.cta.title": "قرار مبسَّط: اختر مؤسستك في بضع نقرات",
  "home.cta.text":
    "الاستمارة هي المرور الإجباري للحصول على توصية شخصية. تبادل قيمة/معلومة، بدون إكراه.",
  "home.cta.button": "ابحث عن مدرستي",
  "home.visuals.title": "التعليم الخاص، بالصور",
  "home.visuals.text":
    "نظرة ملموسة على الحالات التي نساعد على توضيحها: أولياء يبحثون عن مدرسة، طلبة في التعليم العالي، وحياة داخل المؤسسة.",
  "home.visuals.card1":
    "أن تعرف أخيراً أين تسجّل ابنك. لا مزيد من القرارات في الضباب.",
  "home.visuals.card2":
    "اختر تخصّصك، ولا تدعه يُفرض عليك. الآفاق، الرواتب، الآراء الحقيقية — كلّها هنا.",
  "home.visuals.card3":
    "أن تُرى من طرف الطلبة المناسبين. الطلبة الذين يبحثون عنكم سيجدونكم.",
  "footer.links.mentions": "الإشعارات القانونية",
  "footer.links.faq": "الأسئلة الشائعة",
  "footer.links.conditions": "الشروط العامة وسياسة السرية",
  "footer.family.label": "من نفس العائلة:",
  "footer.family.bank": "kompar - banques · مقارن البنوك في الجزائر",
  "footer.copyright": "© 2026 kompar - edu. جميع الحقوق محفوظة.",
  "footer.disclaimer":
    "المعلومات المعروضة في هذا الموقع مُستقاة من مصادر عمومية (مواقع رسمية، Google Maps، شبكات المؤسسات) على سبيل الاستعلام فقط. لا تُعتبر نصيحة بيداغوجية رسمية وقد تكون غير مكتملة. يجب دائماً التحقق مباشرة لدى المؤسسة قبل أي تسجيل. هذا الموقع مُسيَّر بصفة فردية ولا ينتمي إلى أي مؤسسة تعليمية.",
  "contact.title": "اتصل بنا",
  "rankings.hero.badge": "معطيات من مصادر رسمية دولية — تحديثات 2025/2026",
  "rankings.hero.title": "التصنيفات الدولية",
  "rankings.hero.subtitle":
    "أين تتموضع الجامعات الجزائرية في العالم؟ نظرة واضحة وموضوعية على أهم التصنيفات الدولية.",
  "rankings.hero.cta.primary": "ابحث عن مدرستي",
  "rankings.hero.cta.share": "شارك هذه الصفحة",
  "rankings.hero.highlight.title": "أهم ما يميز 2026",
  "rankings.hero.highlight.line1": "46 جامعة جزائرية مصنَّفة في QS Arab 2026",
  "rankings.hero.highlight.line2":
    "المرتبة الأولى عربياً من حيث عدد المؤسسات الممثَّلة.",
};

const MESSAGES: Record<Lang, Messages> = { fr, ar };

export function t(lang: Lang, key: string): string {
  const dict = MESSAGES[lang] || MESSAGES.fr;
  return dict[key] ?? MESSAGES.fr[key] ?? key;
}

