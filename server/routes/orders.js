import { Router } from 'express';
import { body } from 'express-validator';
import {
  createCheckoutSession,
  getOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { handleValidation } from '../middlewares/validate.js';

const router = Router();

router.post(
  '/checkout',
  [
    body('productId').notEmpty(),
    body('customer.email').isEmail(),
    body('customer.name').trim().notEmpty(),
    body('customer.phone').trim().notEmpty(),
    body('customer.address').trim().notEmpty(),
    body('customer.city').trim().notEmpty(),
  ],
  handleValidation,
  createCheckoutSession
);

export default router;
