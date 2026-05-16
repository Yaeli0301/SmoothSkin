'use client';

import { useState } from 'react';
import { createCheckout, saveAbandonedCart } from '@/utils/api';
import { trackAddToCart, trackCheckoutStart } from '@/utils/analytics';

export default function CheckoutModal({ product, price, abVariant, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await trackAddToCart(product._id, abVariant);
      await trackCheckoutStart(product._id, abVariant);
      const { url } = await createCheckout({
        productId: product._id,
        quantity: 1,
        customer: form,
        abVariant,
      });
      if (url) window.location.href = url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleEmailBlur = () => {
    if (form.email && product) {
      saveAbandonedCart({
        email: form.email,
        productId: product._id,
        productTitle: product.title,
        price,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-end md:items-center justify-center bg-black/50 p-0 md:p-4">
      <div className="bg-white rounded-t-card md:rounded-card w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">השלמת הזמנה</h2>
          <button type="button" onClick={onClose} className="text-2xl text-gray-400 hover:text-gray-600">
            ×
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          {product?.title} – <strong>₪{price}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: 'name', label: 'שם מלא', type: 'text' },
            { name: 'email', label: 'אימייל', type: 'email', onBlur: handleEmailBlur },
            { name: 'phone', label: 'טלפון', type: 'tel' },
            { name: 'address', label: 'כתובת', type: 'text' },
            { name: 'city', label: 'עיר', type: 'text' },
            { name: 'zip', label: 'מיקוד', type: 'text' },
          ].map(({ name, label, type, onBlur }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                name={name}
                type={type}
                required
                value={form[name]}
                onChange={handleChange}
                onBlur={onBlur}
                className="w-full border border-gray-200 rounded-card px-4 py-3 focus:outline-none focus:border-primary"
              />
            </div>
          ))}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'מעביר לתשלום...' : 'המשך לתשלום מאובטח'}
          </button>
        </form>
      </div>
    </div>
  );
}
