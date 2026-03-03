'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { auth as firebaseAuth, db } from '@/lib/firebase/config'
import { collection, query, where, getDocs, doc } from 'firebase/firestore'
import { useCanCreateCohort } from '@/lib/hooks/useCanCreateCohort'
import { useCohortsData } from '@/lib/hooks/useCohortsData'
import { filterAndSortCohorts, PriceFilter, SizeFilter, SortBy } from '@/lib/utils/cohortUtils'
import { logger } from '@/lib/logger'

export interface Cohort {
  id: string
  name: string
  description: string
  currentSize: number
  targetSize: number
  pricePerPerson: number
  startDate: string
  status?: 'open' | 'full' | 'in-progress' | string
}

export function useCohortsPage(userId?: string, vercelDeploymentComplete?: boolean) {
  const [activeTab, setActiveTab] = useState<'info' | 'join' | 'create'>('info')

  // Access / data hooks
  const { canCreate, loading: loadingAccess } = useCanCreateCohort(userId, !!vercelDeploymentComplete)
  const { cohorts, userCohort, loading: loadingCohorts, refreshCohorts } = useCohortsData(userId, activeTab === 'join')

  // Filter/search state
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPrice, setFilterPrice] = useState<PriceFilter>('all')
  const [filterSize, setFilterSize] = useState<SizeFilter>('all')
  const [sortBy, setSortBy] = useState<SortBy>('newest')

  const filteredCohorts = useMemo(
    () => filterAndSortCohorts(cohorts, searchQuery, filterPrice, filterSize, sortBy),
    [cohorts, searchQuery, filterPrice, filterSize, sortBy]
  )

  // User's created cohorts
  const [userCreatedCohorts, setUserCreatedCohorts] = useState<any[]>([])
  const [loadingUserCohorts, setLoadingUserCohorts] = useState(false)
  const [copiedCohortId, setCopiedCohortId] = useState<string | null>(null)

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCohort, setEditingCohort] = useState<any | null>(null)
  const [successMessage, setSuccessMessage] = useState('')

  // Seat selection state
  const [selectedCohortForPurchase, setSelectedCohortForPurchase] = useState<string | null>(null)
  const [customSeatCount, setCustomSeatCount] = useState('')

  // Load user's created cohorts when on create tab
  useEffect(() => {
    const loadUserCreatedCohorts = async () => {
      if (!userId || activeTab !== 'create') return
      setLoadingUserCohorts(true)
      try {
        const cohortsRef = collection(db, 'cohorts')
        const q = query(cohortsRef, where('creatorId', '==', userId))
        const snapshot = await getDocs(q)
        const loaded = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
        setUserCreatedCohorts(loaded)
      } catch (err) {
        logger.error('UseCohortsPage', 'Failed to load user cohorts', { error: err })
      } finally {
        setLoadingUserCohorts(false)
      }
    }
    loadUserCreatedCohorts()
  }, [userId, activeTab])

  const handleModalSuccess = useCallback(async () => {
    setSuccessMessage(editingCohort ? 'Cohort updated successfully!' : 'Cohort created successfully!')
    setEditingCohort(null)

    if (userId && activeTab === 'create') {
      setLoadingUserCohorts(true)
      try {
        const cohortsRef = collection(db, 'cohorts')
        const q = query(cohortsRef, where('creatorId', '==', userId))
        const snapshot = await getDocs(q)
        const loaded = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
        setUserCreatedCohorts(loaded)
      } catch (err) {
        logger.error('UseCohortsPage', 'Failed to reload cohorts', { error: err })
      } finally {
        setLoadingUserCohorts(false)
      }
    }

    refreshCohorts()
    setTimeout(() => setSuccessMessage(''), 3000)
  }, [editingCohort, userId, activeTab, refreshCohorts])

  const handleEditCohort = useCallback((cohort: any) => {
    setEditingCohort(cohort)
    setIsModalOpen(true)
  }, [])

  const handleDeleteCohort = useCallback(async (cohortId: string, cohortName: string) => {
    if (!confirm(`Are you sure you want to delete "${cohortName}"? This action cannot be undone.`)) return
    try {
      const token = await firebaseAuth.currentUser?.getIdToken()
      if (!token) throw new Error('Authentication error')
      const response = await fetch('/api/cohorts/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ cohortId }),
      })
      const data = await response.json()
      if (!data.success) throw new Error(data.error || 'Failed to delete cohort')
      setSuccessMessage('Cohort deleted successfully')
      setUserCreatedCohorts(prev => prev.filter(c => c.id !== cohortId))
      refreshCohorts()
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete cohort')
    }
  }, [refreshCohorts])

  const handleJoinCohort = useCallback(async (cohortId: string, quantity: number = 1) => {
    if (!userId) return
    try {
      const token = await firebaseAuth.currentUser?.getIdToken()
      if (!token) throw new Error('Authentication error')
      const response = await fetch('/api/cohorts/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ cohortId, quantity }),
      })
      const data = await response.json()
      if (!data.success) throw new Error(data.error || 'Failed to initiate checkout')
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (err) {
      logger.error('UseCohortsPage', 'Checkout error', { error: err })
      alert(err instanceof Error ? err.message : 'Failed to join cohort')
    }
  }, [userId])

  const clearFilters = useCallback(() => {
    setSearchQuery('')
    setFilterPrice('all')
    setFilterSize('all')
    setSortBy('newest')
  }, [])

  const handleCopyShareLink = useCallback(async (cohortId: string) => {
    const url = `${window.location.origin}/cohorts/${cohortId}`
    await navigator.clipboard.writeText(url)
    setCopiedCohortId(cohortId)
    setTimeout(() => setCopiedCohortId(null), 2000)
  }, [])

  return {
    // access
    canCreate,
    loadingAccess,

    // data
    cohorts,
    userCohort,
    loadingCohorts,
    refreshCohorts,
    userCreatedCohorts,
    loadingUserCohorts,

    // filters
    searchQuery,
    setSearchQuery,
    filterPrice,
    setFilterPrice,
    filterSize,
    setFilterSize,
    sortBy,
    setSortBy,
    clearFilters,
    filteredCohorts,

    // ui state
    activeTab,
    setActiveTab,
    isModalOpen,
    setIsModalOpen,
    editingCohort,
    setEditingCohort,
    successMessage,
    setSuccessMessage,
    copiedCohortId,

    // seat state
    selectedCohortForPurchase,
    setSelectedCohortForPurchase,
    customSeatCount,
    setCustomSeatCount,

    // actions
    handleModalSuccess,
    handleEditCohort,
    handleDeleteCohort,
    handleJoinCohort,
    handleCopyShareLink,
  }
}


