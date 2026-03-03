'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { isAdmin, isDeveloper } from '@/config/developers'

export function useDeveloperGuard(user: { email: string | null } | null | undefined, authLoading: boolean) {
  const router = useRouter()
  const [userIsAdmin, setUserIsAdmin] = useState(false)
  const hasRedirected = useRef(false)

  useEffect(() => {
    if (!authLoading && !hasRedirected.current) {
      if (user?.email) {
        if (!isDeveloper(user.email)) {
          hasRedirected.current = true
          router.push('/')
          return
        }
        setUserIsAdmin(isAdmin(user.email))
      } else {
        hasRedirected.current = true
        router.push('/')
      }
    }
  }, [user, authLoading]) // eslint-disable-line react-hooks/exhaustive-deps

  return { userIsAdmin }
}


