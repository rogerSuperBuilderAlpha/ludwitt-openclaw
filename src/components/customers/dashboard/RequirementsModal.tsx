import { X, FileText } from 'lucide-react'
import { CustomerDocument } from '@/lib/types/customer'
import type { DateFormatter } from '@/lib/types/common'

type RequirementsModalProps = {
  isOpen: boolean
  onClose: () => void
  document: CustomerDocument
  formatDate: DateFormatter
}

export function RequirementsModal({
  isOpen,
  onClose,
  document,
  formatDate,
}: RequirementsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Requirements details"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Requirements ({document.requirements?.length || 0})
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          {document.requirements && document.requirements.length > 0 ? (
            <div className="space-y-4">
              {document.requirements.map((req: any) => {
                const getStatusConfig = (status: string) => {
                  switch (status) {
                    case 'completed':
                      return {
                        label: 'Done',
                        bg: 'bg-green-100',
                        text: 'text-green-800',
                      }
                    case 'in-progress':
                      return {
                        label: 'In Progress',
                        bg: 'bg-blue-100',
                        text: 'text-blue-800',
                      }
                    case 'pending':
                    default:
                      return {
                        label: 'Pending',
                        bg: 'bg-gray-100',
                        text: 'text-gray-800',
                      }
                  }
                }
                const statusConfig = getStatusConfig(req.status)
                return (
                  <div
                    key={req.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="text-gray-900 font-medium text-lg flex-1">
                        {req.requirement}
                      </p>
                      <span
                        className={`px-2 py-1 ${statusConfig.bg} ${statusConfig.text} text-xs font-medium rounded whitespace-nowrap`}
                      >
                        {statusConfig.label}
                      </span>
                    </div>
                    {req.notes && (
                      <p className="text-gray-700 mb-3 pl-4 border-l-2 border-blue-300">
                        {req.notes}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="font-medium">
                        Added by {req.addedBy}
                      </span>
                      <span>•</span>
                      <span>{formatDate(req.addedAt)}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              No requirements added yet
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
