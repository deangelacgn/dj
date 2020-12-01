import express from 'express';
import { finishPurchase, getTotalPurchaseCost } from '../controllers';

const purchaseRouter = express.Router();

purchaseRouter.get('/', getTotalPurchaseCost);
purchaseRouter.post('/', finishPurchase);

export default purchaseRouter;