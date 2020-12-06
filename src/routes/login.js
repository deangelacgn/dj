import express from 'express';
import { loginUser } from '../controllers';

const loginRouter = express.Router();

loginRouter.post('/', loginUser);

export default loginRouter;