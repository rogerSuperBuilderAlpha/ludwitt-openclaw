'use client'

import { useState, useEffect, useCallback } from 'react'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import {
  ArrowUp,
  ArrowDown,
  Clock,
  ArrowsClockwise,
  FileDoc,
  Receipt,
  CaretDown,
  CaretUp,
  FunnelSimple,
} from '@phosphor-icons/react'
import Link from 'next/link'

interface Transaction {
  id: string
  type: 'deposit' | 'usage' | 'refund'
  amount: number
  amountFormatted: string
  balanceAfter: number
  balanceAfterFormatted: string
  description: string
  isDebit: boolean
  createdAt: string
  metadata?: {
    endpoint?: string
    model?: string
    inputTokens?: number
    outputTokens?: number
    rawCostCents?: number
    chargedCostCents?: number
    documentId?: string
    documentTitle?: string
    source?: 'stripe' | 'mor_staking' | 'customer_document'
  }
}

interface TransactionHistoryProps {
  limit?: number
  showFilters?: boolean
  compact?: boolean
  className?: string
}

export function TransactionHistory({
  limit = 20,
  showFilters = true,
  compact = false,
  className = '',
}: TransactionHistoryProps) {
  const fetchApi = useApiFetch()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<
    'all' | 'deposits' | 'usage' | 'documents'
  >('all')
  const [showAll, setShowAll] = useState(false)

  const loadTransactions = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetchApi<{ transactions: Transaction[] }>(
        `/api/credits/history?limit=${limit}`
      )
      setTransactions(result.transactions || [])
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load transactions'
      )
    } finally {
      setLoading(false)
    }
  }, [fetchApi, limit])

  useEffect(() => {
    loadTransactions()
  }, [loadTransactions])

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === 'deposits')
      return tx.type === 'deposit' || tx.type === 'refund'
    if (filter === 'usage')
      return tx.type === 'usage' && tx.metadata?.source !== 'customer_document'
    if (filter === 'documents')
      return (
        tx.metadata?.source === 'customer_document' || tx.metadata?.documentId
      )
    return true
  })

  const displayedTransactions = showAll
    ? filteredTransactions
    : filteredTransactions.slice(0, compact ? 5 : 10)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (compact) {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  const getTransactionIcon = (tx: Transaction) => {
    if (
      tx.metadata?.documentId ||
      tx.metadata?.source === 'customer_document'
    ) {
      return (
        <FileDoc
          size={compact ? 16 : 20}
          weight="duotone"
          className="text-purple-500"
        />
      )
    }
    if (tx.type === 'deposit') {
      return (
        <ArrowDown
          size={compact ? 16 : 20}
          weight="bold"
          className="text-green-500"
        />
      )
    }
    if (tx.type === 'refund') {
      return (
        <ArrowDown
          size={compact ? 16 : 20}
          weight="bold"
          className="text-blue-500"
        />
      )
    }
    return (
      <ArrowUp
        size={compact ? 16 : 20}
        weight="bold"
        className="text-red-500"
      />
    )
  }

  const getTransactionLabel = (tx: Transaction) => {
    if (tx.metadata?.documentTitle) {
      return `Document: ${tx.metadata.documentTitle}`
    }
    if (tx.metadata?.documentId) {
      return 'Document Processing'
    }
    return tx.description
  }

  if (loading) {
    return (
      <div className={`${className} animate-pulse`}>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        {[...Array(compact ? 3 : 5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 py-3 border-b border-gray-100"
          >
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-2 bg-gray-100 rounded w-1/3"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div
        className={`${className} p-4 bg-red-50 rounded-lg text-red-600 text-sm`}
      >
        {error}
        <button onClick={loadTransactions} className="ml-2 underline">
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`font-semibold text-gray-900 ${compact ? 'text-sm' : 'text-base'}`}
        >
          Transaction History
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={loadTransactions}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            title="Refresh"
          >
            <ArrowsClockwise size={16} />
          </button>
          <Link
            href="/account/credits"
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            View All
          </Link>
        </div>
      </div>

      {/* Filters */}
      {showFilters && !compact && (
        <div className="flex gap-2 mb-4">
          {(['all', 'deposits', 'documents', 'usage'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                filter === f
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'all' && 'All'}
              {f === 'deposits' && 'Deposits'}
              {f === 'documents' && 'Documents'}
              {f === 'usage' && 'AI Usage'}
            </button>
          ))}
        </div>
      )}

      {/* Compact filter */}
      {showFilters && compact && (
        <div className="flex items-center gap-2 mb-3">
          <FunnelSimple size={14} className="text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="text-xs border-none bg-transparent text-gray-600 p-0 pr-6 focus:ring-0"
          >
            <option value="all">All</option>
            <option value="deposits">Deposits</option>
            <option value="documents">Documents</option>
            <option value="usage">AI Usage</option>
          </select>
        </div>
      )}

      {/* Transaction List */}
      {displayedTransactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Receipt size={32} className="mx-auto mb-2 text-gray-300" />
          <p className="text-sm">No transactions yet</p>
        </div>
      ) : (
        <div className="space-y-1">
          {displayedTransactions.map((tx) => (
            <div
              key={tx.id}
              className={`flex items-center gap-3 ${compact ? 'py-2' : 'py-3'} border-b border-gray-100 last:border-b-0`}
            >
              {/* Icon */}
              <div
                className={`flex-shrink-0 ${compact ? 'w-6 h-6' : 'w-8 h-8'} flex items-center justify-center rounded-full ${
                  tx.isDebit ? 'bg-red-50' : 'bg-green-50'
                }`}
              >
                {getTransactionIcon(tx)}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p
                  className={`font-medium text-gray-900 truncate ${compact ? 'text-xs' : 'text-sm'}`}
                >
                  {getTransactionLabel(tx)}
                </p>
                <p
                  className={`text-gray-500 flex items-center gap-1 ${compact ? 'text-[10px]' : 'text-xs'}`}
                >
                  <Clock size={10} />
                  {formatDate(tx.createdAt)}
                </p>
              </div>

              {/* Amount */}
              <div className={`text-right ${compact ? 'text-xs' : 'text-sm'}`}>
                <span
                  className={`font-medium ${tx.isDebit ? 'text-red-600' : 'text-green-600'}`}
                >
                  {tx.isDebit ? '-' : '+'}
                  {tx.amountFormatted}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Show More/Less */}
      {filteredTransactions.length > (compact ? 5 : 10) && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-3 py-2 text-xs text-gray-600 hover:text-gray-900 flex items-center justify-center gap-1 transition-colors"
        >
          {showAll ? (
            <>
              <CaretUp size={14} />
              Show Less
            </>
          ) : (
            <>
              <CaretDown size={14} />
              Show {filteredTransactions.length - (compact ? 5 : 10)} More
            </>
          )}
        </button>
      )}
    </div>
  )
}
