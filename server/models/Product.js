import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: String,
  rating: { type: Number, min: 1, max: 5, default: 5 },
  text: String,
  image: String,
  verifiedPurchase: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    headline: String,
    shortDescription: String,
    description: String,
    hook: String,
    context: String,
    solution: String,
    bullets: [String],
    howItWorks: [String],
    price: { type: Number, required: true },
    compareAtPrice: Number,
    images: [String],
    stock: { type: Number, default: 50 },
    category: {
      type: String,
      enum: ['skin-care', 'hair-removal', 'oral-care', 'tools'],
      default: 'skin-care',
    },
    productType: String,
    reviews: [reviewSchema],
    benefits: [{ icon: String, label: String }],
    seo: {
      title: String,
      description: String,
      tags: [String],
    },
    generatedCopy: mongoose.Schema.Types.Mixed,
    showUrgencyBadge: { type: Boolean, default: false },
    discountTag: String,
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({ category: 1, active: 1 });

export default mongoose.model('Product', productSchema);
