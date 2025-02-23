export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface ChatError extends Error {
    code?: string;
    status?: number;
}
