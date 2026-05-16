import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'payment' },
    stripeSecretKey: String,
    stripePublishableKey: String,
    stripeWebhookSecret: String,
    payoutEmail: String,
    payoutPhone: String,
    payoutBankName: String,
    payoutAccountNumber: String,
    payoutNotes: String,
    currency: { type: String, default: 'ils' },
    storeName: { type: String, default: 'SmoothSkin' },
  },
  { timestamps: true }
);

export default mongoose.model('Settings', settingsSchema);
