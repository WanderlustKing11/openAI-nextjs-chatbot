import { Card, CardHeader } from '@/components/ui/card';
import { Message as MessageType } from 'ai';
import { Bot, User } from 'lucide-react';

export default function Message({ message }: { message: MessageType }) {
    const { role, content } = message;
    if (role == 'assistant') {
        return (
            <Card className='flex flex-col gap-3 p-6 bg-gray-800/75 text-gray-100 border-slate-900 md:bg-white/0 md:text-black md:border-none'>
                <CardHeader className='flex itemx-center gap-2'>
                    <Bot />
                    Assistant:
                </CardHeader>
                {content}
            </Card>
        )
    }
    return (
        <Card className='bg-slate-900/75 text-gray-100 border-slate-900 self-end md:bg-white/0 md:text-black md:border-none'>
            <CardHeader className="flex items-center gap-2">
                <User size={36} />
                {content}
            </CardHeader>
        </Card>
    );
}