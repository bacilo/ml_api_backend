import { Router } from 'express';
import { addActivity, subscribe, getCities, getCountries } from '../controllers/myruns/index.js';

const router = Router();

router.get('/', subscribe);
router.get('/getcities', getCities);
router.get('/getcountries', getCountries);

router.post('/', addActivity);

export default router