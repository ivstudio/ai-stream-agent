import { Request, Response, NextFunction } from 'express';

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
): void {
    console.error('Global error:', err.stack);
    res.status(500).json({ error: err.message });
}
