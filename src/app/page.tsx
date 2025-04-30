
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [key, setKey] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    })
    if (res.ok) {
      router.push('/chat')
    } else {
      setError('Invalid code')
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleLogin} 
        className="p-6 bg-white rounded shadow text-black">
        <h1 className="mb-4 text-xl text-black">Enter Access Code</h1>
        <input
          type="password"
          value={key}
          onChange={e => setKey(e.target.value)}
          placeholder='Enter Password'
          className="
            w-full mb-2 p-2 
            border border-gray-400 rounded
            text-black placeholder-gray-500

            focus-visible:border-ring
            focus-visible:ring-ring/50
            focus-visible:ring-[3px]

            hover:border-ring
            hover:ring-1
            hover:ring-ring/20
            hover:shadow-sm

            transition-colors transition-shadow
            outline-none
          "
        />
        {error && <p className="text-red-600">{error}</p>}
        <button 
          type="submit" 
          className="
            mt-2 px-4 py-2 
            bg-blue-600 text-white rounded
            hover:bg-blue-700
            transition-colors
          "
        >
          Unlock
        </button>
      </form>
    </div>
  )
}