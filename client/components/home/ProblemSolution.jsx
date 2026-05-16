export default function ProblemSolution() {
  return (
    <section className="section-padding">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card border-2 border-red-100 bg-red-50/50">
          <h2 className="text-2xl font-bold mb-4 text-red-600">😣 הבעיה</h2>
          <p className="text-lg">נמאס משעווה וכאב?</p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>• כאב בזמן הסרת שיער</li>
            <li>• אדמומיות וגירוי בעור</li>
            <li>• בזבוז זמן וכסף על טיפולים</li>
          </ul>
        </div>
        <div className="card border-2 border-green-100 bg-green-50/50">
          <h2 className="text-2xl font-bold mb-4 text-green-600">✨ הפתרון</h2>
          <p className="text-lg font-semibold">המכשיר שמסיר שיער תוך 30 שניות</p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>✔ ללא כאב וללא גירוי</li>
            <li>✔ תוצאה מיידית</li>
            <li>✔ שימוש בבית, בכל זמן</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
