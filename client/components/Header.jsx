import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-accent/50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-extrabold text-primary">
          SmoothSkin
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/admin/login" className="text-sm text-gray-500 hover:text-primary">
            מנהל
          </Link>
          <Link href="/product" className="btn-primary text-sm py-2 px-5 min-h-0">
            קני עכשיו
          </Link>
        </div>
      </div>
    </header>
  );
}
