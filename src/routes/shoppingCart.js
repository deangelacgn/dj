import express from 'express';
import { 
  listItems,
  addItem, 
  updateItem,
  removeItem,
  clearCart } from '../controllers';
import { validateRequest } from '../middleware';
import { addItemSchema, updateItemSchema } from '../validation';

const shoppingCartRouter = express.Router();

shoppingCartRouter.get('/',
  listItems);
shoppingCartRouter.post('/:product_id',
  validateRequest(addItemSchema, 'body'),
  addItem);
shoppingCartRouter.put('/:product_id',
  validateRequest(updateItemSchema, 'body'),
  updateItem);
shoppingCartRouter.delete('/:product_id',
  removeItem);
shoppingCartRouter.delete('/',
  clearCart);

export default shoppingCartRouter;