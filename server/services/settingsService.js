import Settings from '../models/Settings.js';

let cache = null;
let cacheTime = 0;
const CACHE_TTL = 30_000;

export async function getPaymentSettings() {
  if (cache && Date.now() - cacheTime < CACHE_TTL) return cache;
  let settings = await Settings.findOne({ key: 'payment' });
  if (!settings) {
    settings = await Settings.create({ key: 'payment' });
  }
  cache = settings;
  cacheTime = Date.now();
  return settings;
}

export function clearSettingsCache() {
  cache = null;
  cacheTime = 0;
}

export function maskSecret(value) {
  if (!value || value.length < 8) return value ? '••••••••' : '';
  return `${value.slice(0, 7)}••••••••${value.slice(-4)}`;
}
