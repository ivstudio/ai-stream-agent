import { Request, Response, NextFunction } from 'express';
import { openaiClient } from '../utils/openAIClient';

export const chatController = async (
    req: Request,
    res: Response,
    _next: NextFunction
): Promise<void> => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            res.status(400).json({
                error: 'Invalid request: messages array is required',
            });
            return;
        }

        const stream = await openaiClient.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages,
            stream: true,
        });

        // Set headers for Server-Sent Events (SSE)
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
                res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
        }

        res.write('data: [DONE]\n\n');
        res.end();
    } catch (error) {
        console.error('Error in chatController:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
