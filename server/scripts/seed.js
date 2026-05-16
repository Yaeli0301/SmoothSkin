import 'dotenv/config';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Admin from '../models/Admin.js';
import Settings from '../models/Settings.js';

const product = {
  slug: 'hair-remover',
  title: 'מכשיר הסרת שיער פנים – ללא כאב',
  headline: 'פתרון מהיר להסרת שיער פנים – בלי כאב',
  description:
    'מכשיר חדשני להסרת שיער פנים תוך שניות. מתאים לכל סוגי העור, ללא אדמומיות וללא כאב.',
  bullets: [
    'מתאים לכל סוגי העור',
    'שימוש תוך שניות',
    'ללא אדמומיות',
    'נייד וקומפקטי',
    'בטוח לשימוש יומיומי',
  ],
  price: 149,
  compareAtPrice: 299,
  stock: 23,
  images: [
    'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    'https://images.unsplash.com/photo-1515377901643-4a9748da9c6b?w=800&q=80',
  ],
  benefits: [
    { icon: 'heart', label: 'ללא כאב' },
    { icon: 'mobile', label: 'נייד' },
    { icon: 'zap', label: 'מהיר' },
    { icon: 'shield', label: 'בטוח לעור' },
  ],
  reviews: [
    {
      name: 'שירה כ.',
      rating: 5,
      text: 'מדהים! השתמשתי פעם אחת והשיער נעלם. ממליצה בחום!',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    {
      name: 'מיכל ר.',
      rating: 5,
      text: 'סוף סוף בלי שעווה וכאב. מוצר מושלם!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
    {
      name: 'דנה ל.',
      rating: 4,
      text: 'עובד מעולה, קצת לוקח זמן להתרגל אבל שווה כל שקל.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    },
    {
      name: 'יעל מ.',
      rating: 5,
      text: 'קניתי לבת שלי והיא לא מפסיקה להודות. מומלץ!',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    },
    {
      name: 'רונית א.',
      rating: 5,
      text: 'הגיע מהר, איכות מעולה. כבר הזמנתי עוד אחד למתנה.',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
    },
  ],
  active: true,
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dropship');

  await Product.findOneAndUpdate({ slug: product.slug }, product, { upsert: true, new: true });
  console.log('✓ Product seeded:', product.slug);

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@store.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  let admin = await Admin.findOne({ email: adminEmail });
  if (!admin) {
    admin = await Admin.create({ email: adminEmail, password: adminPassword, name: 'מנהל ראשי' });
    console.log('✓ Admin created:', adminEmail, '/', adminPassword);
  } else {
    console.log('✓ Admin exists:', adminEmail);
  }

  await Settings.findOneAndUpdate(
    { key: 'payment' },
    {
      key: 'payment',
      payoutEmail: adminEmail,
      storeName: 'SmoothSkin',
      currency: 'ils',
    },
    { upsert: true }
  );
  console.log('✓ Payment settings initialized');

  await mongoose.disconnect();
  console.log('Done.');
}

seed().catch(console.error);
