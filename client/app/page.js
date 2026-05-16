import HomePage from '@/components/HomePage';
import { fetchProduct } from '@/utils/api';
import { FALLBACK_PRODUCT } from '@/utils/fallbackProduct';

export default async function Page() {
  let product = FALLBACK_PRODUCT;
  try {
    product = await fetchProduct();
  } catch {
    /* use fallback when API unavailable */
  }
  return <HomePage product={product} />;
}
