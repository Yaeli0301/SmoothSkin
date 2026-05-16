export const metadata = {
  title: 'פאנל מנהל – SmoothSkin',
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
