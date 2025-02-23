import { ChatMessage } from '../types/chat.types';

export const validateMessages = (messages: any): messages is ChatMessage[] => {
    if (!Array.isArray(messages) || messages.length === 0) return false;
    console.log(messages);
    return messages.every(
        msg =>
            typeof msg === 'object' &&
            ['system', 'user', 'assistant'].includes(msg.role) &&
            typeof msg.content === 'string' &&
            msg.content.length > 0
    );
};
