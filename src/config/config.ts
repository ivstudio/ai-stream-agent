export const config = {
    chat: {
        maxTokens: process.env.CHAT_MAX_TOKENS
            ? parseInt(process.env.CHAT_MAX_TOKENS)
            : 4096,
        temperature: process.env.CHAT_TEMPERATURE
            ? parseFloat(process.env.CHAT_TEMPERATURE)
            : 0,
    },
};
