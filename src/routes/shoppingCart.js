import express from 'express';
import { listItems, addItem,  updateItem, removeItem } from '../controllers';
import { validateRequest } from '../middleware';
import { addItemSchema, removeItemSchema, updateItemSchema } from '../validation';

const shoppingCartRouter = express.Router();

shoppingCartRouter.get('/',
  listItems);
shoppingCartRouter.post('/',
  validateRequest(addItemSchema, 'body'),
  addItem);
shoppingCartRouter.put('/',
  validateRequest(updateItemSchema, 'body'),
  updateItem);
shoppingCartRouter.delete('/',
  validateRequest(removeItemSchema, 'body'),
  removeItem);

export default shoppingCartRouter;