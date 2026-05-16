export default function SocialProof() {
  const reviews = [
    { name: 'שירה', text: 'הכי טוב שקניתי!' },
    { name: 'מיכל', text: 'עובד מעולה, ממליצה' },
    { name: 'דנה', text: 'סוף סוף בלי כאב' },
  ];

  return (
    <section className="bg-accent/30 py-12">
      <div className="section-padding py-0 text-center">
        <p className="text-2xl font-bold mb-2">⭐ 4.8 | 1,200+ לקוחות מרוצים</p>
        <p className="text-gray-600 mb-8">אלפי לקוחות כבר קנו</p>
        <div className="grid md:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <div key={r.name} className="card text-right">
              <p className="text-yellow-500 mb-2">★★★★★</p>
              <p className="text-gray-700 mb-2">&ldquo;{r.text}&rdquo;</p>
              <p className="font-semibold text-sm">– {r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
