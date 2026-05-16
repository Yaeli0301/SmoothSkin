import AbandonedCart from '../models/AbandonedCart.js';
import { sendCartAbandonment } from '../services/emailService.js';

export async function saveAbandonedCart(req, res) {
  try {
    const { email, productId, productTitle, price } = req.body;
    const existing = await AbandonedCart.findOne({ email, recovered: false });
    if (existing) {
      return res.json({ ok: true, id: existing._id });
    }
    const cart = await AbandonedCart.create({ email, productId, productTitle, price });
    res.json({ ok: true, id: cart._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function processAbandonedCarts() {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const carts = await AbandonedCart.find({
    emailSent: false,
    recovered: false,
    createdAt: { $lte: oneHourAgo },
  });

  for (const cart of carts) {
    try {
      await sendCartAbandonment(cart);
      cart.emailSent = true;
      await cart.save();
    } catch (err) {
      console.error('[cart] abandonment email failed:', err.message);
    }
  }
}
