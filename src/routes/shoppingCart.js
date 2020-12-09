import express from 'express';
import { listItems, addItem,  updateItem, removeItem } from "../controllers";

const shoppingCartRouter = express.Router();

shoppingCartRouter.get('/', listItems);
shoppingCartRouter.post('/', addItem);
shoppingCartRouter.put('/', updateItem);
shoppingCartRouter.delete('/', removeItem);

export default shoppingCartRouter;