'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { adminApi, setAdminToken } from '@/utils/adminApi';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@store.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { token } = await adminApi.login(email, password);
      setAdminToken(token);
      router.push('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">כניסת מנהל</h1>
        <p className="text-gray-500 text-center text-sm mb-8">פאנל ניהול החנות</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">אימייל</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-card px-4 py-3 focus:border-primary focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">סיסמה</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-card px-4 py-3 focus:border-primary focus:outline-none"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'מתחבר...' : 'התחבר'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          <Link href="/" className="text-primary hover:underline">
            חזרה לאתר
          </Link>
        </p>
        <p className="text-xs text-gray-400 text-center mt-4">
          ברירת מחדל: admin@store.com / admin123
        </p>
      </div>
    </div>
  );
}


