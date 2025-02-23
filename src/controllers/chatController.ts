import { Request, Response, NextFunction } from 'express';
import { config } from '../config/config';
import { ChatMessage, ChatError } from '../types/chat.types';
import { logger } from '../utils/logger';
import { openaiClient } from '../utils/openAIClient';
import { validateMessages } from '../utils/validation';

class ChatController {
    private static readonly MAX_MESSAGE_LENGTH = 10000;
    private static readonly SUPPORTED_MODELS = ['gpt-3.5-turbo', 'gpt-4'];

    constructor() {
        this.handleChatRequest = this.handleChatRequest.bind(this);
    }

    private sanitizeInput(messages: ChatMessage[]): ChatMessage[] {
        return messages.map(msg => ({
            ...msg,
            content: msg.content
                .substring(0, ChatController.MAX_MESSAGE_LENGTH)
                .trim(),
        }));
    }

    private async handleStream(
        res: Response,
        stream: AsyncIterable<any>,
        requestId: string
    ): Promise<void> {
        for await (const chunk of stream) {
            if (!res.writable) {
                logger.warn(`Client disconnected, requestId: ${requestId}`);
                break;
            }
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
                res.write(
                    `data: ${JSON.stringify({ content, requestId })}\n\n`
                );
            }
        }
        res.write(
            `data: ${JSON.stringify({ event: '[DONE]', requestId })}\n\n`
        );
    }

    public async handleChatRequest(
        req: Request,
        res: Response,
        _next: NextFunction
    ): Promise<void> {
        const requestId =
            (req.headers['x-request-id'] as string) || crypto.randomUUID();

        try {
            const { messages, model = 'gpt-3.5-turbo' } = req.body;

            if (!validateMessages(messages)) {
                res.status(400).json({
                    error: 'Invalid request: messages must be a non-empty array of valid messages',
                    requestId,
                });
                return;
            }

            if (!ChatController.SUPPORTED_MODELS.includes(model)) {
                res.status(400).json({
                    error: `Invalid model. Supported models: ${ChatController.SUPPORTED_MODELS.join(', ')}`,
                    requestId,
                });
                return;
            }

            const sanitizedMessages = this.sanitizeInput(messages);

            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            res.setHeader('X-Request-ID', requestId);

            logger.info('Chat request started', {
                requestId,
                model,
                messageCount: messages.length,
            });

            const stream = await openaiClient.chat.completions.create({
                model,
                messages: sanitizedMessages,
                stream: true,
                max_tokens: config.chat.maxTokens || 4096,
                temperature: config.chat.temperature || 0,
            });

            await this.handleStream(res, stream, requestId);

            logger.info('Chat request completed', { requestId });
            res.end();
        } catch (error) {
            const chatError = error as ChatError;
            const status = chatError.status || 500;
            const errorMessage =
                status === 500
                    ? 'Internal server error'
                    : chatError.message || 'Chat processing failed';

            logger.error('Chat request failed', {
                requestId,
                error: chatError.message,
                stack: chatError.stack,
            });

            if (!res.headersSent) {
                res.status(status).json({
                    error: errorMessage,
                    requestId,
                });
            } else {
                res.write(
                    `data: ${JSON.stringify({
                        error: errorMessage,
                        event: '[ERROR]',
                        requestId,
                    })}\n\n`
                );
                res.end();
            }
        }
    }
}

const controller = new ChatController();
export const chatController = controller.handleChatRequest;
