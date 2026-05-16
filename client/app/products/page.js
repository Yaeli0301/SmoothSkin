import Link from 'next/link';
import ProductCard from '@/components/store/ProductCard';
import { fetchProducts } from '@/utils/api';

export const metadata = {
  title: 'כל המוצרים | Glow Routine',
  description: 'מוצרי טיפוח, הסרת שיער וטיפוח פה – שגרה פשוטה בבית.',
};

export default async function ProductsPage() {
  let products = [];
  try {
    products = await fetchProducts();
  } catch {
    /* empty */
  }

  return (
    <div className="pb-20">
      <section className="section-padding pt-10 text-center">
        <h1 className="premium-heading text-4xl mb-4">כל המוצרים</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          טיפוח חכם לבית – בחרי את מה שמתאים לשגרה שלך
        </p>
      </section>
      <section className="section-padding pt-0">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id || p.slug} product={p} />
          ))}
        </div>
        {products.length === 0 && (
          <p className="text-center text-gray-500 py-16">אין מוצרים זמינים כרגע</p>
        )}
      </section>
    </div>
  );
}
