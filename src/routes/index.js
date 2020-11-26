import express from 'express';
import { indexPage } from '../controllers';
import inventoryRouter from './inventory';
import messagesRouter from './messages';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.use(inventoryRouter);
indexRouter.use(messagesRouter);

export default indexRouter;
