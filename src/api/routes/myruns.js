import { Router } from 'express';
import { addActivity, subscribe, getCities } from '../controllers/myruns/index.js';

const router = Router();

router.get('/', subscribe);
router.get('/getcities', getCities);

router.post('/', addActivity);

export default router