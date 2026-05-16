import HomePage from '@/components/HomePage';
import { fetchProducts, fetchStoreSettings } from '@/utils/api';

export default async function Page() {
  let products = [];
  try {
    products = await fetchProducts();
  } catch {
    /* fallback empty */
  }
  return <HomePage products={products} />;
}
