import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    stripeSessionId: String,
    stripePaymentIntentId: String,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productTitle: String,
    quantity: { type: Number, default: 1 },
    amount: Number,
    currency: { type: String, default: 'ils' },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    customer: {
      name: String,
      email: { type: String, required: true },
      phone: String,
      address: String,
      city: String,
      zip: String,
    },
    abVariant: String,
    analytics: {
      source: String,
      utmCampaign: String,
    },
    emailsSent: {
      confirmation: { type: Boolean, default: false },
      shipping: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
