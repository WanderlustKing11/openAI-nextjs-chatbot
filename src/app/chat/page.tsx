'use client'
import { Textarea } from '@/components/ui/textarea';
import { useChat } from '@ai-sdk/react';
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react';
import Message from '../components/Messages';
import { useRef } from 'react';
import Image from 'next/image';

export default function Home() {
  const { messages, handleSubmit, input, handleInputChange } = useChat();
  const formRef = useRef<HTMLFormElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  }

  return (
    <main
      className="
        fixed inset-0 overflow-hidden
        bg-[url('/hero-mobile.jpg')] bg-cover bg-center bg-fixed
        md:bg-none md:bg-white
      "
    >
      {/* Mobile-only Image Filter */}
      <div className="absolute inset-0 bg-black/50 md:hidden" />

      {/* Desktop-only Image */}
      <div className="hidden md:block fixed top-0 right-[30%] bottom-0 w-1/3 z-0">
        <Image
          src="/hero-desktop.png"
          alt="Decorative hero"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Chat UI */}
      <div className="relative z-10 container h-full flex flex-col mx-auto p-4">
        <div className='flex-1 overflow-y-auto space-y-4'>
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>

        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className='mt-auto relative'
        >
          <Textarea 
            className='w-full text-lg'
            placeholder='Type here...'
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
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
