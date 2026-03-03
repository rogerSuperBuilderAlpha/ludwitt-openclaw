'use client'

import { useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { auth, db } from '@/lib/firebase/config'
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import { Customer } from '@/lib/types/customer'
import { logger } from '@/lib/logger'

export function useCustomerAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser)

      if (firebaseUser) {
        try {
          // Check if customer profile exists
          const customerRef = doc(db, 'customers', firebaseUser.uid)
          const customerSnap = await getDoc(customerRef)

          if (customerSnap.exists()) {
            setCustomer(customerSnap.data() as Customer)
          } else {
            // Only auto-create customer profile if user has customer role or is on /customers route
            const userRef = doc(db, 'users', firebaseUser.uid)
            const userSnap = await getDoc(userRef)
            const userData = userSnap.data()
            const isCustomerRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/customers')

            if (userData?.role !== 'customer' && !isCustomerRoute) {
              setLoading(false)
              return
            }

            // Create customer profile
            const newCustomer: Customer = {
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              displayName: firebaseUser.displayName || firebaseUser.email!,
              createdAt: Timestamp.now(),
              updatedAt: Timestamp.now(),
              lastLoginAt: Timestamp.now(),
            }

            await setDoc(customerRef, newCustomer)
            setCustomer(newCustomer)
          }
        } catch (err) {
          logger.error('Usecustomerauth', 'Error loading customer', { error: err })
          setError('Failed to load customer profile')
        }
      } else {
        setCustomer(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { user, customer, loading, error }
}
