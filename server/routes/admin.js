import { Router } from 'express';
import { body } from 'express-validator';
import { login, me } from '../controllers/authController.js';
import {
  listProducts,
  createProduct,
  updateProductById,
  deleteProduct,
} from '../controllers/adminProductController.js';
import {
  getPaymentSettingsHandler,
  updatePaymentSettings,
} from '../controllers/settingsController.js';
import { getFullDashboard } from '../controllers/adminAnalyticsController.js';
import { getOrders, updateOrderStatus } from '../controllers/orderController.js';
import { adminAuth } from '../middlewares/auth.js';
import { handleValidation } from '../middlewares/validate.js';

const router = Router();

router.post(
  '/login',
  [body('email').isEmail(), body('password').notEmpty()],
  handleValidation,
  login
);

router.use(adminAuth);

router.get('/me', me);
router.get('/dashboard', getFullDashboard);

router.get('/products', listProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProductById);
router.delete('/products/:id', deleteProduct);

router.get('/settings/payment', getPaymentSettingsHandler);
router.put('/settings/payment', updatePaymentSettings);

router.get('/orders', getOrders);
router.patch('/orders/:id/status', updateOrderStatus);

export default router;
