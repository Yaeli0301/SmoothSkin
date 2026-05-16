import AnalyticsEvent from '../models/AnalyticsEvent.js';
import Order from '../models/Order.js';

export async function trackEvent(req, res) {
  try {
    const { event, page, productId, sessionId, abVariant, metadata } = req.body;
    await AnalyticsEvent.create({
      event,
      page,
      productId,
      sessionId,
      abVariant,
      metadata,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getDashboard(req, res) {
  try {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [pageViews, addToCart, purchases, revenue, orders] = await Promise.all([
      AnalyticsEvent.countDocuments({ event: 'page_view', createdAt: { $gte: since } }),
      AnalyticsEvent.countDocuments({ event: 'add_to_cart', createdAt: { $gte: since } }),
      AnalyticsEvent.countDocuments({ event: 'purchase', createdAt: { $gte: since } }),
      Order.aggregate([
        { $match: { status: 'paid', createdAt: { $gte: since } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Order.countDocuments({ status: 'paid', createdAt: { $gte: since } }),
    ]);

    const conversionRate = pageViews > 0 ? ((purchases / pageViews) * 100).toFixed(2) : 0;

    const variantStats = await AnalyticsEvent.aggregate([
      { $match: { event: 'purchase', createdAt: { $gte: since }, abVariant: { $exists: true } } },
      { $group: { _id: '$abVariant', count: { $sum: 1 } } },
    ]);

    res.json({
      pageViews,
      addToCart,
      purchases,
      orders,
      revenue: revenue[0]?.total || 0,
      conversionRate: Number(conversionRate),
      variantStats,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
