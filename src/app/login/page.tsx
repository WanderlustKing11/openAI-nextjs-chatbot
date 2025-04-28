// src/app/login/page.tsx
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
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ key })
    })
    if (res.ok) {
      router.push('/')   // success!
    } else {
      setError('Invalid code')
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="p-6 bg-white rounded shadow">
        <h1 className="mb-4 text-xl">Enter Access Code</h1>
        <input
          type="password"
          value={key}
          onChange={e => setKey(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
          Unlock
        </button>
      </form>
    </div>
  )
}
