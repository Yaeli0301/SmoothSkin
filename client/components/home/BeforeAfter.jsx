import Image from 'next/image';

export default function BeforeAfter() {
  return (
    <section className="section-padding">
      <h2 className="text-3xl font-bold text-center mb-12">לפני ואחרי</h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <div className="relative aspect-[4/3] rounded-card overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1515377901643-4a9748da9c6b?w=600&q=80"
            alt="לפני"
            fill
            loading="lazy"
            sizes="50vw"
            className="object-cover grayscale"
          />
          <span className="absolute bottom-4 right-4 bg-secondary text-white px-4 py-1 rounded-full font-bold">
            לפני
          </span>
        </div>
        <div className="relative aspect-[4/3] rounded-card overflow-hidden shadow-cta">
          <Image
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80"
            alt="אחרי"
            fill
            loading="lazy"
            sizes="50vw"
            className="object-cover"
          />
          <span className="absolute bottom-4 right-4 bg-primary text-white px-4 py-1 rounded-full font-bold">
            אחרי
          </span>
        </div>
      </div>
    </section>
  );
}
