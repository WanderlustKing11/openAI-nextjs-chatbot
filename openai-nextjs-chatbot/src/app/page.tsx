'use client'
import { Textarea } from '@/components/ui/textarea';
import { useChat } from '@ai-sdk/react';

export default function Home() {
  const { messages, handleSubmit, input, handleInputChange } = useChat();

  return (
    <main className='fixed h-full w-full bg-muted'>
      <div className="container h-full w-full flex flex-col py-8">
        <div className='flex-1 overflow-y-auto'></div>
        <form onSubmit={handleSubmit} className='mt-auto relative'>
          <Textarea 
            className='w-full text-lg'
            placeholder='Say something'
            value={input}
            onChange={handleInputChange}
          />
        </form>
      </div>
    </main>
  )
}
