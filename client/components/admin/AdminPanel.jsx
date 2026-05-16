'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { adminApi, setAdminToken } from '@/utils/adminApi';

const TABS = [
  { id: 'dashboard', label: 'דשבורד', icon: '📊' },
  { id: 'products', label: 'מוצרים', icon: '📦' },
  { id: 'orders', label: 'הזמנות', icon: '🛒' },
  { id: 'payments', label: 'תשלומים', icon: '💳' },
  { id: 'analytics', label: 'אנליטיקס', icon: '📈' },
];

const EMPTY_PRODUCT = {
  title: '',
  slug: '',
  headline: '',
  description: '',
  price: 149,
  compareAtPrice: 299,
  stock: 50,
  images: '',
  bullets: '',
  active: true,
};

const ORDER_STATUSES = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];
const STATUS_LABELS = {
  pending: 'ממתין',
  paid: 'שולם',
  shipped: 'נשלח',
  delivered: 'נמסר',
  cancelled: 'בוטל',
};

function StatCard({ label, value, sub }) {
  return (
    <div className="card text-center">
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

export default function AdminPanel() {
  const router = useRouter();
  const [tab, setTab] = useState('dashboard');
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const [dashboard, setDashboard] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payment, setPayment] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [paymentForm, setPaymentForm] = useState({});

  const showMsg = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(''), 3000);
  };

  const logout = () => {
    setAdminToken(null);
    router.push('/admin/login');
  };

  const loadAll = useCallback(async () => {
    setError('');
    try {
      const [me, dash, prods, ords, pay] = await Promise.all([
        adminApi.me(),
        adminApi.dashboard(30),
        adminApi.getProducts(),
        adminApi.getOrders(),
        adminApi.getPaymentSettings(),
      ]);
      setAdmin(me.admin);
      setDashboard(dash);
      setProducts(prods);
      setOrders(ords);
      setPayment(pay);
      setPaymentForm({
        stripePublishableKey: pay.stripePublishableKey || '',
        stripeSecretKey: '',
        stripeWebhookSecret: '',
        payoutEmail: pay.payoutEmail || '',
        payoutPhone: pay.payoutPhone || '',
        payoutBankName: pay.payoutBankName || '',
        payoutAccountNumber: pay.payoutAccountNumber || '',
        payoutNotes: pay.payoutNotes || '',
        storeName: pay.storeName || '',
      });
    } catch (err) {
      if (err.message.includes('התחברות') || err.message.includes('טוקן')) {
        router.push('/admin/login');
        return;
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const productToForm = (p) => ({
    title: p.title || '',
    slug: p.slug || '',
    headline: p.headline || '',
    description: p.description || '',
    price: p.price || 0,
    compareAtPrice: p.compareAtPrice || 0,
    stock: p.stock ?? 50,
    images: (p.images || []).join('\n'),
    bullets: (p.bullets || []).join('\n'),
    active: p.active !== false,
  });

  const formToProduct = (f) => ({
    title: f.title,
    slug: f.slug || undefined,
    headline: f.headline,
    description: f.description,
    price: Number(f.price),
    compareAtPrice: Number(f.compareAtPrice) || undefined,
    stock: Number(f.stock),
    images: f.images.split('\n').map((s) => s.trim()).filter(Boolean),
    bullets: f.bullets.split('\n').map((s) => s.trim()).filter(Boolean),
    active: f.active,
  });

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      const body = formToProduct(form);
      if (editing) {
        await adminApi.updateProduct(editing._id, body);
        showMsg('מוצר עודכן');
      } else {
        await adminApi.createProduct(body);
        showMsg('מוצר נוסף');
      }
      setEditing(null);
      setForm(EMPTY_PRODUCT);
      const prods = await adminApi.getProducts();
      setProducts(prods);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm('למחוק מוצר?')) return;
    try {
      await adminApi.deleteProduct(id);
      showMsg('נמחק');
      setProducts(await adminApi.getProducts());
    } catch (err) {
      setError(err.message);
    }
  };

  const savePayment = async (e) => {
    e.preventDefault();
    try {
      const body = { ...paymentForm };
      if (!body.stripeSecretKey) delete body.stripeSecretKey;
      if (!body.stripeWebhookSecret) delete body.stripeWebhookSecret;
      const pay = await adminApi.updatePaymentSettings(body);
      setPayment(pay);
      showMsg('הגדרות תשלום נשמרו');
    } catch (err) {
      setError(err.message);
    }
  };

  const updateOrder = async (id, status) => {
    try {
      await adminApi.updateOrderStatus(id, status);
      setOrders(await adminApi.getOrders());
      showMsg('סטטוס עודכן');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">טוען פאנל מנהל...</p>
      </div>
    );
  }

  const s = dashboard?.summary || {};

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-secondary text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="font-bold text-lg">SmoothSkin</h1>
          <p className="text-sm opacity-70">פאנל מנהל</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`w-full text-right px-4 py-3 rounded-card transition ${
                tab === t.id ? 'bg-primary' : 'hover:bg-white/10'
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 text-sm">
          <p className="opacity-70 mb-2">{admin?.email}</p>
          <button type="button" onClick={logout} className="text-accent hover:underline">
            התנתק
          </button>
          <Link href="/" className="block mt-2 text-accent hover:underline">
            צפה באתר
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="md:hidden flex gap-2 overflow-x-auto mb-4 pb-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-3 py-2 rounded-full text-sm whitespace-nowrap ${
                tab === t.id ? 'bg-primary text-white' : 'bg-white shadow-soft'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {msg && (
          <div className="bg-green-50 text-green-700 px-4 py-2 rounded-card mb-4">{msg}</div>
        )}
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-card mb-4">{error}</div>
        )}

        {tab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">סקירה כללית (30 יום)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard label="הכנסות" value={`₪${s.revenue || 0}`} />
              <StatCard label="הזמנות ששולמו" value={s.paidOrders || 0} />
              <StatCard label="שיעור המרה" value={`${s.conversionRate || 0}%`} />
              <StatCard label="צפיות" value={s.pageViews || 0} />
              <StatCard label="הוספה לעגלה" value={s.addToCart || 0} />
              <StatCard label="ממתינות לתשלום" value={s.pendingOrders || 0} />
              <StatCard label="מוצרים פעילים" value={s.activeProducts || 0} />
              <StatCard label="Exit intent" value={s.exitIntent || 0} />
            </div>
            <h3 className="font-bold mb-3">הזמנות אחרונות</h3>
            <div className="space-y-2">
              {(dashboard?.recentOrders || []).map((o) => (
                <div key={o._id} className="card flex justify-between text-sm">
                  <span>{o.customer?.name} – {o.productTitle}</span>
                  <span>₪{o.amount} | {STATUS_LABELS[o.status] || o.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'products' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {editing ? 'עריכת מוצר' : 'מוצר חדש'}
              </h2>
              <form onSubmit={saveProduct} className="card space-y-3">
                {['title', 'slug', 'headline', 'price', 'compareAtPrice', 'stock'].map((field) => (
                  <div key={field}>
                    <label className="text-sm font-medium">{field}</label>
                    <input
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      required={['title', 'price'].includes(field)}
                    />
                  </div>
                ))}
                <div>
                  <label className="text-sm font-medium">תיאור</label>
                  <textarea
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    rows={2}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">תמונות (URL לשורה)</label>
                  <textarea
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    rows={3}
                    value={form.images}
                    onChange={(e) => setForm({ ...form, images: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">יתרונות (שורה לכל)</label>
                  <textarea
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    rows={3}
                    value={form.bullets}
                    onChange={(e) => setForm({ ...form, bullets: e.target.value })}
                  />
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  />
                  פעיל בחנות
                </label>
                <div className="flex gap-2">
                  <button type="submit" className="btn-primary flex-1 min-h-0 py-2">
                    {editing ? 'שמור שינויים' : 'הוסף מוצר'}
                  </button>
                  {editing && (
                    <button
                      type="button"
                      className="btn-secondary min-h-0 py-2"
                      onClick={() => {
                        setEditing(null);
                        setForm(EMPTY_PRODUCT);
                      }}
                    >
                      ביטול
                    </button>
                  )}
                </div>
              </form>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">כל המוצרים ({products.length})</h2>
              <div className="space-y-3">
                {products.map((p) => (
                  <div key={p._id} className="card">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold">{p.title}</p>
                        <p className="text-sm text-gray-500">/{p.slug} | ₪{p.price}</p>
                        <p className="text-xs mt-1">
                          מלאי: {p.stock} | {p.active ? '✅ פעיל' : '⛔ מוסתר'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/product/${p.slug}`}
                          target="_blank"
                          className="text-sm text-primary"
                        >
                          צפה
                        </Link>
                        <button
                          type="button"
                          className="text-sm text-blue-600"
                          onClick={() => {
                            setEditing(p);
                            setForm(productToForm(p));
                          }}
                        >
                          ערוך
                        </button>
                        <button
                          type="button"
                          className="text-sm text-red-500"
                          onClick={() => deleteProduct(p._id)}
                        >
                          מחק
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">הזמנות ({orders.length})</h2>
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o._id} className="card">
                  <div className="flex flex-wrap justify-between gap-2 mb-2">
                    <div>
                      <p className="font-bold">{o.customer?.name}</p>
                      <p className="text-sm text-gray-500">
                        {o.customer?.email} | {o.customer?.phone}
                      </p>
                      <p className="text-sm">{o.productTitle} – ₪{o.amount}</p>
                    </div>
                    <select
                      value={o.status}
                      onChange={(e) => updateOrder(o._id, e.target.value)}
                      className="border rounded-lg px-3 py-2"
                    >
                      {ORDER_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {STATUS_LABELS[st]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-xs text-gray-400">
                    {new Date(o.createdAt).toLocaleString('he-IL')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'payments' && (
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold mb-2">הגדרות תשלום</h2>
            <p className="text-gray-600 text-sm mb-6">
              כאן מגדירים לאן מגיעים הכספים (Stripe) ופרטי חשבון לקבלה
            </p>
            <form onSubmit={savePayment} className="card space-y-4">
              <h3 className="font-bold">Stripe – קבלת תשלומים</h3>
              <p className="text-xs text-gray-500">
                מפתח סודי נוכחי: {payment?.stripeSecretKey || 'לא הוגדר'}
              </p>
              {[
                ['stripePublishableKey', 'Publishable Key (pk_...)'],
                ['stripeSecretKey', 'Secret Key חדש (sk_...) – השאר ריק אם לא משנים'],
                ['stripeWebhookSecret', 'Webhook Secret חדש'],
              ].map(([key, label]) => (
                <div key={key}>
                  <label className="text-sm font-medium">{label}</label>
                  <input
                    type={key.includes('Secret') ? 'password' : 'text'}
                    className="w-full border rounded-lg px-3 py-2 mt-1 font-mono text-sm"
                    value={paymentForm[key] || ''}
                    onChange={(e) => setPaymentForm({ ...paymentForm, [key]: e.target.value })}
                  />
                </div>
              ))}
              <h3 className="font-bold pt-4">פרטי קבלת כספים (לעצמך)</h3>
              {[
                ['payoutEmail', 'אימייל לקבלת התראות'],
                ['payoutPhone', 'טלפון'],
                ['payoutBankName', 'שם בנק'],
                ['payoutAccountNumber', 'מספר חשבון / IBAN'],
                ['payoutNotes', 'הערות נוספות'],
                ['storeName', 'שם החנות'],
              ].map(([key, label]) => (
                <div key={key}>
                  <label className="text-sm font-medium">{label}</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    value={paymentForm[key] || ''}
                    onChange={(e) => setPaymentForm({ ...paymentForm, [key]: e.target.value })}
                  />
                </div>
              ))}
              <button type="submit" className="btn-primary w-full min-h-0 py-3">
                שמור הגדרות תשלום
              </button>
            </form>
          </div>
        )}

        {tab === 'analytics' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">אנליטיקס מפורט</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="card">
                <h3 className="font-bold mb-4">הכנסות יומיות</h3>
                <div className="space-y-2 text-sm">
                  {(dashboard?.dailyRevenue || []).slice(-14).map((d) => (
                    <div key={d._id} className="flex justify-between">
                      <span>{d._id}</span>
                      <span>₪{d.revenue} ({d.orders} הזמנות)</span>
                    </div>
                  ))}
                  {!dashboard?.dailyRevenue?.length && (
                    <p className="text-gray-400">אין נתונים עדיין</p>
                  )}
                </div>
              </div>
              <div className="card">
                <h3 className="font-bold mb-4">צפיות יומיות</h3>
                <div className="space-y-2 text-sm">
                  {(dashboard?.dailyViews || []).slice(-14).map((d) => (
                    <div key={d._id} className="flex justify-between">
                      <span>{d._id}</span>
                      <span>{d.count} צפיות</span>
                    </div>
                  ))}
                  {!dashboard?.dailyViews?.length && (
                    <p className="text-gray-400">אין נתונים עדיין</p>
                  )}
                </div>
              </div>
            </div>
            <div className="card">
              <h3 className="font-bold mb-4">ביצועי A/B Testing</h3>
              <div className="flex gap-8">
                {(dashboard?.variantStats || []).map((v) => (
                  <div key={v._id}>
                    <p className="text-2xl font-bold text-primary">{v.count}</p>
                    <p className="text-sm">וריאנט {v._id}</p>
                  </div>
                ))}
                {!dashboard?.variantStats?.length && (
                  <p className="text-gray-400">אין רכישות עם וריאנט עדיין</p>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-4">
                שיעור עגלה: {s.cartRate || 0}% | המרה: {s.conversionRate || 0}%
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
