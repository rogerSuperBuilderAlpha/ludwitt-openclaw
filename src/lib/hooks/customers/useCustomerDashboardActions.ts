import { useCallback } from 'react'
import { useCustomerAuth } from '@/lib/hooks/useCustomerAuth'
import { handleAddDocumentSubmit, handleApproveDocument, handleUpdatePriority, handleUpdateProject, handleSendDocMessage } from '@/lib/customers/dashboard/handlers'
import { useToast } from '@/components/ui/Toast'

export function useCustomerDashboardActions() {
  const { user } = useCustomerAuth()
  const toast = useToast()

  const getToken = useCallback(() => user?.getIdToken() as Promise<string | undefined>, [user])

  const addDocument = useCallback(async (payload: { shareUrl: string; title: string; notes: string; projectId: string | null; estimatedCostCents?: number; estimateMarkup?: number }) => {
    const res = await handleAddDocumentSubmit(getToken, payload)
    if (res.ok) toast.success('Document added')
    else if (res.data.code === 'INSUFFICIENT_CREDITS') {
      toast.error('Insufficient credits. Please add funds to submit.')
    } else {
      toast.error(res.data.error || 'Failed to add document')
    }
    return res
  }, [getToken, toast])

  const approveDocument = useCallback(async (documentId: string) => {
    const res = await handleApproveDocument(getToken, documentId)
    if (res.ok) toast.success('Developer notified for approval')
    else toast.error(res.data.error || 'Failed to notify developer')
    return res
  }, [getToken, toast])

  const updateDocumentProject = useCallback(async (documentId: string, projectId: string | null) => {
    const res = await handleUpdateProject(getToken, documentId, projectId)
    if (res.ok) toast.success('Project updated')
    else toast.error(res.data.error || 'Failed to update project')
    return res
  }, [getToken, toast])

  const updateDocumentPriority = useCallback(async (documentId: string, priority: string | null) => {
    const res = await handleUpdatePriority(getToken, documentId, priority)
    if (res.ok) toast.success('Priority updated')
    else toast.error(res.data.error || 'Failed to update priority')
    return res
  }, [getToken, toast])

  const sendDocumentMessage = useCallback(async (payload: { documentId: string; customerId: string; message: string }) => {
    const res = await handleSendDocMessage(getToken, payload)
    if (res.ok) toast.success('Message sent')
    else toast.error(res.data.error || 'Failed to send message')
    return res
  }, [getToken, toast])

  return {
    addDocument,
    approveDocument,
    updateDocumentProject,
    updateDocumentPriority,
    sendDocumentMessage,
  }
}


