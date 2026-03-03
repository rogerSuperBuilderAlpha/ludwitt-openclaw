'use client'

import { useDevPortalStore } from '@/lib/store/devPortalStore'
import { useAuth } from '@/components/auth/ClientProvider'
import { AssignDeveloperModal } from '@/components/admin/AssignDeveloperModal'

/**
 * AssignDeveloperModalWrapper - Connects AssignDeveloperModal to zustand store
 */
export function AssignDeveloperModalWrapper() {
  const { user } = useAuth()
  const { modalData, closeModal } = useDevPortalStore()

  const documentId = modalData.documentId as string
  const documentTitle = modalData.documentTitle as string

  const handleAssign = async (developerId: string, developerName: string) => {
    if (!user) return

    const token = await user.getIdToken()

    const res = await fetch('/api/developers/submissions/assign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        submissionId: documentId,
        developerId,
      }),
    })

    if (!res.ok) {
      throw new Error('Failed to assign developer')
    }

    closeModal()
  }

  if (!documentId || !documentTitle) {
    return null
  }

  return (
    <AssignDeveloperModal
      isOpen={true}
      onClose={closeModal}
      documentId={documentId}
      documentTitle={documentTitle}
      onAssign={handleAssign}
    />
  )
}
