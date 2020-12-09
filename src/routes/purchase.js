import express from 'express';
import { finishPurchase, getTotalPurchaseCost } from '../controllers';
import { validateRequest } from '../middleware';
import { finishPurchaseSchema } from '../validation';

const purchaseRouter = express.Router();

purchaseRouter.get('/',
  getTotalPurchaseCost);
purchaseRouter.post('/',
  validateRequest(finishPurchaseSchema, 'body'),
  finishPurchase);

export default purchaseRouter;