import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import Product from '../models/Product.js';
import Settings from '../models/Settings.js';
import StoreSettings from '../models/StoreSettings.js';
import { generateProductContent } from './productGenerator.js';

const SEED_PRODUCTS = [
  {
    slug: 'hair-remover',
    productName: 'מכשיר הסרת שיער עדין',
    category: 'hair-removal',
    price: 149,
    stock: 18,
  },
  {
    slug: 'facial-cleanser',
    productName: 'סרום הזנה לפנים',
    category: 'skin-care',
    price: 89,
    stock: 40,
  },
  {
    slug: 'sonic-brush',
    productName: 'מברשת שיניים סונית',
    category: 'oral-care',
    price: 119,
    stock: 35,
  },
  {
    slug: 'gua-sha-tool',
    productName: 'כלי גוואשה לעיסוי פנים',
    category: 'tools',
    price: 69,
    stock: 50,
  },
];

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dropship';

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 4000 });
    console.log('MongoDB connected');
    return;
  } catch {
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

  if ((await Admin.countDocuments()) === 0) {
    await Admin.create({ email: adminEmail, password: adminPassword, name: 'מנהל ראשי' });
    console.log(`Admin seeded: ${adminEmail} / ${adminPassword}`);
  }

  for (const seed of SEED_PRODUCTS) {
    const generated = generateProductContent(seed);
    await Product.findOneAndUpdate(
      { slug: seed.slug },
      { ...generated, slug: seed.slug, stock: seed.stock, active: true },
      { upsert: true, new: true }
    );
  }

  await Settings.findOneAndUpdate(
    { key: 'payment' },
    { key: 'payment', payoutEmail: adminEmail, storeName: 'Glow Routine', currency: 'ils' },
    { upsert: true }
  );

  await StoreSettings.findOneAndUpdate(
    { key: 'store' },
    {
      key: 'store',
      storeName: 'Glow Routine',
      freeShippingBanner: { enabled: true, text: 'משלוח חינם על הזמנות מעל ₪149' },
      discountBanner: { enabled: false, text: '' },
    },
    { upsert: true }
  );
}
