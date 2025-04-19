import { Message as MessageType } from 'ai';
import { Bot } from 'lucide-react';

export default function Message({ message }: { message: MessageType }) {
    const { role, content } = message;
    if (role == 'assistant') {
        return (
            <div
                className='flex flex-col gap-3 p-6 whitespace-pre-wrap'
            >
                <div
                    className='flex itemx-center gap-2'
                >
                    <Bot />
                    Assistant:
                </div>
                {content}
            </div>
        )
    }
    return null;
}