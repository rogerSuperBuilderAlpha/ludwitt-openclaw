/**
 * Document History Utilities (Server-side)
 * Functions for tracking and managing document change history using Firebase Admin SDK
 */

import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore'
import {
  DocumentChangeType,
  DocumentFieldValue,
} from '@/lib/types/documentHistory'

/**
 * Record a document history entry (server-side)
 */
export async function recordDocumentChange(
  db: FirebaseFirestore.Firestore,
  documentId: string,
  customerId: string,
  changeType: DocumentChangeType,
  changedBy: string,
  changedByRole: 'customer' | 'developer' | 'admin',
  changes: Array<{
    field: string
    oldValue: DocumentFieldValue
    newValue: DocumentFieldValue
  }>,
  metadata?: { reason?: string; note?: string }
): Promise<string> {
  const historyEntry = {
    documentId,
    customerId,
    changeType,
    changedBy,
    changedByRole,
    timestamp: FieldValue.serverTimestamp(),
    changes,
    metadata: metadata || null,
  }

  const docRef = await db.collection('documentHistory').add(historyEntry)
  return docRef.id
}

/**
 * Compare two document states and return the changes
 */
export function compareDocumentStates(
  oldDoc: Record<string, DocumentFieldValue>,
  newDoc: Record<string, DocumentFieldValue>
): Array<{
  field: string
  oldValue: DocumentFieldValue
  newValue: DocumentFieldValue
}> {
  const changes: Array<{
    field: string
    oldValue: DocumentFieldValue
    newValue: DocumentFieldValue
  }> = []

  // Fields to track
  const fieldsToTrack = [
    'status',
    'priority',
    'projectId',
    'notes',
    'budgetType',
    'budgetHours',
    'budgetAmount',
    'hourlyRate',
    'budgetWarningThreshold',
  ]

  for (const field of fieldsToTrack) {
    const oldValue = oldDoc[field]
    const newValue = newDoc[field]

    // Handle undefined vs null
    const normalizedOldValue = oldValue === undefined ? null : oldValue
    const normalizedNewValue = newValue === undefined ? null : newValue

    if (normalizedOldValue !== normalizedNewValue) {
      changes.push({
        field,
        oldValue: normalizedOldValue,
        newValue: normalizedNewValue,
      })
    }
  }

  return changes
}

/**
 * Determine change type based on the changes
 */
export function determineChangeType(
  changes: Array<{
    field: string
    oldValue: DocumentFieldValue
    newValue: DocumentFieldValue
  }>
): DocumentChangeType {
  if (changes.length === 0) return 'created'

  // Prioritize certain change types
  const statusChange = changes.find((c) => c.field === 'status')
  if (statusChange) {
    if (statusChange.newValue === 'approved') return 'approved'
    if (statusChange.newValue === 'completed') return 'completed'
    if (statusChange.newValue === 'archived') return 'archived'
    return 'status_changed'
  }

  const priorityChange = changes.find((c) => c.field === 'priority')
  if (priorityChange) return 'priority_changed'

  const projectChange = changes.find((c) => c.field === 'projectId')
  if (projectChange) {
    return projectChange.oldValue ? 'project_changed' : 'project_assigned'
  }

  const budgetChange = changes.find(
    (c) =>
      c.field === 'budgetType' ||
      c.field === 'budgetHours' ||
      c.field === 'budgetAmount' ||
      c.field === 'hourlyRate'
  )
  if (budgetChange) return 'budget_updated'

  const notesChange = changes.find((c) => c.field === 'notes')
  if (notesChange) return 'notes_updated'

  return 'created'
}
