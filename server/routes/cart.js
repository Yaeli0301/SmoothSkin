import { Router } from 'express';
import { body } from 'express-validator';
import { saveAbandonedCart } from '../controllers/cartController.js';
import { handleValidation } from '../middlewares/validate.js';

const router = Router();

router.post(
  '/abandon',
  [body('email').isEmail(), body('productId').notEmpty()],
  handleValidation,
  saveAbandonedCart
);

export default router;
