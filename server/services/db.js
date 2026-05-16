import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import Product from '../models/Product.js';
import Settings from '../models/Settings.js';

const DEFAULT_PRODUCT = {
  slug: 'hair-remover',
  title: 'מכשיר הסרת שיער פנים – ללא כאב',
  headline: 'פתרון מהיר להסרת שיער פנים – בלי כאב',
  description: 'מכשיר חדשני להסרת שיער פנים תוך שניות.',
  bullets: ['מתאים לכל סוגי העור', 'שימוש תוך שניות', 'ללא אדמומיות'],
  price: 149,
  compareAtPrice: 299,
  stock: 23,
  images: [
    'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
  ],
  benefits: [
    { icon: 'heart', label: 'ללא כאב' },
    { icon: 'mobile', label: 'נייד' },
    { icon: 'zap', label: 'מהיר' },
    { icon: 'shield', label: 'בטוח לעור' },
  ],
  reviews: [
    { name: 'שירה כ.', rating: 5, text: 'מדהים! ממליצה בחום!' },
    { name: 'מיכל ר.', rating: 5, text: 'סוף סוף בלי כאב.' },
  ],
  active: true,
};

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dropship';

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 4000 });
    console.log('MongoDB connected');
    return;
  } catch (err) {
    console.warn('Local MongoDB unavailable, starting in-memory database...');
  }

  const { MongoMemoryServer } = await import('mongodb-memory-server');
  const mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
  console.log('In-memory MongoDB ready');
}

export async function ensureSeedData() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@store.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    await Admin.create({ email: adminEmail, password: adminPassword, name: 'מנהל ראשי' });
    console.log(`Admin seeded: ${adminEmail} / ${adminPassword}`);
  }

  await Product.findOneAndUpdate({ slug: DEFAULT_PRODUCT.slug }, DEFAULT_PRODUCT, {
    upsert: true,
    new: true,
  });

  await Settings.findOneAndUpdate(
    { key: 'payment' },
    { key: 'payment', payoutEmail: adminEmail, storeName: 'SmoothSkin', currency: 'ils' },
    { upsert: true }
  );
}
