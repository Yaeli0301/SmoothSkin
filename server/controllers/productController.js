import mongoose from 'mongoose';
import Product from '../models/Product.js';

export async function listProducts(req, res) {
  try {
    const filter = { active: true };
    if (req.query.category) filter.category = req.query.category;

    const products = await Product.find(filter)
      .select('slug title price compareAtPrice images stock category shortDescription reviews rating')
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getProduct(req, res) {
  try {
    const { slug } = req.params;
    const query = mongoose.isValidObjectId(slug)
      ? { $or: [{ _id: slug }, { slug }], active: true }
      : { slug, active: true };

    const product = await Product.findOne(query);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
