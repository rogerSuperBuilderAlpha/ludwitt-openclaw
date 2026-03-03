import { useMemo } from 'react'
import { CustomerDocument } from '@/lib/types/customer'
import { Project } from '@/lib/types/project'
import { Timestamp } from 'firebase/firestore'
import { CustomerAnalytics } from '@/app/customers/dashboard/types'

/**
 * Helper to convert Firestore Timestamp or date string to milliseconds
 */
function toMillis(value: Timestamp | string | undefined): number | null {
  if (!value) return null
  if (typeof value === 'string') {
    return new Date(value).getTime()
  }
  if (typeof value === 'object' && 'toDate' in value) {
    return value.toDate().getTime()
  }
  return null
}

export function useCustomerAnalytics(projects: Project[], documents: CustomerDocument[]): CustomerAnalytics {
  return useMemo(() => {
    const totalProjects = projects.length
    const activeProjects = projects.filter(p => ['intake', 'discovery', 'in-progress'].includes(p.status))
    const completedProjects = projects.filter(p => p.status === 'completed')
    const totalValue = projects.reduce((sum, p) => sum + p.totalCost, 0)

    const approvedDocs = documents.filter(d => d.status === 'approved')
    const pendingDocs = documents.filter(d => d.status === 'pending')

    let avgTurnaroundDays = 0
    if (approvedDocs.length > 0) {
      const turnarounds = approvedDocs
        .map(doc => {
          const addedTime = toMillis(doc.addedAt)
          const approvedTime = toMillis(doc.approvedAt)
          if (addedTime && approvedTime) {
            return Math.floor((approvedTime - addedTime) / (1000 * 60 * 60 * 24))
          }
          return 0
        })
        .filter(t => t > 0)

      if (turnarounds.length > 0) {
        avgTurnaroundDays = Math.round(turnarounds.reduce((a, b) => a + b, 0) / turnarounds.length)
      }
    }

    return {
      totalProjects,
      activeProjects: activeProjects.length,
      completedProjects: completedProjects.length,
      totalValue,
      totalSubmitted: documents.length,
      approvedCount: approvedDocs.length,
      pendingCount: pendingDocs.length,
      avgTurnaroundDays
    }
  }, [projects, documents])
}


