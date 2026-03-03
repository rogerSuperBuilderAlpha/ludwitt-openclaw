/**
 * AssignmentBadge Component
 * Shows who a document or project is assigned to
 */

import { User, UserPlus } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface AssignmentBadgeProps {
  assignedDeveloper?: {
    id: string
    name: string
    email: string
  } | null
  assignedAt?: Date | any
  assignedBy?: 'auto' | 'admin' | null
  size?: 'sm' | 'md' | 'lg'
  showDetails?: boolean
  className?: string
}

export function AssignmentBadge({
  assignedDeveloper,
  assignedAt,
  assignedBy,
  size = 'md',
  showDetails = false,
  className = '',
}: AssignmentBadgeProps) {
  // Convert Firestore timestamp if needed
  const getDate = (timestamp: any): Date | null => {
    if (!timestamp) return null
    if (timestamp instanceof Date) return timestamp
    if (timestamp?.toDate) return timestamp.toDate()
    if (timestamp?.seconds !== undefined)
      return new Date(timestamp.seconds * 1000)
    if (timestamp?._seconds) return new Date(timestamp._seconds * 1000)
    return null
  }

  const assignmentDate = getDate(assignedAt)

  // Size styles
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-4 h-4',
  }

  if (!assignedDeveloper) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 ${sizeStyles[size]} bg-gray-100 text-gray-600 rounded font-medium ${className}`}
      >
        <UserPlus className={iconSizes[size]} />
        <span>Unassigned</span>
      </div>
    )
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div
        className={`inline-flex items-center gap-1.5 ${sizeStyles[size]} bg-blue-100 text-blue-800 rounded font-medium`}
      >
        <User className={iconSizes[size]} />
        <span>{assignedDeveloper.name}</span>
      </div>

      {showDetails && assignmentDate && (
        <span className="text-xs text-gray-500">
          {assignedBy === 'auto' && '(Auto) '}
          {assignedBy === 'admin' && '(Admin) '}
          {formatDistanceToNow(assignmentDate, { addSuffix: true })}
        </span>
      )}
    </div>
  )
}
