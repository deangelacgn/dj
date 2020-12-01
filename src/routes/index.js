import express from 'express';
import { indexPage } from '../controllers';
import inventoryRouter from './inventory';
import messagesRouter from './messages';
import purchaseRouter from './purchase';
import shoppingCartRouter from './shoppingCart';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.use('/inventory', inventoryRouter);
indexRouter.use('/messages', messagesRouter);
indexRouter.use('/shoppingCart', shoppingCartRouter);
indexRouter.use('/purchase', purchaseRouter);

export default indexRouter;
