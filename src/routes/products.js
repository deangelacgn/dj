import express from 'express';
import {
  listProducts,
  addProduct,
  updateProduct, 
  deleteProduct,
  searchProduct } from '../controllers';
import {
  addProductSchema,
  updateProductSchema,
  deleteProductSchema,
  searchProductSchema } from '../validation';
import { validateRequest } from '../middleware';

const productsRouter = express.Router();

productsRouter.get('/',
  listProducts);
productsRouter.get('/search',
  validateRequest(searchProductSchema,'query'),
  searchProduct);
productsRouter.post('/',
  validateRequest(addProductSchema,'body'),
  addProduct);
productsRouter.patch('/',
  validateRequest(updateProductSchema, 'body'),
  updateProduct);
productsRouter.delete('/',
  validateRequest(deleteProductSchema, 'body'), 
  deleteProduct);


export default productsRouter;