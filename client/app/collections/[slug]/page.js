import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/store/ProductCard';
import { fetchCollection } from '@/utils/api';
import { COLLECTIONS } from '@/constants/collections';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const meta = COLLECTIONS[params.slug];
  if (!meta) return { title: 'קולקציה | Glow Routine' };
  return { title: `${meta.title} | Glow Routine`, description: meta.description };
}

export default async function CollectionPage({ params }) {
  let data;
  try {
    data = await fetchCollection(params.slug);
  } catch {
    notFound();
  }

  return (
    <div className="pb-20">
      <section className="relative h-64 md:h-80 mb-12">
        <Image src={data.heroImage} alt={data.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl font-bold mb-3">{data.title}</h1>
            <p className="max-w-lg mx-auto opacity-95">{data.description}</p>
          </div>
        </div>
      </section>
      <section className="section-padding pt-0">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(data.products || []).map((p) => (
            <ProductCard key={p._id || p.slug} product={p} />
          ))}
        </div>
        {!data.products?.length && (
          <p className="text-center text-gray-500 py-12">מוצרים בדרך – בקרוב בקולקציה</p>
        )}
        <div className="text-center mt-12">
          <Link href="/products" className="btn-outline">
            לכל המוצרים
          </Link>
        </div>
      </section>
    </div>
  );
}
