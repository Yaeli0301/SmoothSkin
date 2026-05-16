import Product from '../models/Product.js';
import { COLLECTIONS } from '../constants/collections.js';

export async function getCollection(req, res) {
  try {
    const meta = COLLECTIONS[req.params.slug];
    if (!meta) return res.status(404).json({ error: 'Collection not found' });

    const products = await Product.find({ category: req.params.slug, active: true }).sort({
      createdAt: -1,
    });

    res.json({ ...meta, products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function listCollections(req, res) {
  res.json(Object.values(COLLECTIONS));
}
