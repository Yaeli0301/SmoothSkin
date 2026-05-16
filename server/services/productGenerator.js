import { COLLECTIONS } from '../constants/collections.js';

const REVIEW_TEMPLATES = [
  { text: 'נוח לשימוש, מרוצה מאוד', rating: 5 },
  { text: 'מרגיש איכותי ועובד טוב', rating: 5 },
  { text: 'הגיע מהר ועונה על הציפיות', rating: 4 },
  { text: 'פשוט ונוח לשימוש', rating: 5 },
  { text: 'עובד טוב, משתמשת כל יום', rating: 5 },
];

function pick(arr, n = 3) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

export function generateProductContent(input = {}) {
  const {
    productName = 'מוצר חדש',
    category = 'skin-care',
    productType = '',
    keyFeature = 'טיפוח נוח',
    targetBenefit = 'שגרה עקבית',
    price = 149,
  } = input;

  const collection = COLLECTIONS[category] || COLLECTIONS['skin-care'];

  const titleVariations = [
    `${productName} – שדרוג קטן לשגרת הטיפוח שלך`,
    `${productName} – טיפוח חכם, פשוט ונגיש`,
    `${productName} – להרגיש טוב עם עצמך, בקלות`,
  ];

  const bullets = [
    'קל לשימוש ביום־יום',
    'מותאם לשימוש ביתי',
    `משפר את ${targetBenefit}`,
    'חוויית שימוש נעימה ונוחה',
    keyFeature ? `${keyFeature}` : 'איכות גבוהה',
    'תוצאות עקביות עם שימוש סדיר',
  ].slice(0, 6);

  const howItWorks = [
    'שימוש פשוט בבית',
    'תוצאה הדרגתית ועקבית',
    'שילוב קל בשגרה היומית',
  ];

  const reviews = pick(REVIEW_TEMPLATES, 4).map((r, i) => ({
    name: ['נועה', 'מיה', 'אלה', 'תמר'][i] || 'לקוחה',
    rating: r.rating,
    text: r.text,
    verifiedPurchase: true,
  }));

  const hook = 'טיפוח עצמי צריך להיות פשוט וברור';
  const context = 'שגרה לא עקבית מקשה לראות תוצאות לאורך זמן';
  const solution = 'מוצרים חכמים שנועדו לפשט את שגרת הטיפוח';

  const shortDescription = `${productName} – ${keyFeature}. מתאים ל${collection.title}.`;

  return {
    title: titleVariations[0],
    headline: titleVariations[1],
    shortDescription,
    description: `${shortDescription} ${productType ? `סוג מוצר: ${productType}.` : ''}`,
    hook,
    context,
    solution,
    bullets,
    howItWorks,
    benefits: bullets.slice(0, 4).map((label, i) => ({
      icon: ['sparkle', 'home', 'heart', 'shield'][i],
      label,
    })),
    reviews,
    category,
    seo: {
      title: `${productName} | טיפוח ביתי חכם`,
      description: `${productName} – ${targetBenefit}. ${collection.description}`.slice(0, 155),
      tags: ['beauty', category, 'self care', 'home routine'],
    },
    generatedCopy: {
      titleVariations,
      cta: ['להוסיף לעגלה', 'לגלות עוד'],
      trust: ['משלוח מהיר', 'תשלום מאובטח', 'אחריות על המוצר'],
      uiSchema: {
        sections: [
          'hero',
          'gallery',
          'benefits',
          'problemSolution',
          'howItWorks',
          'trust',
          'reviews',
          'stickyCta',
        ],
      },
    },
    price: Number(price) || 149,
    compareAtPrice: Math.round((Number(price) || 149) * 1.4),
    showUrgencyBadge: false,
    images: [collection.heroImage],
  };
}
