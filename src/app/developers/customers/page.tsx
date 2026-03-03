/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/label-has-associated-control, jsx-a11y/no-static-element-interactions */
'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Users,
  MagnifyingGlass,
  CaretDown,
  EnvelopeSimple,
  FileText,
  CurrencyCircleDollar,
  Warning,
  Clock,
  X,
  Plus,
  CheckCircle,
} from '@phosphor-icons/react'
import {
  DevCard,
  DevButton,
  DevSkeleton,
  DevBadge,
  DevEmptyState,
} from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'
import Link from 'next/link'

interface Customer {
  id: string
  email: string
  displayName: string
  photoURL?: string
  totalDocuments: number
  activeDocuments: number
  completedDocuments: number
  totalSpentCents: number
  creditBalanceCents: number
  lastActivityAt: string | null
  createdAt: string | null
  hasOverdueDoc: boolean
  lowCreditBalance: boolean
  daysSinceActivity: number | null
}

type SortKey = 'name' | 'documents' | 'revenue' | 'activity'

interface AddCreditModal {
  isOpen: boolean
  customer: Customer | null
}

/**
 * All Customers Page
 */
export default function CustomersPage() {
  const { user } = useAuth()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortKey>('documents')
  const [showSortMenu, setShowSortMenu] = useState(false)

  // Add credits modal state
  const [creditModal, setCreditModal] = useState<AddCreditModal>({
    isOpen: false,
    customer: null,
  })
  const [creditAmount, setCreditAmount] = useState('')
  const [creditReason, setCreditReason] = useState('')
  const [creditPaymentMethod, setCreditPaymentMethod] = useState('check')
  const [addingCredits, setAddingCredits] = useState(false)
  const [creditSuccess, setCreditSuccess] = useState<string | null>(null)

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!user) return
      setLoading(true)

      try {
        const token = await user.getIdToken()
        const res = await fetch('/api/developers/customers', {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error('Failed to fetch customers')

        const json = await res.json()
        if (json.success) {
          setCustomers(json.data.customers)
        } else {
          throw new Error(json.error || 'Failed to fetch customers')
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [user])

  // Filter and sort customers
  const filteredCustomers = useMemo(() => {
    let result = [...customers]

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.displayName.toLowerCase().includes(searchLower) ||
          c.email.toLowerCase().includes(searchLower)
      )
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.displayName.localeCompare(b.displayName)
        case 'documents':
          return b.totalDocuments - a.totalDocuments
        case 'revenue':
          return b.totalSpentCents - a.totalSpentCents
        case 'activity':
          if (!a.lastActivityAt) return 1
          if (!b.lastActivityAt) return -1
          return (
            new Date(b.lastActivityAt).getTime() -
            new Date(a.lastActivityAt).getTime()
          )
        default:
          return 0
      }
    })

    return result
  }, [customers, search, sortBy])

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100)
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Never'
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return 'Never'
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year:
        date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    }).format(date)
  }

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: 'documents', label: 'Most Documents' },
    { key: 'revenue', label: 'Highest Revenue' },
    { key: 'activity', label: 'Recent Activity' },
    { key: 'name', label: 'Name A-Z' },
  ]

  // Open add credits modal
  const openCreditModal = (customer: Customer) => {
    setCreditModal({ isOpen: true, customer })
    setCreditAmount('')
    setCreditReason('')
    setCreditPaymentMethod('check')
    setCreditSuccess(null)
  }

  // Close add credits modal
  const closeCreditModal = () => {
    setCreditModal({ isOpen: false, customer: null })
    setCreditAmount('')
    setCreditReason('')
    setCreditSuccess(null)
  }

  // Handle adding credits
  const handleAddCredits = async () => {
    if (!creditModal.customer || !user) return

    const amount = parseFloat(creditAmount)
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount')
      return
    }

    if (!creditReason.trim()) {
      setError('Please enter a reason')
      return
    }

    setAddingCredits(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const res = await fetch('/api/developers/credits/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          customerId: creditModal.customer.id,
          amountDollars: amount,
          reason: creditReason.trim(),
          paymentMethod: creditPaymentMethod,
        }),
      })

      const json = await res.json()

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to add credits')
      }

      // Update local customer data
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === creditModal.customer!.id
            ? {
                ...c,
                creditBalanceCents: json.data.newBalance,
                lowCreditBalance: json.data.newBalance < 100,
              }
            : c
        )
      )

      setCreditSuccess(
        `Successfully added $${amount.toFixed(2)} to ${creditModal.customer.displayName}'s account`
      )

      // Close modal after 2 seconds
      setTimeout(() => {
        closeCreditModal()
      }, 2000)
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to add credits'
      setError(errorMessage)
    } finally {
      setAddingCredits(false)
    }
  }

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-[var(--dev-space-4)] px-[var(--dev-space-5)] border-b border-[var(--dev-border-subtle)]">
          <DevSkeleton width={200} height={32} />
        </div>
        <div className="flex-1 p-[var(--dev-space-5)]">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-[var(--dev-space-4)]">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <DevSkeleton key={i} height={180} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-[var(--dev-space-4)] px-[var(--dev-space-5)] border-b border-[var(--dev-border-subtle)] flex items-center justify-between gap-[var(--dev-space-4)] flex-wrap">
        <div>
          <h1 className="text-[length:var(--dev-text-xl)] font-[var(--dev-font-semibold)] mb-[var(--dev-space-1)]">
            All Customers
          </h1>
          <p className="text-[var(--dev-text-muted)] text-[length:var(--dev-text-sm)]">
            {filteredCustomers.length} customer
            {filteredCustomers.length !== 1 ? 's' : ''} total
          </p>
        </div>

        <div className="flex gap-[var(--dev-space-3)] items-center">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--dev-text-muted)]"
            />
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="dev-input pl-9 w-[220px]"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <DevButton
              variant="secondary"
              size="sm"
              onClick={() => setShowSortMenu(!showSortMenu)}
            >
              Sort: {sortOptions.find((o) => o.key === sortBy)?.label}
              <CaretDown size={12} className="ml-1" />
            </DevButton>
            {showSortMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowSortMenu(false)}
                />
                <div className="absolute top-full right-0 mt-1 bg-[var(--dev-bg-elevated)] border border-[var(--dev-border-default)] rounded-[var(--dev-radius-lg)] shadow-[var(--dev-shadow-lg)] z-50 overflow-hidden min-w-[160px]">
                  {sortOptions.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => {
                        setSortBy(option.key)
                        setShowSortMenu(false)
                      }}
                      className="block w-full py-[var(--dev-space-2)] px-[var(--dev-space-3)] text-left border-none text-[var(--dev-text-primary)] text-[length:var(--dev-text-sm)] cursor-pointer"
                      style={{
                        background:
                          sortBy === option.key
                            ? 'var(--dev-bg-hover)'
                            : 'transparent',
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-[var(--dev-space-5)]">
        {error && (
          <div className="p-[var(--dev-space-4)] bg-[rgba(239,68,68,0.1)] rounded-[var(--dev-radius-lg)] text-[var(--dev-accent-danger)] mb-[var(--dev-space-4)]">
            {error}
          </div>
        )}

        {filteredCustomers.length === 0 ? (
          <DevEmptyState
            icon={<Users size={32} />}
            title={search ? 'No customers found' : 'No customers yet'}
            description={
              search
                ? 'Try a different search term'
                : 'Customers will appear here once they submit documents'
            }
          />
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-[var(--dev-space-4)]">
            {filteredCustomers.map((customer) => (
              <DevCard key={customer.id} padding="md" className="relative">
                {/* Risk indicators */}
                {(customer.hasOverdueDoc || customer.lowCreditBalance) && (
                  <div className="absolute top-3 right-3 flex gap-1">
                    {customer.hasOverdueDoc && (
                      <DevBadge variant="danger" size="sm">
                        <Clock size={10} className="mr-0.5" /> Overdue
                      </DevBadge>
                    )}
                    {customer.lowCreditBalance && (
                      <button
                        onClick={() => openCreditModal(customer)}
                        className="bg-none border-none p-0 cursor-pointer"
                        title="Click to add credits"
                      >
                        <DevBadge variant="warning" size="sm">
                          <Warning size={10} className="mr-0.5" /> Low Credit
                        </DevBadge>
                      </button>
                    )}
                  </div>
                )}

                {/* Customer info */}
                <div className="flex items-center gap-[var(--dev-space-3)] mb-[var(--dev-space-3)]">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-[var(--dev-font-semibold)] text-[length:var(--dev-text-sm)]"
                    style={{
                      background: customer.photoURL
                        ? `url(${customer.photoURL}) center/cover`
                        : 'var(--dev-accent-primary)',
                    }}
                  >
                    {!customer.photoURL &&
                      customer.displayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-[var(--dev-font-semibold)] text-[length:var(--dev-text-base)] whitespace-nowrap overflow-hidden text-ellipsis">
                      {customer.displayName}
                    </div>
                    <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)] whitespace-nowrap overflow-hidden text-ellipsis">
                      {customer.email}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-[var(--dev-space-2)] p-[var(--dev-space-3)] bg-[var(--dev-bg-muted)] rounded-[var(--dev-radius-md)] mb-[var(--dev-space-3)]">
                  <div className="text-center">
                    <div className="text-[length:var(--dev-text-lg)] font-[var(--dev-font-bold)]">
                      {customer.totalDocuments}
                    </div>
                    <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                      Documents
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[length:var(--dev-text-lg)] font-[var(--dev-font-bold)]">
                      {customer.activeDocuments}
                    </div>
                    <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                      Active
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[length:var(--dev-text-lg)] font-[var(--dev-font-bold)] text-[var(--dev-accent-success)]">
                      {formatCurrency(customer.totalSpentCents)}
                    </div>
                    <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                      Revenue
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                  <span>
                    Last active: {formatDate(customer.lastActivityAt)}
                  </span>
                  <div className="flex gap-[var(--dev-space-2)]">
                    <Link href={`/customers/${customer.id}`}>
                      <DevButton
                        variant="ghost"
                        size="sm"
                        title="View documents"
                      >
                        <FileText size={14} />
                      </DevButton>
                    </Link>
                    <DevButton
                      variant="ghost"
                      size="sm"
                      onClick={() => openCreditModal(customer)}
                      title="Add credits"
                    >
                      <CurrencyCircleDollar size={14} />
                    </DevButton>
                    <DevButton
                      variant="ghost"
                      size="sm"
                      disabled
                      title="Send message"
                    >
                      <EnvelopeSimple size={14} />
                    </DevButton>
                  </div>
                </div>
              </DevCard>
            ))}
          </div>
        )}
      </div>

      {/* Add Credits Modal */}
      {creditModal.isOpen && creditModal.customer && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={closeCreditModal}
          />

          {/* Modal */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] bg-[var(--dev-bg-elevated,#1a1a1b)] rounded-[var(--dev-radius-xl,12px)] border border-[var(--dev-border-default)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] z-[101] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-[var(--dev-space-4)] px-[var(--dev-space-5)] border-b border-[var(--dev-border-subtle)]">
              <div className="flex items-center gap-[var(--dev-space-3)]">
                <div className="w-9 h-9 rounded-full bg-[var(--dev-accent-success)] flex items-center justify-center">
                  <Plus size={18} weight="bold" color="white" />
                </div>
                <div>
                  <h3 className="font-[var(--dev-font-semibold)] text-[length:var(--dev-text-base)]">
                    Add Credits
                  </h3>
                  <p className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                    {creditModal.customer.displayName}
                  </p>
                </div>
              </div>
              <button
                onClick={closeCreditModal}
                className="bg-none border-none p-2 cursor-pointer text-[var(--dev-text-muted)] rounded-[var(--dev-radius-md)]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-[var(--dev-space-5)]">
              {creditSuccess ? (
                <div className="flex flex-col items-center gap-[var(--dev-space-3)] p-[var(--dev-space-4)]">
                  <CheckCircle
                    size={48}
                    weight="fill"
                    color="var(--dev-accent-success)"
                  />
                  <p className="text-center text-[var(--dev-text-primary)]">
                    {creditSuccess}
                  </p>
                </div>
              ) : (
                <>
                  {/* Current Balance */}
                  <div className="bg-[var(--dev-bg-muted)] rounded-[var(--dev-radius-md)] p-[var(--dev-space-3)] mb-[var(--dev-space-4)] flex justify-between items-center">
                    <span className="text-[length:var(--dev-text-sm)] text-[var(--dev-text-muted)]">
                      Current Balance
                    </span>
                    <span
                      className="font-[var(--dev-font-bold)]"
                      style={{
                        color:
                          creditModal.customer.creditBalanceCents < 100
                            ? 'var(--dev-accent-warning)'
                            : 'var(--dev-text-primary)',
                      }}
                    >
                      {formatCurrency(creditModal.customer.creditBalanceCents)}
                    </span>
                  </div>

                  {/* Amount Input */}
                  <div className="mb-[var(--dev-space-4)]">
                    <label className="block text-[length:var(--dev-text-sm)] font-[var(--dev-font-medium)] mb-[var(--dev-space-2)]">
                      Amount to Add (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--dev-text-muted)] font-[var(--dev-font-medium)]">
                        $
                      </span>
                      <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="0.00"
                        value={creditAmount}
                        onChange={(e) => setCreditAmount(e.target.value)}
                        className="dev-input pl-7 w-full"
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-[var(--dev-space-4)]">
                    <label className="block text-[length:var(--dev-text-sm)] font-[var(--dev-font-medium)] mb-[var(--dev-space-2)]">
                      Payment Method
                    </label>
                    <select
                      value={creditPaymentMethod}
                      onChange={(e) => setCreditPaymentMethod(e.target.value)}
                      className="dev-input w-full"
                    >
                      <option value="check">Check</option>
                      <option value="cash">Cash</option>
                      <option value="wire">Wire Transfer</option>
                      <option value="crypto">Cryptocurrency</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Reason Input */}
                  <div className="mb-[var(--dev-space-4)]">
                    <label className="block text-[length:var(--dev-text-sm)] font-[var(--dev-font-medium)] mb-[var(--dev-space-2)]">
                      Reason / Notes
                    </label>
                    <textarea
                      placeholder="e.g., Check #1234 received, Invoice #5678"
                      value={creditReason}
                      onChange={(e) => setCreditReason(e.target.value)}
                      className="dev-input w-full min-h-[80px] resize-y"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {!creditSuccess && (
              <div className="flex justify-end gap-[var(--dev-space-3)] p-[var(--dev-space-4)] px-[var(--dev-space-5)] border-t border-[var(--dev-border-subtle)]">
                <DevButton variant="ghost" onClick={closeCreditModal}>
                  Cancel
                </DevButton>
                <DevButton
                  variant="primary"
                  onClick={handleAddCredits}
                  disabled={
                    addingCredits || !creditAmount || !creditReason.trim()
                  }
                >
                  {addingCredits ? 'Adding...' : 'Add Credits'}
                </DevButton>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
