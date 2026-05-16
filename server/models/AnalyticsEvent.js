import mongoose from 'mongoose';

const analyticsEventSchema = new mongoose.Schema(
  {
    event: {
      type: String,
      enum: ['page_view', 'add_to_cart', 'purchase', 'exit_intent', 'ab_exposure'],
      required: true,
    },
    page: String,
    productId: mongoose.Schema.Types.ObjectId,
    sessionId: String,
    abVariant: String,
    metadata: mongoose.Schema.Types.Mixed,
    userAgent: String,
    ip: String,
  },
  { timestamps: true }
);

analyticsEventSchema.index({ event: 1, createdAt: -1 });
analyticsEventSchema.index({ sessionId: 1 });

export default mongoose.model('AnalyticsEvent', analyticsEventSchema);
