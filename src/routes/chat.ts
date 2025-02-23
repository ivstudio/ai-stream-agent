import { Router } from 'express';
import { chatController } from '../controllers/chatController';
import { rateLimitMiddleware } from '../middleware/rateLimitMiddleware';

const router = Router();

router.post('/chat', rateLimitMiddleware, chatController);

export default router;
