/**
 * Document History Utilities
 * Functions for tracking and managing document change history
 */

import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import {
  DocumentHistoryEntry,
  DocumentChangeType,
  DocumentVersion,
  DocumentFieldValue,
} from '@/lib/types/documentHistory'
import { CustomerDocument } from '@/lib/types/customer'

/**
 * Record a document history entry
 */
export async function recordDocumentChange(
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
  if (!db) throw new Error('Firestore not initialized')

  const historyEntry: Omit<DocumentHistoryEntry, 'id'> = {
    documentId,
    customerId,
    changeType,
    changedBy,
    changedByRole,
    timestamp: Timestamp.now(),
    changes,
    metadata,
  }

  const docRef = await addDoc(collection(db, 'documentHistory'), historyEntry)
  return docRef.id
}

/**
 * Get document history timeline
 */
export async function getDocumentHistory(
  documentId: string
): Promise<DocumentHistoryEntry[]> {
  if (!db) throw new Error('Firestore not initialized')

  const historyQuery = query(
    collection(db, 'documentHistory'),
    where('documentId', '==', documentId),
    orderBy('timestamp', 'desc')
  )

  const snapshot = await getDocs(historyQuery)
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as DocumentHistoryEntry
  )
}

/**
 * Compare two document states and return the changes
 */
export function compareDocumentStates(
  oldDoc: Partial<CustomerDocument>,
  newDoc: Partial<CustomerDocument>
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
  ] as const

  for (const field of fieldsToTrack) {
    const oldValue = oldDoc[field] as DocumentFieldValue
    const newValue = newDoc[field] as DocumentFieldValue

    if (oldValue !== newValue) {
      changes.push({ field, oldValue, newValue })
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

/**
 * Format change for display
 */
export function formatChange(change: {
  field: string
  oldValue: DocumentFieldValue
  newValue: DocumentFieldValue
}): string {
  const { field, oldValue, newValue } = change

  const formatValue = (value: DocumentFieldValue): string => {
    if (value === null || value === undefined) return 'None'
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    if (typeof value === 'number') return value.toString()
    return value.toString()
  }

  const fieldLabels: { [key: string]: string } = {
    status: 'Status',
    priority: 'Priority',
    projectId: 'Project',
    notes: 'Notes',
    budgetType: 'Budget Type',
    budgetHours: 'Budget Hours',
    budgetAmount: 'Budget Amount',
    hourlyRate: 'Hourly Rate',
    budgetWarningThreshold: 'Budget Warning Threshold',
  }

  const label = fieldLabels[field] || field
  const oldVal = formatValue(oldValue)
  const newVal = formatValue(newValue)

  return `${label}: ${oldVal} → ${newVal}`
}

/**
 * Get change type icon and color
 */
export function getChangeTypeConfig(changeType: DocumentChangeType): {
  label: string
  icon: string
  color: string
} {
  const configs = {
    created: { label: 'Created', icon: '✨', color: 'text-blue-600' },
    status_changed: {
      label: 'Status Changed',
      icon: '🔄',
      color: 'text-gray-600',
    },
    priority_changed: {
      label: 'Priority Changed',
      icon: '⚡',
      color: 'text-orange-600',
    },
    project_assigned: {
      label: 'Project Assigned',
      icon: '📁',
      color: 'text-purple-600',
    },
    project_changed: {
      label: 'Project Changed',
      icon: '📂',
      color: 'text-purple-600',
    },
    notes_updated: {
      label: 'Notes Updated',
      icon: '📝',
      color: 'text-gray-600',
    },
    budget_updated: {
      label: 'Budget Updated',
      icon: '💰',
      color: 'text-green-600',
    },
    approved: { label: 'Approved', icon: '✅', color: 'text-green-600' },
    completed: { label: 'Completed', icon: '🎉', color: 'text-green-600' },
    archived: { label: 'Archived', icon: '📦', color: 'text-gray-600' },
    owner_changed: {
      label: 'Owner Changed',
      icon: '👤',
      color: 'text-indigo-600',
    },
  }

  return configs[changeType] || configs.created
}
