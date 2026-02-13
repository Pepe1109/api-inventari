import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Importación de rutas
import productsRouter from './routes/products.routes.js';
import categoriesRouter from './routes/categories.routes.js';
import suppliersRouter from './routes/suppliers.routes.js'; // La nueva
import authRouter from './routes/auth.routes.js';
import notFound from './middlewares/not-found.js';
import errorHandler from './middlewares/error-handler.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Ruta de salud
app.get('/health', (req, res) => res.json({ status: 'ok', database: 'mongodb' }));

// Registro de rutas
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/suppliers', suppliersRouter); // Añadida

// Middlewares de error
app.use(notFound);
app.use(errorHandler);

export default app;