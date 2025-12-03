import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import productsRouter from './routes/products.routes.js';
import notFound from './middlewares/not-found.js';
import errorHandler from './middlewares/error-handler.js';

const app = express();

// Middlewares globals
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutes
app.use('/api/v1/products', productsRouter);

// 404 i errors
app.use(notFound);
app.use(errorHandler);

export default app;