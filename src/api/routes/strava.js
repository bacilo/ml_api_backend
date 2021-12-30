import { Router } from 'express';
import { addActivity } from '../controllers/strava/index.js';
import { subscribe } from '../controllers/strava/index.js';

const router = Router();

router.get('/', subscribe);
router.post('/', addActivity);

export default router