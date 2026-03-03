import { useState, useEffect } from 'react'
import { X, Users, AlertCircle, Search } from 'lucide-react'
import { collection, query, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { logger } from '@/lib/logger'

interface Customer {
  id: string
  email: string
  displayName?: string
}

interface ChangeOwnerModalProps {
  isOpen: boolean
  onClose: () => void
  currentCustomerId: string
  currentCustomerName: string
  documentTitle: string
  onSubmit: (newCustomerId: string) => Promise<void>
}

export function ChangeOwnerModal({
  isOpen,
  onClose,
  currentCustomerId,
  currentCustomerName,
  documentTitle,
  onSubmit,
}: ChangeOwnerModalProps) {
  const [selectedCustomerId, setSelectedCustomerId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loadingCustomers, setLoadingCustomers] = useState(true)
  const [customerSearch, setCustomerSearch] = useState('')

  // Load customers
  useEffect(() => {
    if (!isOpen) return

    const loadCustomers = async () => {
      try {
        const customersSnapshot = await getDocs(collection(db, 'customers'))
        const customersData = customersSnapshot.docs
          .map((doc) => {
            const data = doc.data()
            return {
              id: doc.id,
              email: data.email,
              displayName: data.displayName,
              // Convert Firestore Timestamps if present
              createdAt: data.createdAt?.toDate?.()
                ? data.createdAt.toDate().toISOString()
                : data.createdAt,
            }
          })
          .filter((c) => c.id !== currentCustomerId) as Customer[] // Exclude current owner

        setCustomers(
          customersData.sort((a, b) =>
            (a.displayName || a.email).localeCompare(b.displayName || b.email)
          )
        )
      } catch (err) {
        logger.error('ChangeOwnerModal', 'Error loading customers', {
          error: err,
        })
      } finally {
        setLoadingCustomers(false)
      }
    }

    loadCustomers()
  }, [isOpen, currentCustomerId])

  const filteredCustomers = customers.filter(
    (c) =>
      customerSearch.length === 0 ||
      c.displayName?.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(customerSearch.toLowerCase())
  )

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await onSubmit(selectedCustomerId)
      setSelectedCustomerId('')
      onClose()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message || 'Failed to change document owner')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-lg shadow-xl max-w-lg w-full"
        role="dialog"
        aria-modal="true"
        aria-label="Change document owner"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">
            Change Document Owner
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Current Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Document</h4>
            <p className="text-sm text-gray-700 mb-3">{documentTitle}</p>
            <h4 className="font-medium text-gray-900 mb-2">Current Owner</h4>
            <p className="text-sm text-gray-700">{currentCustomerName}</p>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900">
              <p className="font-medium mb-1">Important</p>
              <p>
                Changing the document owner will transfer all associated data to
                the new customer. This action is logged and can be audited.
              </p>
            </div>
          </div>

          {/* New Customer Selection */}
          <div>
            <label
              htmlFor="newCustomer"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Owner *
            </label>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            {loadingCustomers ? (
              <div className="text-sm text-gray-500 py-2">
                Loading customers...
              </div>
            ) : (
              <select
                id="newCustomer"
                value={selectedCustomerId}
                onChange={(e) => setSelectedCustomerId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select new owner...</option>
                {filteredCustomers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.displayName || customer.email} ({customer.email})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Confirmation */}
          {selectedCustomer && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-900">
                Transfer ownership to{' '}
                <span className="font-semibold">
                  {selectedCustomer.displayName || selectedCustomer.email}
                </span>
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting || !selectedCustomerId}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Changing Owner...
                </>
              ) : (
                <>
                  <Users className="w-4 h-4" />
                  Change Owner
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
