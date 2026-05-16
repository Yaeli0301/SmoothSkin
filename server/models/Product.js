import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: String,
  rating: { type: Number, min: 1, max: 5 },
  text: String,
  image: String,
  date: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    headline: String,
    description: String,
    bullets: [String],
    price: { type: Number, required: true },
    compareAtPrice: Number,
    images: [String],
    stock: { type: Number, default: 50 },
    reviews: [reviewSchema],
    benefits: [{ icon: String, label: String }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
