import express from 'express';
import { jwtGuard } from '../middleware';
import { deleteUser, registerUser, changePassword } from '../controllers';

const userRouter = express.Router();

userRouter.patch('/:id/changePassword', jwtGuard(), changePassword);
userRouter.post('/', registerUser);
userRouter.delete('/:id', deleteUser);


export default userRouter;