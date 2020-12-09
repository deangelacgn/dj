import express from 'express';
import { searchProduct } from '../controllers';
import { validateRequest } from '../middleware';
import { searchProductSchema } from '../validation';

const searchProductRouter = express.Router();

searchProductRouter.get('/',
  validateRequest(searchProductSchema, 'query'),
  searchProduct);

export default searchProductRouter;