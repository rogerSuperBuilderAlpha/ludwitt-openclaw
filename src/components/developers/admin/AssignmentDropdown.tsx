/**
 * AssignmentDropdown Component
 * Allows admin to assign/reassign work to developers
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { User, UserPlus, ChevronDown, Loader2, X } from 'lucide-react'
import { DeveloperProfile } from '@/lib/types/developer'
import { logger } from '@/lib/logger'

interface AssignmentDropdownProps {
  itemType: 'project' | 'document'
  itemId: string
  currentAssignment: {
    developerId?: string
    developerName?: string
    developerEmail?: string
    assignedAt?: any
  } | null
  developers: DeveloperProfile[]
  onAssign: (developerId: string | null) => Promise<void>
}

export function AssignmentDropdown({
  itemType,
  itemId,
  currentAssignment,
  developers,
  onAssign,
}: AssignmentDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAssigning, setIsAssigning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleAssign = async (developerId: string | null) => {
    // Confirm reassignment
    if (
      currentAssignment?.developerId &&
      developerId !== currentAssignment.developerId
    ) {
      const developerName = developers.find(
        (d) => d.id === developerId
      )?.displayName
      const confirmMsg = developerId
        ? `Reassign this ${itemType} to ${developerName}?`
        : `Unassign this ${itemType}?`

      if (!confirm(confirmMsg)) {
        return
      }
    }

    setIsAssigning(true)
    setError(null)

    try {
      await onAssign(developerId)
      setIsOpen(false)
    } catch (err: unknown) {
      logger.error('AssignmentDropdown', 'Assignment failed', { error: err })
      const message = err instanceof Error ? err.message : String(err)
      setError(message || 'Failed to assign work')
    } finally {
      setIsAssigning(false)
    }
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isAssigning}
        className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm font-medium"
      >
        {isAssigning ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Assigning...
          </>
        ) : currentAssignment?.developerId ? (
          <>
            <User className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">
              {currentAssignment.developerName}
            </span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </>
        ) : (
          <>
            <UserPlus className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Assign</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[220px] max-h-[300px] overflow-y-auto">
          {/* Unassign option */}
          {currentAssignment?.developerId && (
            <>
              <button
                onClick={() => handleAssign(null)}
                className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 flex items-center gap-2 text-sm transition-colors"
                disabled={isAssigning}
              >
                <X className="w-4 h-4" />
                Unassign
              </button>
              <div className="border-t border-gray-200" />
            </>
          )}

          {/* Developer list */}
          {developers.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500">
              No active developers available
            </div>
          ) : (
            developers.map((dev) => {
              const isCurrentlyAssigned =
                currentAssignment?.developerId === dev.id

              return (
                <button
                  key={dev.id}
                  onClick={() => handleAssign(dev.id)}
                  disabled={isAssigning || isCurrentlyAssigned}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-sm transition-colors ${
                    isCurrentlyAssigned
                      ? 'bg-blue-50 text-blue-700 cursor-default'
                      : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{dev.displayName}</span>
                    {isCurrentlyAssigned && (
                      <span className="text-xs text-blue-600">Current</span>
                    )}
                  </div>
                  {dev.stats && dev.stats.totalActiveProjects > 0 && (
                    <span className="text-xs text-gray-500">
                      {dev.stats.totalActiveProjects} active
                    </span>
                  )}
                </button>
              )
            })
          )}
        </div>
      )}

      {error && (
        <div className="absolute top-full mt-1 right-0 bg-red-50 border border-red-200 rounded-lg p-2 text-xs text-red-800 z-20 whitespace-nowrap shadow-lg">
          {error}
        </div>
      )}
    </div>
  )
}
