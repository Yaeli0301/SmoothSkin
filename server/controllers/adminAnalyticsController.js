import AnalyticsEvent from '../models/AnalyticsEvent.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

export async function getFullDashboard(req, res) {
  try {
    const days = Number(req.query.days) || 30;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const [
      pageViews,
      addToCart,
      exitIntent,
      purchases,
      revenueAgg,
      paidOrders,
      pendingOrders,
      totalProducts,
      activeProducts,
      recentOrders,
      variantStats,
      dailyRevenue,
      dailyViews,
    ] = await Promise.all([
      AnalyticsEvent.countDocuments({ event: 'page_view', createdAt: { $gte: since } }),
      AnalyticsEvent.countDocuments({ event: 'add_to_cart', createdAt: { $gte: since } }),
      AnalyticsEvent.countDocuments({ event: 'exit_intent', createdAt: { $gte: since } }),
      AnalyticsEvent.countDocuments({ event: 'purchase', createdAt: { $gte: since } }),
      Order.aggregate([
        { $match: { status: 'paid', createdAt: { $gte: since } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Order.countDocuments({ status: 'paid', createdAt: { $gte: since } }),
      Order.countDocuments({ status: 'pending' }),
      Product.countDocuments(),
      Product.countDocuments({ active: true }),
      Order.find().sort({ createdAt: -1 }).limit(10).populate('productId', 'title slug'),
      AnalyticsEvent.aggregate([
        { $match: { event: 'purchase', createdAt: { $gte: since }, abVariant: { $exists: true, $ne: null } } },
        { $group: { _id: '$abVariant', count: { $sum: 1 } } },
      ]),
      Order.aggregate([
        { $match: { status: 'paid', createdAt: { $gte: since } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            revenue: { $sum: '$amount' },
            orders: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      AnalyticsEvent.aggregate([
        { $match: { event: 'page_view', createdAt: { $gte: since } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ]);

    const revenue = revenueAgg[0]?.total || 0;
    const conversionRate = pageViews > 0 ? Number(((purchases / pageViews) * 100).toFixed(2)) : 0;
    const cartRate = pageViews > 0 ? Number(((addToCart / pageViews) * 100).toFixed(2)) : 0;

    res.json({
      summary: {
        pageViews,
        addToCart,
        exitIntent,
        purchases,
        revenue,
        paidOrders,
        pendingOrders,
        conversionRate,
        cartRate,
        totalProducts,
        activeProducts,
      },
      variantStats,
      dailyRevenue,
      dailyViews,
      recentOrders,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
