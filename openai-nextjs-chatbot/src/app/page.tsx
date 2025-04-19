'use client'
import { Textarea } from '@/components/ui/textarea';
import { useChat } from '@ai-sdk/react';
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react';
import Message from './components/Messages';

export default function Home() {
  const { messages, handleSubmit, input, handleInputChange } = useChat();

  return (
    <main className='fixed h-full w-full bg-muted'>
      <div className="container h-full w-full flex flex-col py-8">
        <div className='flex-1 overflow-y-auto'>
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>

        <form onSubmit={handleSubmit} className='mt-auto relative'>
          <Textarea 
            className='w-full text-lg'
            placeholder='Say something'
            value={input}
            onChange={handleInputChange}
          />
          <Button 
            type='submit' 
            size='icon'
            disabled={!input}
            className='absolute top-1/2 transform -translate-y-1/2 right-4 rounded-full' 
          >
            <Send size={24} />
          </Button>
        </form>
      </div>
    </main>
  )
}
