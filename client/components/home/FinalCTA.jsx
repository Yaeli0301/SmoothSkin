import Link from 'next/link';
import CountdownTimer from '@/components/CountdownTimer';

export default function FinalCTA() {
  return (
    <section className="section-padding text-center">
      <CountdownTimer />
      <h2 className="text-3xl font-bold mt-8 mb-4">מוכנים לעור חלק?</h2>
      <p className="text-gray-600 mb-8">משלוח חינם | אחריות 30 יום | תשלום מאובטח</p>
      <Link href="/product" className="btn-primary inline-flex">
        הזמיני לפני שייגמר
      </Link>
    </section>
  );
}
