import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { connectDatabase, ensureSeedData } from './services/db.js';

import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import analyticsRoutes from './routes/analytics.js';
import cartRoutes from './routes/cart.js';
import adminRoutes from './routes/admin.js';
import { handleWebhook } from './controllers/orderController.js';
import { processAbandonedCarts } from './controllers/cartController.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);

app.post('/api/orders/webhook', express.raw({ type: 'application/json' }), handleWebhook);

app.use(express.json({ limit: '1mb' }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use('/api/', limiter);

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);

async function start() {
  try {
    await connectDatabase();
    await ensureSeedData();
  } catch (err) {
    console.error('Database init failed:', err.message);
  }

  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

  setInterval(processAbandonedCarts, 15 * 60 * 1000);
}

start();
