import express from 'express';
import chatRoutes from './routes/chat';
import { errorHandler } from './middleware/errorHandler';
import { corsMiddleware } from './middleware/corsMiddleware';

const app = express();

app.use(corsMiddleware);

app.use(express.json());

app.use('/api', chatRoutes);

app.use(errorHandler);

export default app;
