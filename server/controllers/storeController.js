import StoreSettings from '../models/StoreSettings.js';

export async function getPublicStoreSettings(req, res) {
  try {
    let settings = await StoreSettings.findOne({ key: 'store' });
    if (!settings) {
      settings = await StoreSettings.create({ key: 'store' });
    }
    res.json({
      storeName: settings.storeName,
      freeShippingBanner: settings.freeShippingBanner,
      discountBanner: settings.discountBanner,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateStoreSettings(req, res) {
  try {
    const settings = await StoreSettings.findOneAndUpdate(
      { key: 'store' },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
