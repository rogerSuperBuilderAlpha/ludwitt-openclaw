import Link from 'next/link'
import { Check, Copy, Edit, Eye, Lock, Trash2, Plus } from 'lucide-react'
import { Cohort } from '@/lib/hooks/cohorts/useCohortsPage'

interface CreateTabProps {
  canCreate: boolean
  loadingUserCohorts: boolean
  userCreatedCohorts: Cohort[]
  successMessage: string
  copiedCohortId: string | null
  handleCopyShareLink: (cohortId: string) => void
  handleEditCohort: (cohort: Cohort) => void
  handleDeleteCohort: (cohortId: string, cohortName: string) => void
  onOpenCreate: () => void
}

export function CreateTab(props: CreateTabProps) {
  const {
    canCreate,
    loadingUserCohorts,
    userCreatedCohorts,
    successMessage,
    copiedCohortId,
    handleCopyShareLink,
    handleEditCohort,
    handleDeleteCohort,
    onOpenCreate,
  } = props

  if (!canCreate) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Complete the Learning Path
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            To unlock the ability to create cohorts, you need to complete the
            Vercel deployment step in the main learning path.
          </p>
          <Link
            href="/"
            className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go to Learning Path
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-900">
          {successMessage}
        </div>
      )}

      {loadingUserCohorts ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your cohorts...</p>
        </div>
      ) : (
        <>
          {userCreatedCohorts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Cohorts</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {userCreatedCohorts.map((cohort) => (
                  <div
                    key={cohort.id}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {cohort.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {cohort.description}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          cohort.status === 'open'
                            ? 'bg-green-100 text-green-700'
                            : cohort.status === 'full'
                              ? 'bg-blue-100 text-blue-700'
                              : cohort.status === 'in-progress'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {cohort.status}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <span>Members:</span>
                        <span className="font-medium">
                          {cohort.currentSize}/{cohort.targetSize}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Price:</span>
                        <span className="font-medium">
                          ${cohort.pricePerPerson}/person
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Starts:</span>
                        <span className="font-medium">
                          {new Date(cohort.startDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all"
                          style={{
                            width: `${(cohort.currentSize / cohort.targetSize) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/cohorts/${cohort.id}`}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Link>
                      <button
                        onClick={() => handleCopyShareLink(cohort.id)}
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        title="Copy share link"
                      >
                        {copiedCohortId === cohort.id ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEditCohort(cohort)}
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteCohort(cohort.id, cohort.name)
                        }
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-700 font-medium rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="max-w-2xl mx-auto text-center">
            <button
              onClick={onOpenCreate}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-5 h-5" />
              {userCreatedCohorts.length > 0
                ? 'Create Another Cohort'
                : 'Create Your First Cohort'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
