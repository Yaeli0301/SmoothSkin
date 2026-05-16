import Stripe from 'stripe';
import { getPaymentSettings } from './settingsService.js';

export async function getStripe() {
  const settings = await getPaymentSettings();
  const secret = settings.stripeSecretKey || process.env.STRIPE_SECRET_KEY;
  if (!secret) return null;
  return new Stripe(secret);
}

export async function getWebhookSecret() {
  const settings = await getPaymentSettings();
  return settings.stripeWebhookSecret || process.env.STRIPE_WEBHOOK_SECRET;
}
