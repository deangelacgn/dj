import express from 'express';
import { loginUser, sendEmailForgotPassword, resetPassword } from '../controllers';
import { validateRequest } from '../middleware';
import { sendEmailSecretCodeSchema, validateSecretCodeSchema } from '../validation';

const loginRouter = express.Router();

loginRouter.post('/', loginUser);
loginRouter.post('/forgotPassword',
  validateRequest(sendEmailSecretCodeSchema, 'body'),
  sendEmailForgotPassword);
loginRouter.post('/resetPassword',
  validateRequest(validateSecretCodeSchema, 'body'),
  resetPassword);

export default loginRouter;