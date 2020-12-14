import express from 'express';
import { loginUser, sendEmailForgotPassword, resetPassword } from '../controllers';

const loginRouter = express.Router();

loginRouter.post('/', loginUser);
loginRouter.post('/forgotPassword', sendEmailForgotPassword);
loginRouter.post('/resetPassword', resetPassword);

export default loginRouter;