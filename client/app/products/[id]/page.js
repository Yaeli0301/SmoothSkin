import PremiumProductPage from '@/components/store/PremiumProductPage';
import { getProduct } from '@/utils/catalog';

export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);
  return {
    title: product.seo?.title || `${product.title} | Glow Routine`,
    description: product.seo?.description || product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }) {
  const product = await getProduct(params.id);
  return <PremiumProductPage product={product} />;
}
