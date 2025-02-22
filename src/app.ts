import express from 'express';
import { corsMiddleware } from './middleware/corsMiddleware';
import { errorHandler } from './middleware/errorHandler';
import chatRoutes from './routes/chat';

const app = express();

app.use(corsMiddleware);

app.use(express.json());

app.use('/api', chatRoutes);

app.use(errorHandler);

export default app;
