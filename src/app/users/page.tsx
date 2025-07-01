'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function UsersPage() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.push(`/login?redirect=${pathname}`)
      }
    }

    checkSession()
  }, [pathname, router])

  return <div>Protected /users page</div>
}
