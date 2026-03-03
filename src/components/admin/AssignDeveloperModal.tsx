/**
 * Admin Developer Assignment Modal
 * Allows admins to assign documents to specific developers with workload visibility
 */

'use client'

import { useState, useEffect } from 'react'
import {
  X,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react'
import { db } from '@/lib/firebase/config'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { logger } from '@/lib/logger'

interface Developer {
  id: string
  email: string
  displayName: string
  activeDocumentsCount: number
  completedDocumentsCount: number
  workloadPercentage: number
  availability: 'available' | 'busy' | 'unavailable'
}

interface AssignDeveloperModalProps {
  isOpen: boolean
  onClose: () => void
  documentId: string
  documentTitle: string
  onAssign: (developerId: string, developerName: string) => Promise<void>
}

export function AssignDeveloperModal({
  isOpen,
  onClose,
  documentId,
  documentTitle,
  onAssign,
}: AssignDeveloperModalProps) {
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDeveloperId, setSelectedDeveloperId] = useState<string>('')
  const [assigning, setAssigning] = useState(false)

  useEffect(() => {
    if (!isOpen || !db) return

    const fetchDevelopers = async () => {
      try {
        setLoading(true)

        // Fetch all developer profiles
        const developerProfiles = await getDocs(
          collection(db, 'developerProfiles')
        )

        // Fetch all documents to calculate workload
        const documentsSnapshot = await getDocs(
          query(
            collection(db, 'customerDocuments'),
            where('status', 'in', ['approved', 'in-progress'])
          )
        )

        // Calculate workload for each developer
        const workloadMap = new Map<
          string,
          { active: number; completed: number }
        >()

        documentsSnapshot.docs.forEach((doc) => {
          const data = doc.data()
          if (data.assignedTo) {
            const current = workloadMap.get(data.assignedTo) || {
              active: 0,
              completed: 0,
            }
            if (data.status === 'completed') {
              current.completed++
            } else {
              current.active++
            }
            workloadMap.set(data.assignedTo, current)
          }
        })

        // Also count completed documents
        const completedDocsSnapshot = await getDocs(
          query(
            collection(db, 'customerDocuments'),
            where('status', '==', 'completed')
          )
        )

        completedDocsSnapshot.docs.forEach((doc) => {
          const data = doc.data()
          if (data.assignedTo) {
            const current = workloadMap.get(data.assignedTo) || {
              active: 0,
              completed: 0,
            }
            current.completed++
            workloadMap.set(data.assignedTo, current)
          }
        })

        // Build developer list with workload
        const devList: Developer[] = []

        // If we have developer profiles
        if (!developerProfiles.empty) {
          developerProfiles.docs.forEach((devDoc) => {
            const devData = devDoc.data()
            const workload = workloadMap.get(devDoc.id) || {
              active: 0,
              completed: 0,
            }

            // Calculate workload percentage (assume max 10 active documents)
            const maxActiveDocuments = devData.maxActiveDocuments || 10
            const workloadPercentage = Math.min(
              Math.round((workload.active / maxActiveDocuments) * 100),
              100
            )

            // Determine availability
            let availability: 'available' | 'busy' | 'unavailable' = 'available'
            if (workloadPercentage >= 90) {
              availability = 'unavailable'
            } else if (workloadPercentage >= 70) {
              availability = 'busy'
            }

            devList.push({
              id: devDoc.id,
              email: devData.email || 'Unknown',
              displayName:
                devData.displayName || devData.email || 'Unknown Developer',
              activeDocumentsCount: workload.active,
              completedDocumentsCount: workload.completed,
              workloadPercentage,
              availability: devData.availability || availability,
            })
          })
        } else {
          // Fallback: Use workload data to infer developers
          workloadMap.forEach((workload, developerId) => {
            const workloadPercentage = Math.min(
              Math.round((workload.active / 10) * 100),
              100
            )

            let availability: 'available' | 'busy' | 'unavailable' = 'available'
            if (workloadPercentage >= 90) {
              availability = 'unavailable'
            } else if (workloadPercentage >= 70) {
              availability = 'busy'
            }

            devList.push({
              id: developerId,
              email: 'Unknown',
              displayName: 'Developer',
              activeDocumentsCount: workload.active,
              completedDocumentsCount: workload.completed,
              workloadPercentage,
              availability,
            })
          })
        }

        // Sort by availability and workload
        devList.sort((a, b) => {
          // Available developers first
          if (a.availability !== b.availability) {
            const availabilityOrder = { available: 0, busy: 1, unavailable: 2 }
            return (
              availabilityOrder[a.availability] -
              availabilityOrder[b.availability]
            )
          }
          // Then by workload (lower first)
          return a.workloadPercentage - b.workloadPercentage
        })

        setDevelopers(devList)
      } catch (err) {
        logger.error('AssignDeveloperModal', 'Error fetching developers', {
          error: err,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDevelopers()
  }, [isOpen])

  const handleAssign = async () => {
    if (!selectedDeveloperId) return

    const developer = developers.find((d) => d.id === selectedDeveloperId)
    if (!developer) return

    setAssigning(true)
    try {
      await onAssign(selectedDeveloperId, developer.displayName)
      onClose()
    } catch (err) {
      logger.error('AssignDeveloperModal', 'Assignment failed', { error: err })
    } finally {
      setAssigning(false)
    }
  }

  if (!isOpen) return null

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'busy':
        return 'bg-yellow-100 text-yellow-800'
      case 'unavailable':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getWorkloadColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-600'
    if (percentage >= 70) return 'bg-yellow-600'
    if (percentage >= 50) return 'bg-blue-600'
    return 'bg-green-600'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Assign developer"
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Assign Developer
            </h3>
            <p className="text-sm text-gray-600">{documentTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : developers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No developers found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {developers.map((dev) => (
                <div
                  key={dev.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedDeveloperId(dev.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ')
                      setSelectedDeveloperId(dev.id)
                  }}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedDeveloperId === dev.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {dev.displayName}
                      </h4>
                      <p className="text-sm text-gray-600">{dev.email}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${getAvailabilityColor(dev.availability)}`}
                    >
                      {dev.availability.charAt(0).toUpperCase() +
                        dev.availability.slice(1)}
                    </span>
                  </div>

                  {/* Workload Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {dev.activeDocumentsCount}
                      </div>
                      <div className="text-xs text-gray-600">Active</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {dev.completedDocumentsCount}
                      </div>
                      <div className="text-xs text-gray-600">Completed</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {dev.workloadPercentage}%
                      </div>
                      <div className="text-xs text-gray-600">Capacity</div>
                    </div>
                  </div>

                  {/* Workload Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${getWorkloadColor(dev.workloadPercentage)} h-2 rounded-full transition-all`}
                      style={{ width: `${dev.workloadPercentage}%` }}
                    />
                  </div>

                  {/* Warning for overloaded developers */}
                  {dev.workloadPercentage >= 90 && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-red-600">
                      <AlertCircle className="w-3 h-3" />
                      <span>This developer is at full capacity</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={assigning}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedDeveloperId || assigning}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {assigning ? 'Assigning...' : 'Assign Developer'}
          </button>
        </div>
      </div>
    </div>
  )
}
