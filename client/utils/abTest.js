const AB_KEY = 'ds_ab_variant';

const VARIANTS = {
  A: {
    headline: 'עור חלק תוך שניות – בלי כאב ובלי מאמץ',
    ctaColor: 'primary',
    priceMultiplier: 1,
  },
  B: {
    headline: 'הסרת שיער מושלמת – תוצאות מיידיות!',
    ctaColor: 'secondary',
    priceMultiplier: 0.95,
  },
};

export function getAbVariant() {
  if (typeof window === 'undefined') return { key: 'A', ...VARIANTS.A };
  let variant = localStorage.getItem(AB_KEY);
  if (!variant || !VARIANTS[variant]) {
    variant = Math.random() < 0.5 ? 'A' : 'B';
    localStorage.setItem(AB_KEY, variant);
  }
  return { key: variant, ...VARIANTS[variant] };
}

export function getVariantPrice(basePrice) {
  const { priceMultiplier } = getAbVariant();
  return Math.round(basePrice * priceMultiplier);
}
