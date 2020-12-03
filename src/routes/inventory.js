import express from 'express';
import { listProducts, addProduct, updateProduct, deleteProduct } from '../controllers';

const inventoryRouter = express.Router();

inventoryRouter.get('/',listProducts);
inventoryRouter.post('/', addProduct);
inventoryRouter.patch('/', updateProduct);
inventoryRouter.delete('/', deleteProduct);

export default inventoryRouter;