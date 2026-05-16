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

export async function trackPageView(page, abVariant) {
  const sessionId = getSessionId();
  gtag('event', 'page_view', { page_path: page, ab_variant: abVariant });
  await trackEvent({ event: 'page_view', page, sessionId, abVariant });
}

export async function trackAddToCart(productId, abVariant) {
  const sessionId = getSessionId();
  gtag('event', 'add_to_cart', { items: [{ id: productId }] });
  await trackEvent({ event: 'add_to_cart', productId, sessionId, abVariant });
}

export async function trackPurchase(productId, abVariant, amount) {
  const sessionId = getSessionId();
  gtag('event', 'purchase', { value: amount, currency: 'ILS' });
  await trackEvent({
    event: 'purchase',
    productId,
    sessionId,
    abVariant,
    metadata: { amount },
  });
}

export async function trackExitIntent(page, abVariant) {
  const sessionId = getSessionId();
  gtag('event', 'exit_intent', { page_path: page });
  await trackEvent({ event: 'exit_intent', page, sessionId, abVariant });
}
