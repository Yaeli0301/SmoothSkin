const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchProducts(category) {
  const q = category ? `?category=${category}` : '';
  const res = await fetch(`${API_URL}/products${q}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProduct(idOrSlug) {
  const res = await fetch(`${API_URL}/products/${idOrSlug}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export async function fetchCollection(slug) {
  const res = await fetch(`${API_URL}/collections/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch collection');
  return res.json();
}

export async function fetchCollections() {
  const res = await fetch(`${API_URL}/collections`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error('Failed to fetch collections');
  return res.json();
}

export async function fetchStoreSettings() {
  try {
    const res = await fetch(`${API_URL}/store/settings`, { next: { revalidate: 120 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function createCheckout(data) {
  const res = await fetch(`${API_URL}/orders/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Checkout failed');
  }
  return res.json();
}

export async function trackEvent(data) {
  try {
    await fetch(`${API_URL}/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {
    /* non-blocking */
  }
}

export async function saveAbandonedCart(data) {
  try {
    await fetch(`${API_URL}/cart/abandon`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {
    /* non-blocking */
  }
}
