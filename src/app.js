import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';
import cors from 'cors';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use('/v1', indexRouter);
app.use((err, req, res, next) => {
  res.status(500).json({
    name: err.name,
    message: err.message,
    stack: err.stack });
});

export default app;