import mongoose from 'mongoose';

const abandonedCartSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productTitle: String,
    price: Number,
    emailSent: { type: Boolean, default: false },
    recovered: { type: Boolean, default: false },
  },
  { timestamps: true }
);

abandonedCartSchema.index({ emailSent: 1, createdAt: 1 });

export default mongoose.model('AbandonedCart', abandonedCartSchema);
