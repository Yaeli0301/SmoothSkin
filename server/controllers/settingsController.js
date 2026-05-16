import Settings from '../models/Settings.js';
import { clearSettingsCache, getPaymentSettings, maskSecret } from '../services/settingsService.js';

function toPublic(settings) {
  const obj = settings.toObject ? settings.toObject() : settings;
  return {
    ...obj,
    stripeSecretKey: obj.stripeSecretKey ? maskSecret(obj.stripeSecretKey) : '',
    stripeWebhookSecret: obj.stripeWebhookSecret ? maskSecret(obj.stripeWebhookSecret) : '',
    hasStripeSecret: Boolean(obj.stripeSecretKey || process.env.STRIPE_SECRET_KEY),
  };
}

export async function getPaymentSettingsHandler(req, res) {
  try {
    const settings = await getPaymentSettings();
    res.json(toPublic(settings));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updatePaymentSettings(req, res) {
  try {
    const allowed = [
      'stripeSecretKey',
      'stripePublishableKey',
      'stripeWebhookSecret',
      'payoutEmail',
      'payoutPhone',
      'payoutBankName',
      'payoutAccountNumber',
      'payoutNotes',
      'currency',
      'storeName',
    ];

    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined && req.body[key] !== '') {
        updates[key] = req.body[key];
      }
    }

    const settings = await Settings.findOneAndUpdate(
      { key: 'payment' },
      { $set: updates },
      { new: true, upsert: true }
    );

    clearSettingsCache();
    res.json(toPublic(settings));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
