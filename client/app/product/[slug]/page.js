import ProductPage from '@/components/ProductPage';
import { fetchProduct } from '@/utils/api';
import { FALLBACK_PRODUCT } from '@/utils/fallbackProduct';

export default async function ProductBySlugPage({ params }) {
  let product = FALLBACK_PRODUCT;
  try {
    product = await fetchProduct(params.slug);
  } catch {
    /* fallback */
  }
  return <ProductPage product={product} />;
}
