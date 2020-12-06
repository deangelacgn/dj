import express from 'express';
import { listProducts, addProduct, updateProduct, deleteProduct } from '../controllers';

const productsRouter = express.Router();

productsRouter.get('/',listProducts);
productsRouter.post('/', addProduct);
productsRouter.patch('/', updateProduct);
productsRouter.delete('/', deleteProduct);

export default productsRouter;