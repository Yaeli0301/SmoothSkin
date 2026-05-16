import '@/styles/globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import StoreShell from '@/components/StoreShell';

export const metadata = {
  title: 'Glow Routine – טיפוח ביתי חכם',
  description: 'מוצרי יופי וטיפוח עצמי – שגרה פשוטה, תוצאות עקביות, תחושה טובה.',
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
