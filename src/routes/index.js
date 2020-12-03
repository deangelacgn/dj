import express from 'express';
import passport from 'passport';
import { indexPage } from '../controllers';
import inventoryRouter from './inventory';
import purchaseRouter from './purchase';
import searchProductRouter from './searchProduct';
import shoppingCartRouter from './shoppingCart';
import userRouter from './users';
import loginRouter from './login';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.use('/inventory', passport.authenticate('jwt', { session: false }), inventoryRouter);
indexRouter.use('/shoppingCart', passport.authenticate('jwt', { session: false }), shoppingCartRouter);
indexRouter.use('/purchase', passport.authenticate('jwt', { session: false }), purchaseRouter);
indexRouter.use('/searchProduct', passport.authenticate('jwt', { session: false }), searchProductRouter);
indexRouter.use('/user', userRouter);
indexRouter.use('/login', loginRouter);

export default indexRouter;
