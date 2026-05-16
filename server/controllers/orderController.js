import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { getStripe, getWebhookSecret } from '../services/stripeService.js';
import { sendOrderConfirmation, sendShippingUpdate } from '../services/emailService.js';

export async function createCheckoutSession(req, res) {
  try {
    const stripe = await getStripe();
    if (!stripe) return res.status(503).json({ error: 'Stripe לא מוגדר – הגדר מפתחות בפאנל המנהל' });

    const { productId, quantity = 1, customer, abVariant, analytics } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const order = await Order.create({
      productId: product._id,
      productTitle: product.title,
      quantity,
      amount: product.price * quantity,
      status: 'pending',
      customer,
      abVariant,
      analytics,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'ils',
            product_data: {
              name: product.title,
              images: product.images?.slice(0, 1) || [],
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/product/${product.slug}`,
      customer_email: customer.email,
      metadata: {
        orderId: order._id.toString(),
      },
    });

    order.stripeSessionId = session.id;
    await order.save();

    res.json({ sessionId: session.id, url: session.url, orderId: order._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleWebhook(req, res) {
  const stripe = await getStripe();
  if (!stripe) return res.status(503).send('Stripe not configured');

  const sig = req.headers['stripe-signature'];
  const webhookSecret = await getWebhookSecret();
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const order = await Order.findById(session.metadata?.orderId);
    if (order) {
      order.status = 'paid';
      order.stripePaymentIntentId = session.payment_intent;
      await order.save();
      await sendOrderConfirmation(order);
      order.emailsSent.confirmation = true;
      await order.save();
    }
  }

  res.json({ received: true });
}

export async function getOrders(req, res) {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(200)
      .populate('productId', 'title slug');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (req.body.status === 'shipped' && !order.emailsSent.shipping) {
      await sendShippingUpdate(order);
      order.emailsSent.shipping = true;
      await order.save();
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
