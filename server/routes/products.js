import { Router } from 'express';
import { getProduct } from '../controllers/productController.js';
import { listActiveProducts } from '../controllers/adminProductController.js';

const router = Router();

router.get('/', listActiveProducts);
router.get('/:slug', getProduct);

export default router;
