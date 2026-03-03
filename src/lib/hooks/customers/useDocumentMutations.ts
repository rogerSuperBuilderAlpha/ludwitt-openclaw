import { useCallback } from 'react'
import { CustomerDocument } from '@/lib/types/customer'
import { useCustomerDashboardActions } from '@/lib/hooks/customers/useCustomerDashboardActions'

export function useDocumentMutations(params: {
  setDocuments: React.Dispatch<React.SetStateAction<CustomerDocument[]>>
  setError: (msg: string | null) => void
}) {
  const { setDocuments, setError } = params
  const { updateDocumentProject, updateDocumentPriority } = useCustomerDashboardActions()

  const updateProject = useCallback(async (documentId: string, projectId: string) => {
    try {
      const { ok, data } = await updateDocumentProject(documentId, projectId || null)
      if (ok) {
        setDocuments(prev => prev.map(doc =>
          doc.id === documentId ? { ...doc, projectId: projectId || undefined } : doc
        ))
      } else {
        setError(data.error || 'Failed to update project assignment')
      }
    } catch (err) {
      setError('Failed to update project assignment')
    }
  }, [setDocuments, setError, updateDocumentProject])

  const updatePriority = useCallback(async (documentId: string, priority: string) => {
    try {
      const { ok, data } = await updateDocumentPriority(documentId, priority || null)
      if (ok) {
        setDocuments(prev => prev.map(doc =>
          doc.id === documentId ? { ...doc, priority: (priority as CustomerDocument['priority']) || undefined } : doc
        ))
      } else {
        setError(data.error || 'Failed to update priority')
      }
    } catch (err) {
      setError('Failed to update priority')
    }
  }, [setDocuments, setError, updateDocumentPriority])

  return { updateProject, updatePriority }
}


