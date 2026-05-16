const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

export function setAdminToken(token) {
  if (token) localStorage.setItem('admin_token', token);
  else localStorage.removeItem('admin_token');
}

async function adminFetch(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${API}/admin${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'שגיאת שרת');
  return data;
}

export const adminApi = {
  login: (email, password) =>
    adminFetch('/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  me: () => adminFetch('/me'),

  dashboard: (days = 30) => adminFetch(`/dashboard?days=${days}`),

  getProducts: () => adminFetch('/products'),
  createProduct: (body) => adminFetch('/products', { method: 'POST', body: JSON.stringify(body) }),
  updateProduct: (id, body) =>
    adminFetch(`/products/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteProduct: (id) => adminFetch(`/products/${id}`, { method: 'DELETE' }),

  getPaymentSettings: () => adminFetch('/settings/payment'),
  updatePaymentSettings: (body) =>
    adminFetch('/settings/payment', { method: 'PUT', body: JSON.stringify(body) }),

  getOrders: () => adminFetch('/orders'),
  updateOrderStatus: (id, status) =>
    adminFetch(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  generatePreview: (body) =>
    adminFetch('/products/generate-preview', { method: 'POST', body: JSON.stringify(body) }),

  getStoreSettings: () => adminFetch('/store-settings'),
  updateStoreSettings: (body) =>
    adminFetch('/store-settings', { method: 'PUT', body: JSON.stringify(body) }),
};
