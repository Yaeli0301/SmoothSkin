import { redirect } from 'next/navigation';

export default function LegacyProductSlugPage({ params }) {
  redirect(`/products/${params.slug}`);
}
