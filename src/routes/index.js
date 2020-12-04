import express from 'express';
import { jwtGuard } from '../middleware';
import { indexPage } from '../controllers';
import productsRouter from './products';
import purchaseRouter from './purchase';
import searchProductRouter from './searchProduct';
import shoppingCartRouter from './shoppingCart';
import userRouter from './users';
import loginRouter from './login';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.use('/products', jwtGuard(), productsRouter);
indexRouter.use('/shoppingCart', jwtGuard(), shoppingCartRouter);
indexRouter.use('/purchase', jwtGuard(), purchaseRouter);
indexRouter.use('/searchProduct', jwtGuard(), searchProductRouter);
indexRouter.use('/user', userRouter);
indexRouter.use('/login', loginRouter);

export default indexRouter;
