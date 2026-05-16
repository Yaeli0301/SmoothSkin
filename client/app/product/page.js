import ProductPage from '@/components/ProductPage';
import { fetchProduct } from '@/utils/api';
import { FALLBACK_PRODUCT } from '@/utils/fallbackProduct';

export default async function ProductRoute() {
  let product = FALLBACK_PRODUCT;
  try {
    product = await fetchProduct();
  } catch {
    /* use fallback */
  }
  return <ProductPage product={product} />;
}
