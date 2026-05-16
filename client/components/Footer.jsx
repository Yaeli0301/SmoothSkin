export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm opacity-80">
        <p className="mb-2">תשלום מאובטח | משלוח חינם | אחריות מלאה</p>
        <p>© {new Date().getFullYear()} SmoothSkin. כל הזכויות שמורות.</p>
      </div>
    </footer>
  );
}
