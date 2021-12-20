import { Router } from 'express';
import { getScores } from '../controllers/perspective/index.js';

const router = Router();

router.get('/', getScores);

export default router