import mongoose from 'mongoose';

const storeSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'store' },
    storeName: { type: String, default: 'Glow Routine' },
    freeShippingBanner: {
      enabled: { type: Boolean, default: true },
      text: { type: String, default: 'משלוח חינם על הזמנות מעל ₪149' },
    },
    discountBanner: {
      enabled: { type: Boolean, default: false },
      text: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export default mongoose.model('StoreSettings', storeSettingsSchema);
