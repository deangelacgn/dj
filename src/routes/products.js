import express from 'express';
import { 
  listProducts,
  addProduct, 
  updateProduct, 
  deleteProduct, 
  searchProduct } from '../controllers';


const productsRouter = express.Router();

productsRouter.get('/',listProducts);
productsRouter.get('/search', searchProduct);
productsRouter.post('/', addProduct);
productsRouter.patch('/', updateProduct);
productsRouter.delete('/', deleteProduct);

export default productsRouter;