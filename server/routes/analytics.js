import { Router } from 'express';
import { body } from 'express-validator';
import { trackEvent } from '../controllers/analyticsController.js';
import { handleValidation } from '../middlewares/validate.js';

const router = Router();

router.post(
  '/track',
  [
    body('event').isIn([
      'page_view',
      'add_to_cart',
      'checkout_start',
      'purchase',
      'exit_intent',
      'ab_exposure',
      'product_click',
    ]),
  ],
  handleValidation,
  trackEvent
);

export default router;
