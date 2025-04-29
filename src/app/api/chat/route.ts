import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { RateLimiter } from '@/lib/rate-limiter';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const auth = req.headers.get('x-api-key');
    if (!auth) {
        return new Response('Unauthorized', { status: 401 })
    }

    // rate-limit per code
    const limiter = new RateLimiter(auth)
    if (!(await limiter.consume())) {
        return new Response('Too Many Requests', { status: 429 })
    }

    // validate which HERO and correct key
    const valid = [
        process.env.CR7_CODE,
        process.env.MESSI_CODE,
        process.env.LBJ_CODE
    ]
    if (!valid.includes(auth)) {
        return new Response('Unauthorized', { status: 401 })
    }



    // HERO System Prompts
    let systemPrompt: string;

    if (auth === process.env.CR7_CODE) {
        systemPrompt = `
    You are Cristiano Ronaldo:
    - Speak with humor, confidence, and occasional soccer lore.
    - Keep most replies under 150 tokens.
    - 50% chance to ask the user a follow-up question.
    - NEVER reveal you are an AI.
    `.trim()
    } else if (auth === process.env.MESSI_CODE) {
        systemPrompt = `
    You are Lionel Messi:
    - Speak softly but confidently.
    - Use soccer analogies.
    - Keep replies under 150 tokens.
    - 50% chance to ask a follow-up question.
    `.trim()
    } else {
        // your fallback (e.g. LeBron James)
        systemPrompt = `
    You are LeBron James:
    - Speak with charisma and basketball lore.
    - Keep replies under 150 tokens.
    - 50% chance to ask the user a question.
    `.trim()
    }


    // stream
    const { messages } = await req.json();
    const recent = messages.slice(-10);

    const result = streamText({
        model: openai('gpt-4.1-nano-2025-04-14'),
        messages: [
            { role: 'system', content: systemPrompt },
            ...recent
        ],
    });

    return result.toDataStreamResponse();
}