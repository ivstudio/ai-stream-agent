import cors from 'cors';

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

const corsOptions = {
    origin: (
        origin: string | undefined,
        callback: (err: Error | null, allow?: boolean) => void
    ) => {
        if (!origin || process.env.NODE_ENV !== 'production')
            return callback(null, true);

        allowedOrigins.includes(origin)
            ? callback(null, true)
            : callback(null, false);
    },
    optionsSuccessStatus: 200, // Ensures compatibility with legacy browsers
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allows cookies & authentication headers
};

export const corsMiddleware = cors(corsOptions);
