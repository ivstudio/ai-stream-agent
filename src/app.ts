import express from 'express';
import { corsMiddleware } from './middleware/corsMiddleware';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes/routes';

const app = express();

app.use(corsMiddleware);

app.use(express.json());

app.use('/api', routes);

// Error Handling Middleware (should be last)
app.use(errorHandler);

export default app;
