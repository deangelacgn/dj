import express from 'express';
import { deleteUser, registerUser, changePassword } from '../controllers';

const userRouter = express.Router();

userRouter.patch('/:id/changePassword', changePassword);
userRouter.post('/', registerUser);
userRouter.delete('/:id', deleteUser);


export default userRouter;