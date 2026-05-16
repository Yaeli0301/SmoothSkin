import Image from 'next/image';

export default function ReviewsSection({ reviews = [] }) {
  if (!reviews.length) return null;

  return (
    <section className="section-padding border-t">
      <h2 className="text-2xl font-bold mb-8 text-center">מה הלקוחות אומרים</h2>
      <div className="space-y-6 max-w-2xl mx-auto">
        {reviews.map((r, i) => (
          <div key={i} className="card flex gap-4 items-start">
            {r.image && (
              <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                <Image src={r.image} alt={r.name} fill className="object-cover" />
              </div>
            )}
            <div>
              <p className="text-yellow-500 mb-1">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</p>
              <p className="text-gray-700 mb-2">{r.text}</p>
              <p className="font-semibold text-sm">– {r.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
