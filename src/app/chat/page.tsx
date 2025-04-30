'use client'
import { useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useChat } from '@ai-sdk/react';
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react';
import Message from '../components/Messages';
import Image from 'next/image';
import { ATHLETE_ASSETS, DEFAULT_ASSETS } from '@/lib/athletes';

export default function ChatPage() {
  const { messages, handleSubmit, input, handleInputChange } = useChat();
  const formRef = useRef<HTMLFormElement>(null);
  const [assets, setAssets] = useState(DEFAULT_ASSETS);

  // grab the chat_access cookie and lookup the images
  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )chat_access=([^;]+)/)
    const code = match?.[1] ?? ''
    setAssets(ATHLETE_ASSETS[code] || DEFAULT_ASSETS)
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  }

return (
    <main className="fixed inset-0 overflow-hidden bg-white">

      {/* Mobile-only full-screen bg */}
      <div
        className="absolute inset-0 block md:hidden bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${assets.mobile})` }}
      />
      {/* Mobile overlay */}
      <div className="absolute inset-0 block md:hidden bg-black/50" />

      {/* Desktop-only side image */}
      <div className="hidden md:flex fixed top-1/2 right-16 transform -translate-y-1/2 z-0">
        <div className="relative w-64 h-76">
            <Image
            src={assets.desktop}
            alt="Athlete hero"
            fill
            className="object-contain"
            priority
            />
        </div>
      </div>

      {/* Chat UI */}
      <div className="relative z-10 container h-full flex flex-col mx-auto p-4">
        <div className='flex-1 overflow-y-auto space-y-4 md:pr-32'>
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
