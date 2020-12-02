import express from 'express';
import { searchProduct } from '../controllers';

const searchProductRouter = express.Router();

searchProductRouter.get('/', searchProduct);

export default searchProductRouter;