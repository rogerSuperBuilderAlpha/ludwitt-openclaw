import { db } from '@/lib/firebase/config'
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { logger } from '@/lib/logger'

// Replace API call with direct Firestore write
export async function assignSubmission(token: string, submissionId: string, developerId?: string, developerName?: string) {
  try {
    const updateData: any = {
      assignedTo: developerId || null,
      assignedToName: developerName || null,
      assignedAt: serverTimestamp(),
      status: 'in-progress',
      updatedAt: serverTimestamp(),
    }
    
    await updateDoc(doc(db, 'customerDocuments', submissionId), updateData)
    return { success: true }
  } catch (error) {
    logger.error('Developers', 'Error assigning submission', { error })
    throw new Error('Failed to assign submission')
  }
}

// Call API to update status (sends completion emails and returns diagnostics)
export async function updateSubmissionStatus(
  token: string, 
  submissionId: string, 
  status: string, 
  category?: string,
  actualCostCents?: number
) {
  try {
    const response = await fetch('/api/developers/submissions/update-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        submissionId,
        status,
        category,
        actualCostCents,
      }),
    })

    const data = await response.json()

    // Server logs available in data.logs if needed for debugging

    if (!response.ok) {
      logger.error('Developers', 'Server error details', { data: {
        error: data.error,
        details: data.details,
        errorName: data.errorName,
        stack: data.stack
      } })
      throw new Error(data.error || 'Failed to update status')
    }

    return { 
      success: true,
      emailDiagnostics: data.emailDiagnostics,
      billing: data.billing,
    }
  } catch (error) {
    logger.error('Developers', 'Error updating submission status', { error })
    throw new Error('Failed to update status')
  }
}

// Replace API call with direct Firestore write
export async function updateProgress(token: string, documentId: string, progressPercentage: number, progressNote?: string) {
  try {
    const updateData: any = {
      progressPercentage: progressPercentage,
      updatedAt: serverTimestamp(),
    }
    
    if (progressNote) {
      updateData.progressNote = progressNote
    }
    
    await updateDoc(doc(db, 'customerDocuments', documentId), updateData)
    return { success: true }
  } catch (error) {
    logger.error('Developers', 'Error updating progress', { error })
    throw new Error('Failed to update progress')
  }
}

// Replace API call with direct Firestore write
export async function addRequirement(token: string, payload: { documentId: string; customerId: string; requirement: string; notes?: string; creatorId?: string }) {
  try {
    // Build participantIds for access control: customer + developer who created it
    const participantIds = [payload.customerId]
    if (payload.creatorId && !participantIds.includes(payload.creatorId)) {
      participantIds.push(payload.creatorId)
    }

    await addDoc(collection(db, 'clientRequirements'), {
      documentId: payload.documentId,
      customerId: payload.customerId,
      creatorId: payload.creatorId || '',
      participantIds,
      requirement: payload.requirement,
      notes: payload.notes || '',
      status: 'pending',
      addedAt: serverTimestamp(),
    })
    return { success: true }
  } catch (error) {
    logger.error('Developers', 'Error adding requirement', { error })
    throw new Error('Failed to add requirement')
  }
}

export async function updateRequirementStatus(token: string, payload: { requirementId: string; documentId: string; customerId: string; status: string }) {
  try {
    await updateDoc(doc(db, 'clientRequirements', payload.requirementId), {
      status: payload.status,
      updatedAt: serverTimestamp(),
    })
    return { success: true }
  } catch (error) {
    logger.error('Developers', 'Error updating requirement status', { error })
    throw new Error('Failed to update requirement status')
  }
}

// Replace API call with direct Firestore write
export async function addSession(token: string, payload: any) {
  try {
    await addDoc(collection(db, 'developmentSessions'), {
      documentId: payload.documentId,
      customerId: payload.customerId,
      accomplishments: payload.accomplishments,
      nextSteps: payload.nextSteps || '',
      timeSpentMinutes: payload.timeSpentMinutes || 0,
      requirementIds: payload.requirementIds || [],
      sessionDate: serverTimestamp(),
      addedAt: serverTimestamp(),
    })
    return { success: true }
  } catch (error) {
    logger.error('Developers', 'Error adding session', { error })
    throw new Error('Failed to add session')
  }
}

// Replace API call with direct Firestore write
export async function sendMessage(token: string, payload: { documentId: string; customerId: string; message: string }) {
  try {
    await addDoc(collection(db, 'documentCommunications'), {
      documentId: payload.documentId,
      customerId: payload.customerId,
      message: payload.message,
      sentAt: serverTimestamp(),
      senderType: 'developer',
    })
    return { success: true }
  } catch (error) {
    logger.error('Developers', 'Error sending message', { error })
    throw new Error('Failed to send message')
  }
}

// Replace API call with direct Firestore write
export async function nudgeCustomer(token: string, documentId: string) {
  try {
    await updateDoc(doc(db, 'customerDocuments', documentId), {
      lastNudgedAt: serverTimestamp(),
      nudgeCount: serverTimestamp(), // Will be incremented properly in a real implementation
      updatedAt: serverTimestamp(),
    })
    return { success: true }
  } catch (error) {
    logger.error('Developers', 'Error nudging customer', { error })
    throw new Error('Failed to nudge customer')
  }
}

// Replace API call with direct Firestore write
export async function addDocument(token: string, payload: { shareUrl: string; title: string; notes: string; projectId: string; customerId: string; status: 'pending' | 'approved' }) {
  try {
    await addDoc(collection(db, 'customerDocuments'), {
      googleDocUrl: payload.shareUrl,
      googleDocTitle: payload.title,
      notes: payload.notes,
      projectId: payload.projectId,
      customerId: payload.customerId,
      status: payload.status,
      addedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...(payload.status === 'approved' && { approvedAt: serverTimestamp() })
    })
    return { success: true }
  } catch (error) {
    logger.error('Developers', 'Error adding document', { error })
    throw new Error('Failed to add document')
  }
}

// Replace API call with direct Firestore write
export async function changeOwner(token: string, payload: { documentId: string; newCustomerId: string }) {
  try {
    await updateDoc(doc(db, 'customerDocuments', payload.documentId), {
      customerId: payload.newCustomerId,
      updatedAt: serverTimestamp(),
    })
    return { success: true }
  } catch (error) {
    logger.error('Developers', 'Error changing owner', { error })
    throw new Error('Failed to change owner')
  }
}

// Approve a pending document (changes status from 'pending' to 'approved')
export async function approveDocument(token: string, documentId: string) {
  return updateSubmissionStatus(token, documentId, 'approved')
}

// Replace API call with direct Firestore write
export async function updateProjectStatus(token: string, payload: { projectId: string; status: string; actualCompletionDate?: string }) {
  try {
    const updateData: any = {
      status: payload.status,
      updatedAt: serverTimestamp(),
    }
    
    if (payload.actualCompletionDate) {
      updateData.actualCompletionDate = payload.actualCompletionDate
    }
    
    await updateDoc(doc(db, 'projects', payload.projectId), updateData)
    return { success: true }
  } catch (error) {
    logger.error('Developers', 'Error updating project status', { error })
    throw new Error('Failed to update project status')
  }
}