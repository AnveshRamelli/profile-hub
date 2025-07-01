'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginTest() {
  const [session, setSession] = useState<any>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get('redirect') || '/dashboard'

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'admin@profile-hub.com',
      password: 'Test@12345',
    })

    if (error) {
      console.error('Login error:', error.message)
    } else {
      console.log('Login successful:', data)
      router.push(redirectPath)
    }
  }

  const getSession = async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Session error:', error.message)
    } else {
      console.log('Current session:', session)
      setSession(session)
    }
  }

  useEffect(() => {
    getSession()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <button onClick={login} className="px-4 py-2 bg-blue-600 text-white rounded">
        Login (Hardcoded)
      </button>
      <button onClick={getSession} className="px-4 py-2 bg-gray-800 text-white rounded">
        Check Session
      </button>
        <button onClick={() => supabase.auth.signOut()} className="px-4 py-2 bg-red-600 text-white rounded">
        Logout</button>
      {session && (
        <p className="mt-4 text-green-500">User is logged in: {session  .user.email}</p>
      )}
      {!session && (
        <p className="mt-4 text-red-500">User is not logged in</p>
      )}
    </div>
  )
}
