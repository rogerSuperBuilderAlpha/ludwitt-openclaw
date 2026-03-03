/**
 * Submission History Recorder
 *
 * Fire-and-forget helper that logs events to the submissionHistory collection.
 * Follows the same error-swallowing pattern as notifications.ts.
 */

import { db } from '@/lib/firebase/admin'
import type { SubmissionHistoryEventType } from '@/lib/types/university'
import { logger } from '@/lib/logger'

interface RecordHistoryParams {
  courseId: string
  deliverableId: string
  eventType: SubmissionHistoryEventType
  actorId: string
  actorName: string
  actorRole: 'student' | 'professor' | 'peer'
  description: string
  metadata?: Record<string, unknown>
}

export function recordHistoryEvent(params: RecordHistoryParams): void {
  db.collection('submissionHistory')
    .add({
      courseId: params.courseId,
      deliverableId: params.deliverableId,
      eventType: params.eventType,
      actorId: params.actorId,
      actorName: params.actorName,
      actorRole: params.actorRole,
      description: params.description,
      metadata: params.metadata || null,
      createdAt: new Date().toISOString(),
    })
    .catch((err) => logger.error('SubmissionHistory', 'Failed to record event', { error: err }))
}
