import Image from 'next/image';
import Link from 'next/link';

export default function Hero({ headline }) {
  return (
    <section className="section-padding flex flex-col md:flex-row items-center gap-10 pt-8">
      <div className="flex-1 text-center md:text-right order-2 md:order-1">
        <p className="text-primary font-semibold mb-3">⭐ מוצר הכי נמכר 2025</p>
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-6">
          {headline || 'עור חלק תוך שניות – בלי כאב ובלי מאמץ'}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          המכשיר שמסיר שיער פנים תוך 30 שניות – בטוח, מהיר וללא כאב
        </p>
        <Link href="/product" className="btn-primary inline-flex">
          קני עכשיו
        </Link>
      </div>
      <div className="flex-1 order-1 md:order-2">
        <div className="relative aspect-square max-w-md mx-auto rounded-card overflow-hidden shadow-soft">
          <Image
            src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80"
            alt="מכשיר הסרת שיער"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
