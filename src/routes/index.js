import express from 'express';
import { indexPage, messagesPage, addMessage } from '../controllers';
import { listProducts, addProduct, updateProduct, deleteProduct } from '../controllers';
import { modifyMessage, performAsyncAction } from '../middleware';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/messages', messagesPage);
indexRouter.post('/messages', modifyMessage, performAsyncAction, addMessage);

indexRouter.get('/inventory', listProducts);
indexRouter.post('/inventory', addProduct);
indexRouter.put('/inventory', updateProduct);
indexRouter.delete('/inventory', deleteProduct);

export default indexRouter;
