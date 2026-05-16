import { trackEvent } from './api';

const SESSION_KEY = 'ds_session_id';

export function getSessionId() {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function gtag(...args) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
}

async function send(event, payload = {}) {
  const sessionId = getSessionId();
  gtag('event', event, payload);
  await trackEvent({ event, sessionId, ...payload });
}

export async function trackPageView(page, abVariant) {
  await send('page_view', { page, abVariant });
}

export async function trackProductClick(productId, slug) {
  await send('product_click', { productId, page: `/products/${slug}`, metadata: { slug } });
}

export async function trackAddToCart(productId, abVariant) {
  await send('add_to_cart', { productId, abVariant });
}

export async function trackCheckoutStart(productId, abVariant) {
  await send('checkout_start', { productId, abVariant });
}

export async function trackPurchase(productId, abVariant, amount) {
  await send('purchase', { productId, abVariant, metadata: { amount } });
}

export async function trackExitIntent(page, abVariant) {
  await send('exit_intent', { page, abVariant });
}
