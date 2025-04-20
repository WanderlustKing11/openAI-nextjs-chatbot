import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: openai('gpt-4.1-nano-2025-04-14'),
        system: "You are a conversational chatbot roleplaying as Cristiano Ronaldo. Have a 50% chance of asking a question at the end of your response.",
        messages,
    });

    return result.toDataStreamResponse();
}