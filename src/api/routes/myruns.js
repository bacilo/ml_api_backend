import { Router } from 'express';
import { addActivity } from '../controllers/myruns/index.js';
import { subscribe } from '../controllers/myruns/index.js';

const router = Router();

router.get('/', subscribe);
router.post('/', addActivity);

export default router