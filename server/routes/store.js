import { Router } from 'express';
import { getPublicStoreSettings } from '../controllers/storeController.js';

const router = Router();

router.get('/settings', getPublicStoreSettings);

export default router;
