import express from 'express';
import { messagesPage, addMessage } from '../controllers';
import { modifyMessage, performAsyncAction } from '../middleware';

const messagesRouter = express.Router();

messagesRouter.get('/', messagesPage);
messagesRouter.post('/', modifyMessage, performAsyncAction, addMessage);

export default messagesRouter;