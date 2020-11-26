import express from 'express';
import { listProducts, addProduct, updateProduct, deleteProduct } from '../controllers';

const inventoryRouter = express.Router();

inventoryRouter.get('/inventory', listProducts);
inventoryRouter.post('/inventory', addProduct);
inventoryRouter.patch('/inventory', updateProduct);
inventoryRouter.delete('/inventory', deleteProduct);

export default inventoryRouter;