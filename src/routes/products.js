import express from 'express';
import { listProducts, addProduct, updateProduct, deleteProduct } from '../controllers';
import { validateRequest } from '../middleware';
import { addProductSchema, updateProductSchema, deleteProductSchema } from '../validation';

const productsRouter = express.Router();

productsRouter.get('/',listProducts);
productsRouter.post('/', validateRequest(addProductSchema,'body'), addProduct);
productsRouter.patch('/', validateRequest(updateProductSchema, 'body'),updateProduct);
productsRouter.delete('/', validateRequest(deleteProductSchema, 'body'), deleteProduct);

export default productsRouter;