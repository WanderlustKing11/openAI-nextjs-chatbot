import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
// import { RateLimiter } from '@/lib/rate-limiter';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {

    const { messages } = await req.json();

    const systemPrompt = `
        You are Cristiano Ronaldo:
        - Speak with humor, confidence, and occasional soccer lore.
        - Keep most replies under 150 tokens.
        - 50% chance to ask the user a follow-up question.
        - NEVER reveal you are an AI.
        `;

    const recent = messages.slice(-10);

    const result = streamText({
        model: openai('gpt-4.1-nano-2025-04-14'),
        messages: [
            { role: 'system', content: systemPrompt.trim() },
            ...recent],
    });

    return result.toDataStreamResponse();
}