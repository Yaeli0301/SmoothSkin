const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchProduct(slug = 'hair-remover') {
  const res = await fetch(`${API_URL}/products/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
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
