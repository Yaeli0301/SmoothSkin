import Product from '../models/Product.js';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim() || `product-${Date.now()}`;
}

export async function listProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createProduct(req, res) {
  try {
    const data = { ...req.body };
    if (!data.slug && data.title) data.slug = slugify(data.title);
    if (!data.slug) data.slug = `product-${Date.now()}`;

    const exists = await Product.findOne({ slug: data.slug });
    if (exists) return res.status(400).json({ error: 'slug כבר קיים' });

    const product = await Product.create(data);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateProductById(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ error: 'מוצר לא נמצא' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'מוצר לא נמצא' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function listActiveProducts(req, res) {
  try {
    const products = await Product.find({ active: true }).select('slug title price images stock').sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
