import PremiumProductPage from '@/components/store/PremiumProductPage';
import { fetchProduct } from '@/utils/api';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  try {
    const product = await fetchProduct(params.id);
    return {
      title: product.seo?.title || `${product.title} | Glow Routine`,
      description: product.seo?.description || product.shortDescription,
    };
  } catch {
    return { title: 'מוצר | Glow Routine' };
  }
}

export default async function ProductDetailPage({ params }) {
  try {
    const product = await fetchProduct(params.id);
    return <PremiumProductPage product={product} />;
  } catch {
    notFound();
  }
}
