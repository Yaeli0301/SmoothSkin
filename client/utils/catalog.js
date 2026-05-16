import { COLLECTIONS } from '@/constants/collections';
import { fetchProducts, fetchProduct, fetchCollection, fetchStoreSettings } from './api';
import { FALLBACK_PRODUCTS, FALLBACK_STORE_SETTINGS } from './fallbackProducts';

export async function getProducts(category) {
  try {
    const data = await fetchProducts(category);
    if (Array.isArray(data) && data.length > 0) return data;
  } catch {
    /* API offline – use demo catalog */
  }
  if (category) return FALLBACK_PRODUCTS.filter((p) => p.category === category);
  return FALLBACK_PRODUCTS;
}

export async function getProduct(idOrSlug) {
  try {
    const data = await fetchProduct(idOrSlug);
    if (data) return data;
  } catch {
    /* fallback */
  }
  return (
    FALLBACK_PRODUCTS.find((p) => p.slug === idOrSlug || p._id === idOrSlug) ||
    FALLBACK_PRODUCTS[0]
  );
}

export async function getCollection(slug) {
  const meta = COLLECTIONS[slug];
  if (!meta) return null;

  try {
    const data = await fetchCollection(slug);
    if (data?.products?.length) return data;
  } catch {
    /* fallback */
  }

  return {
    ...meta,
    slug,
    products: FALLBACK_PRODUCTS.filter((p) => p.category === slug),
  };
}

export async function getStoreSettings() {
  try {
    const data = await fetchStoreSettings();
    if (data) return data;
  } catch {
    /* fallback */
  }
  return FALLBACK_STORE_SETTINGS;
}
