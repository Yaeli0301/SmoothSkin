import '@/styles/globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import StoreShell from '@/components/StoreShell';

export const metadata = {
  title: 'SmoothSkin – הסרת שיער ללא כאב',
  description: 'מכשיר הסרת שיער פנים – עור חלק תוך שניות, בלי כאב ובלי מאמץ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <GoogleAnalytics />
        <StoreShell>{children}</StoreShell>
      </body>
    </html>
  );
}
