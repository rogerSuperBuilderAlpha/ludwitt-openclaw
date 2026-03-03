import { useCallback, useState } from 'react'
import { useCustomerDashboardActions } from '@/lib/hooks/customers/useCustomerDashboardActions'
import { logger } from '@/lib/logger'

export interface AddDocumentSuccessPayload {
  id: string
  googleDocTitle: string
  googleDocUrl: string
  projectId?: string | null
}

export interface UseAddDocumentFormOptions {
  onAddSuccess?: (document: AddDocumentSuccessPayload) => void
}

export function useAddDocumentForm(options?: UseAddDocumentFormOptions) {
  const { addDocument } = useCustomerDashboardActions()
  const onAddSuccess = options?.onAddSuccess

  const [showAddForm, setShowAddForm] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [docTitle, setDocTitle] = useState('')
  const [docNotes, setDocNotes] = useState('')
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const [estimatedCostCents, setEstimatedCostCents] = useState<number>(0)
  const [estimateMarkup, setEstimateMarkup] = useState<number>(3)
  const [isAdding, setIsAdding] = useState(false)
  const [addError, setAddError] = useState<string | null>(null)

  const resetForm = useCallback(() => {
    setShareUrl('')
    setDocTitle('')
    setDocNotes('')
    setSelectedProjectId('')
    setEstimatedCostCents(0)
    setEstimateMarkup(3)
    setAddError(null)
  }, [])

  const closeForm = useCallback(() => {
    setShowAddForm(false)
    resetForm()
  }, [resetForm])

  const submit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAdding(true)
    setAddError(null)

    try {
      const { ok, data } = await addDocument({
        shareUrl,
        title: docTitle,
        notes: docNotes,
        projectId: selectedProjectId || null,
        estimatedCostCents: estimatedCostCents > 0 ? estimatedCostCents : undefined,
        estimateMarkup: estimatedCostCents > 0 ? estimateMarkup : undefined,
      })

      if (ok) {
        closeForm()
        const doc = data.document as AddDocumentSuccessPayload | undefined
        if (doc?.id && onAddSuccess) {
          onAddSuccess({ id: doc.id, googleDocTitle: doc.googleDocTitle ?? '', googleDocUrl: doc.googleDocUrl ?? '', projectId: doc.projectId })
        }
      } else if (data.code === 'CREDIT_LIMIT_EXCEEDED') {
        setAddError(data.error || 'Credit limit reached. Maximum credit line is $5.')
      } else {
        setAddError(data.error || 'Failed to add document')
      }
    } catch (err) {
      logger.error('Useadddocumentform', 'Error adding document', { error: err })
      setAddError('Failed to add document. Please try again.')
    } finally {
      setIsAdding(false)
    }
  }, [addDocument, shareUrl, docTitle, docNotes, selectedProjectId, estimatedCostCents, estimateMarkup, closeForm, onAddSuccess])

  return {
    showAddForm,
    setShowAddForm,
    shareUrl,
    setShareUrl,
    docTitle,
    setDocTitle,
    docNotes,
    setDocNotes,
    selectedProjectId,
    setSelectedProjectId,
    estimatedCostCents,
    setEstimatedCostCents,
    estimateMarkup,
    setEstimateMarkup,
    isAdding,
    addError,
    setAddError,
    closeForm,
    submit,
  }
}
