import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { specs, swaggerConfig } from '../../config/index.js';
import user from './user.js';
import perspective from './perspective.js';
import strava from './strava.js';
const router = Router();

const specDoc = swaggerJsdoc(swaggerConfig);

router.use(specs, serve);
router.get(specs, setup(specDoc, { explorer: true }));

router.use('/user', user);
router.use('/perspective', perspective);
router.use('/strava', strava);

export default router;