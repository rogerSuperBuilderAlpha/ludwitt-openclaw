import { useState, useEffect, useMemo } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { logger } from '@/lib/logger'

export interface Customer {
  id: string
  email: string
  displayName?: string
}

export interface Project {
  id: string
  title: string
  customerId: string
}

export interface DuplicateInfo {
  documentId: string
  status: string
}

interface AddDocumentSubmitData {
  shareUrl: string
  title: string
  notes: string
  projectId: string
  customerId: string
  status: 'pending' | 'approved'
  directContent?: string
}

interface UseAddDocumentOptions {
  isOpen: boolean
  onSubmit: (data: AddDocumentSubmitData) => Promise<void>
  onClose: () => void
}

export function useAddDocument({
  isOpen,
  onSubmit,
  onClose,
}: UseAddDocumentOptions) {
  // Form state
  const [shareUrl, setShareUrl] = useState('')
  const [docTitle, setDocTitle] = useState('')
  const [docNotes, setDocNotes] = useState('')
  const [directContent, setDirectContent] = useState('')
  const [selectedCustomerId, setSelectedCustomerId] = useState('')
  const [selectedProjectId, setSelectedProjectId] = useState('')
  const [status, setStatus] = useState<'pending' | 'approved'>('approved')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [duplicateInfo, setDuplicateInfo] = useState<DuplicateInfo | null>(null)

  // Data loading state
  const [customers, setCustomers] = useState<Customer[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [loadingCustomers, setLoadingCustomers] = useState(true)
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [customerSearch, setCustomerSearch] = useState('')

  // Load customers
  useEffect(() => {
    if (!isOpen) return

    const loadCustomers = async () => {
      try {
        const customersSnapshot = await getDocs(collection(db, 'customers'))
        const customersData = customersSnapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            email: data.email,
            displayName: data.displayName,
            createdAt: data.createdAt?.toDate?.()
              ? data.createdAt.toDate().toISOString()
              : data.createdAt,
          }
        }) as Customer[]

        setCustomers(
          customersData.sort((a, b) =>
            (a.displayName || a.email).localeCompare(b.displayName || b.email)
          )
        )
      } catch (err) {
        logger.error('AddDocumentModal', 'Error loading customers', {
          error: err,
        })
      } finally {
        setLoadingCustomers(false)
      }
    }

    loadCustomers()
  }, [isOpen])

  // Load projects
  useEffect(() => {
    if (!isOpen) return

    const loadProjects = async () => {
      try {
        const projectsSnapshot = await getDocs(collection(db, 'projects'))
        const projectsData = projectsSnapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            title: data.title,
            description: data.description,
            customerId: data.customerId,
            createdAt: data.createdAt?.toDate?.()
              ? data.createdAt.toDate().toISOString()
              : data.createdAt,
            updatedAt: data.updatedAt?.toDate?.()
              ? data.updatedAt.toDate().toISOString()
              : data.updatedAt,
          }
        }) as Project[]

        setAllProjects(projectsData)
      } catch (err) {
        logger.error('AddDocumentModal', 'Error loading projects', {
          error: err,
        })
      } finally {
        setLoadingProjects(false)
      }
    }

    loadProjects()
  }, [isOpen])

  // Filter projects by selected customer
  useEffect(() => {
    if (selectedCustomerId) {
      setProjects(
        allProjects.filter((p) => p.customerId === selectedCustomerId)
      )

      if (
        selectedProjectId &&
        !allProjects.find(
          (p) =>
            p.id === selectedProjectId && p.customerId === selectedCustomerId
        )
      ) {
        setSelectedProjectId('')
      }
    } else {
      setProjects([])
      setSelectedProjectId('')
    }
  }, [selectedCustomerId, allProjects, selectedProjectId])

  const filteredCustomers = useMemo(
    () =>
      customers.filter(
        (c) =>
          customerSearch.length === 0 ||
          c.displayName?.toLowerCase().includes(customerSearch.toLowerCase()) ||
          c.email.toLowerCase().includes(customerSearch.toLowerCase())
      ),
    [customers, customerSearch]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setDuplicateInfo(null)

    if (!shareUrl && !directContent) {
      setError(
        'Please provide either a Google Docs link or write content directly'
      )
      setIsSubmitting(false)
      return
    }

    try {
      await onSubmit({
        shareUrl: shareUrl || '',
        title: docTitle,
        notes: docNotes,
        projectId: selectedProjectId,
        customerId: selectedCustomerId,
        status,
        directContent: directContent || undefined,
      })

      // Reset form
      setShareUrl('')
      setDirectContent('')
      setDocTitle('')
      setDocNotes('')
      setSelectedCustomerId('')
      setSelectedProjectId('')
      setStatus('approved')
      onClose()
    } catch (err: unknown) {
      const errorData =
        err instanceof Error && 'data' in err
          ? (
              err as {
                data?: { existingDocumentId?: string; existingStatus?: string }
              }
            ).data
          : undefined
      if (errorData?.existingDocumentId && errorData?.existingStatus) {
        setDuplicateInfo({
          documentId: errorData.existingDocumentId,
          status: errorData.existingStatus,
        })
        setError(
          `Document already exists with status: ${errorData.existingStatus}`
        )
      } else {
        const message = err instanceof Error ? err.message : String(err)
        setError(message || 'Failed to add document')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    // Form state
    shareUrl,
    setShareUrl,
    docTitle,
    setDocTitle,
    docNotes,
    setDocNotes,
    directContent,
    setDirectContent,
    selectedCustomerId,
    setSelectedCustomerId,
    selectedProjectId,
    setSelectedProjectId,
    status,
    setStatus,
    isSubmitting,
    error,
    duplicateInfo,

    // Data
    filteredCustomers,
    projects,
    loadingCustomers,
    loadingProjects,
    customerSearch,
    setCustomerSearch,

    // Actions
    handleSubmit,
  }
}
