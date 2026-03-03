import { Search, FileText } from 'lucide-react'
import type { Customer, Project, DuplicateInfo } from './hooks/useAddDocument'

interface CustomerSelectionProps {
  customerSearch: string
  onCustomerSearchChange: (value: string) => void
  loadingCustomers: boolean
  selectedCustomerId: string
  onCustomerChange: (id: string) => void
  filteredCustomers: Customer[]
}

export function CustomerSelection({
  customerSearch,
  onCustomerSearchChange,
  loadingCustomers,
  selectedCustomerId,
  onCustomerChange,
  filteredCustomers,
}: CustomerSelectionProps) {
  return (
    <div>
      <label
        htmlFor="customer"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Customer *
      </label>
      <div className="relative mb-2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search customers..."
          value={customerSearch}
          onChange={(e) => onCustomerSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>
      {loadingCustomers ? (
        <div className="text-sm text-gray-500 py-2">Loading customers...</div>
      ) : (
        <select
          id="customer"
          value={selectedCustomerId}
          onChange={(e) => onCustomerChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Select a customer</option>
          {filteredCustomers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.displayName || customer.email} ({customer.email})
            </option>
          ))}
        </select>
      )}
    </div>
  )
}

interface ProjectSelectionProps {
  selectedCustomerId: string
  selectedProjectId: string
  onProjectChange: (id: string) => void
  loadingProjects: boolean
  projects: Project[]
}

export function ProjectSelection({
  selectedCustomerId,
  selectedProjectId,
  onProjectChange,
  loadingProjects,
  projects,
}: ProjectSelectionProps) {
  if (!selectedCustomerId) return null

  return (
    <div>
      <label
        htmlFor="projectId"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Which project should this be added to?
      </label>
      {loadingProjects ? (
        <div className="text-sm text-gray-500 py-2">
          Loading customer&apos;s projects...
        </div>
      ) : (
        <select
          id="projectId"
          value={selectedProjectId}
          onChange={(e) => onProjectChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select a project...</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
      )}
      {projects.length === 0 && selectedCustomerId && !loadingProjects ? (
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>&#9888;&#65039; No projects found:</strong> This customer
            hasn&apos;t created any projects yet. The document will be created
            without a project assignment.
          </p>
        </div>
      ) : (
        selectedProjectId && (
          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700">
            &#10003; Document will be added to this project&apos;s iteration
            cycle
          </div>
        )
      )}
    </div>
  )
}

interface DocumentSourceInputProps {
  shareUrl: string
  onShareUrlChange: (value: string) => void
  directContent: string
  onDirectContentChange: (value: string) => void
}

export function DocumentSourceInput({
  shareUrl,
  onShareUrlChange,
  directContent,
  onDirectContentChange,
}: DocumentSourceInputProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <h4 className="text-sm font-medium text-gray-900">
          How would you like to add the requirements?
        </h4>
        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
          Developer Tools
        </span>
      </div>

      {/* Google Docs Option */}
      <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
            <span className="text-white text-xs font-bold">1</span>
          </div>
          <div className="flex-1">
            <label
              htmlFor="shareUrl"
              className="block text-sm font-semibold text-blue-900 mb-1"
            >
              Google Docs Link
            </label>
            <p className="text-xs text-blue-700 mb-3">
              Link to existing Google Doc - customer can collaborate in
              real-time
            </p>
            <input
              type="url"
              id="shareUrl"
              value={shareUrl}
              onChange={(e) => onShareUrlChange(e.target.value)}
              placeholder="https://docs.google.com/document/d/..."
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
            {shareUrl && (
              <p className="text-xs text-blue-600 mt-1">
                &#10003; Google Doc will be linked for real-time collaboration
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Direct Content Option */}
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center mt-0.5">
            <span className="text-white text-xs font-bold">2</span>
          </div>
          <div className="flex-1">
            <label
              htmlFor="directContent"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Or create content directly
            </label>
            <p className="text-xs text-gray-600 mb-3">
              Write requirements directly - will be stored as internal document
            </p>
            <textarea
              id="directContent"
              value={directContent}
              onChange={(e) => onDirectContentChange(e.target.value)}
              placeholder="Write the customer's requirements here..."
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white text-sm"
              disabled={shareUrl.length > 0}
            />
            {shareUrl.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                Clear the Google Docs link above to use this option
              </p>
            )}
            {directContent && !shareUrl && (
              <p className="text-xs text-green-600 mt-1">
                &#10003; Content will be stored as internal document
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface DocumentErrorDisplayProps {
  error: string | null
  duplicateInfo: DuplicateInfo | null
}

export function DocumentErrorDisplay({
  error,
  duplicateInfo,
}: DocumentErrorDisplayProps) {
  if (!error) return null

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <p className="text-red-800 text-sm font-medium mb-2">{error}</p>
      {duplicateInfo && (
        <div className="mt-3 space-y-2">
          <p className="text-red-700 text-sm">
            This exact Google Doc has already been added for this customer.
          </p>
          <div className="bg-white rounded border border-red-200 p-3">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Existing Document:</strong>
            </p>
            <p className="text-sm text-gray-600">
              Status:{' '}
              <span className="font-medium text-gray-900">
                {duplicateInfo.status}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Document ID:{' '}
              <span className="font-mono text-xs">
                {duplicateInfo.documentId}
              </span>
            </p>
          </div>
          <p className="text-sm text-red-700 mt-2">
            <strong>Options:</strong>
          </p>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
            <li>
              Close this dialog and find the existing document in the list below
            </li>
            <li>
              Change the document&apos;s status from the document details view
            </li>
            <li>Archive the existing document first, then try adding again</li>
          </ul>
        </div>
      )}
    </div>
  )
}

interface SubmitButtonProps {
  isSubmitting: boolean
  shareUrl: string
  directContent: string
  selectedCustomerId: string
  onClose: () => void
}

export function SubmitButton({
  isSubmitting,
  shareUrl,
  directContent,
  selectedCustomerId,
  onClose,
}: SubmitButtonProps) {
  return (
    <div className="border-t pt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Ready to add to customer&apos;s iteration cycle</span>
          </div>
          <p className="text-xs text-gray-500 pl-4">
            Document will appear in customer&apos;s dashboard as if they
            uploaded it
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={
            isSubmitting || (!shareUrl && !directContent) || !selectedCustomerId
          }
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Adding to customer&apos;s project...
            </>
          ) : (
            <>
              <FileText className="w-4 h-4" />
              Add to Customer Project
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
