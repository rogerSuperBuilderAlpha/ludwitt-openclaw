'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'

export interface Customer {
  id: string
  email: string
  displayName: string
}

export interface Project {
  id: string
  title: string
  customerId: string
}

interface UseCustomerProjectsReturn {
  customers: Customer[]
  projects: Project[]
  loading: boolean
  error: string | null
}

/**
 * useCustomerProjects - Fetches customers and projects from Firestore
 *
 * Returns the full list of customers and projects, along with loading/error state.
 * Consumers can filter projects by customer ID as needed.
 */
export function useCustomerProjects(): UseCustomerProjectsReturn {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        // Fetch customers
        const customersSnap = await getDocs(collection(db, 'users'))
        const customersData = customersSnap.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email || '',
          displayName: doc.data().displayName || doc.data().email || 'Unknown',
        }))
        setCustomers(customersData)

        // Fetch projects
        const projectsSnap = await getDocs(collection(db, 'projects'))
        const projectsData = projectsSnap.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title || 'Untitled Project',
          customerId: doc.data().customerId || '',
        }))
        setProjects(projectsData)
      } catch {
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { customers, projects, loading, error }
}
