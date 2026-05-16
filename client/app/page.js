import HomePage from '@/components/HomePage';
import { getProducts } from '@/utils/catalog';

export default async function Page() {
  const products = await getProducts();
  return <HomePage products={products} />;
}
