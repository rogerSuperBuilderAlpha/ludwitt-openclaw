import { X } from 'lucide-react'
import { useAddDocument } from './hooks/useAddDocument'
import {
  CustomerSelection,
  ProjectSelection,
  DocumentSourceInput,
  DocumentErrorDisplay,
  SubmitButton,
} from './AddDocumentFormFields'

interface AddDocumentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: {
    shareUrl: string
    title: string
    notes: string
    projectId: string
    customerId: string
    status: 'pending' | 'approved'
    directContent?: string
  }) => Promise<void>
}

export function AddDocumentModal({
  isOpen,
  onClose,
  onSubmit,
}: AddDocumentModalProps) {
  const {
    shareUrl,
    setShareUrl,
    docTitle,
    setDocTitle,
    docNotes,
    setDocNotes,
    directContent,
    setDirectContent,
    selectedCustomerId,
    setSelectedCustomerId,
    selectedProjectId,
    setSelectedProjectId,
    status,
    setStatus,
    isSubmitting,
    error,
    duplicateInfo,
    filteredCustomers,
    projects,
    loadingCustomers,
    loadingProjects,
    customerSearch,
    setCustomerSearch,
    handleSubmit,
  } = useAddDocument({ isOpen, onSubmit, onClose })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Add document"
      >
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Add Requirements for Customer
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Create documentation on behalf of a customer for their iterative
              development cycle
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs text-blue-600">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span>
                This document will appear in the customer&apos;s project as if
                they uploaded it
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <CustomerSelection
            customerSearch={customerSearch}
            onCustomerSearchChange={setCustomerSearch}
            loadingCustomers={loadingCustomers}
            selectedCustomerId={selectedCustomerId}
            onCustomerChange={setSelectedCustomerId}
            filteredCustomers={filteredCustomers}
          />

          <ProjectSelection
            selectedCustomerId={selectedCustomerId}
            selectedProjectId={selectedProjectId}
            onProjectChange={setSelectedProjectId}
            loadingProjects={loadingProjects}
            projects={projects}
          />

          <DocumentSourceInput
            shareUrl={shareUrl}
            onShareUrlChange={setShareUrl}
            directContent={directContent}
            onDirectContentChange={setDirectContent}
          />

          {/* Document Title */}
          <div>
            <label
              htmlFor="docTitle"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Document Title (optional)
            </label>
            <input
              type="text"
              id="docTitle"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              placeholder="e.g., Project Requirements - Oct 14"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="mt-1 text-sm text-gray-500">
              Leave blank to extract from the document URL
            </p>
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Document status in iteration cycle
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as 'pending' | 'approved')
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="approved">
                Approved - Start development iteration immediately
              </option>
              <option value="pending">
                Pending - Customer needs to review and approve first
              </option>
            </select>
            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-xs text-blue-800">
                <div className="font-semibold mb-1">
                  Iterative Development Context:
                </div>
                <ul className="space-y-1 text-blue-700">
                  <li>
                    <strong>Approved:</strong> Document enters development cycle
                    immediately (~$100 iteration)
                  </li>
                  <li>
                    <strong>Pending:</strong> Customer reviews first, then
                    approves to start iteration
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="docNotes"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Notes (optional)
            </label>
            <textarea
              id="docNotes"
              value={docNotes}
              onChange={(e) => setDocNotes(e.target.value)}
              placeholder="Add any notes about this document..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <DocumentErrorDisplay error={error} duplicateInfo={duplicateInfo} />

          <SubmitButton
            isSubmitting={isSubmitting}
            shareUrl={shareUrl}
            directContent={directContent}
            selectedCustomerId={selectedCustomerId}
            onClose={onClose}
          />
        </form>
      </div>
    </div>
  )
}
