import { useCallback, useState } from 'react'
import { CustomerDocument } from '@/lib/types/customer'
import { useCustomerDashboardActions } from '@/lib/hooks/customers/useCustomerDashboardActions'

export function useApprovalFlow(params?: { setError?: (msg: string) => void }) {
  const externalSetError = params?.setError
  const { approveDocument } = useCustomerDashboardActions()

  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [documentToApprove, setDocumentToApprove] = useState<CustomerDocument | null>(null)
  const [approvalSource, setApprovalSource] = useState<'after_add' | 'existing'>('existing')
  const [approvingId, setApprovingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const openApprovalFor = useCallback((doc: CustomerDocument) => {
    setDocumentToApprove(doc)
    setApprovalSource('existing')
    setShowApprovalModal(true)
  }, [])

  const openApprovalForNewlyAdded = useCallback((doc: CustomerDocument) => {
    setDocumentToApprove(doc)
    setApprovalSource('after_add')
    setShowApprovalModal(true)
  }, [])

  const confirmApproval = useCallback(async () => {
    if (!documentToApprove) return
    setApprovingId(documentToApprove.id)
    setError(null)
    // Clear any existing error - pass empty string since null isn't valid for this setter
    if (externalSetError) externalSetError('')
    try {
      const { ok, data } = await approveDocument(documentToApprove.id)
      if (ok) {
        setShowApprovalModal(false)
        setDocumentToApprove(null)
        setApprovalSource('existing')
      } else {
        const msg = data.error || 'Failed to notify developer'
        setError(msg)
        externalSetError?.(msg)
        throw new Error(msg)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to notify developer'
      setError(message)
      externalSetError?.(message)
      throw err
    } finally {
      setApprovingId(null)
    }
  }, [approveDocument, documentToApprove, externalSetError])

  return {
    showApprovalModal,
    setShowApprovalModal,
    documentToApprove,
    setDocumentToApprove,
    approvalSource,
    approvingId,
    error,
    setError,
    openApprovalFor,
    openApprovalForNewlyAdded,
    confirmApproval,
  }
}


