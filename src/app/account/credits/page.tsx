'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useRouter } from 'next/navigation'
import { useCredits } from '@/lib/hooks/useCredits'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { useToast } from '@/components/ui/Toast'
import { DepositModal } from '@/components/credits'
import { 
  Wallet, 
  Plus, 
  ArrowUp, 
  ArrowDown, 
  Clock, 
  CreditCard, 
  Cpu,
  TrendUp,
  ArrowsClockwise,
  CaretLeft,
  Lightning,
  Info,
  Coins,
  ArrowSquareOut,
} from '@phosphor-icons/react'
import Link from 'next/link'
import { logger } from '@/lib/logger'

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
    stripePaymentIntentId?: string
    // MOR staking specific
    source?: 'stripe' | 'mor_staking'
    walletAddress?: string
    stakedMor?: number
    monthKey?: string
  }
}

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function isMorDeposit(tx: Transaction): boolean {
  if (tx.type !== 'deposit') return false
  if (tx.metadata?.source === 'mor_staking') return true
  if (tx.metadata?.stripePaymentIntentId?.startsWith('mor_claim_')) return true
  return false
}

// Convert API endpoints to user-friendly descriptions
function getUsageDescription(tx: Transaction): string {
  const endpoint = tx.metadata?.endpoint || tx.description || ''
  
  // Map endpoints to friendly descriptions
  const endpointMappings: Record<string, string> = {
    '/api/basics/ai-writing-tips/tips': 'Writing Tips from Author',
    '/api/basics/ai-writing-tips/suggest': 'Author Suggestions',
    '/api/basics/book-quiz': 'Book Reading Quiz',
    '/api/basics/translation/generate-parsing': 'Latin/Greek Parsing',
    '/api/basics/translation-grading': 'Translation Grading',
    '/api/basics/companion/generate-avatar': 'Avatar Generation',
    '/api/basics/ai-explanation': 'AI Math Explanation',
    '/api/basics/ai-grading': 'AI Answer Grading',
    '/api/basics/logic/grade': 'Logic Problem Grading',
    '/api/basics/reading/grade': 'Reading Exercise Grading',
    '/api/basics/essay/grade': 'Essay Grading',
    'companion-evolution': 'Companion Evolution',
  }

  // Check for exact match
  if (endpointMappings[endpoint]) {
    return endpointMappings[endpoint]
  }

  // Check for partial matches
  for (const [key, value] of Object.entries(endpointMappings)) {
    if (endpoint.includes(key) || key.includes(endpoint)) {
      return value
    }
  }

  // Parse the endpoint path to create a readable name
  if (endpoint.startsWith('/api/')) {
    const parts = endpoint.replace('/api/', '').split('/')
    // Get the last meaningful part
    const lastPart = parts[parts.length - 1] || parts[parts.length - 2] || 'AI Feature'
    // Convert kebab-case to Title Case
    return lastPart
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Fallback: convert description to title case if it looks like an endpoint
  if (endpoint.includes('/') || endpoint.includes('-')) {
    const cleaned = endpoint.replace(/^\/api\//, '').replace(/\//g, ' - ')
    return cleaned
      .split('-')
      .map(word => word.trim())
      .filter(word => word.length > 0)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return endpoint || 'AI Usage'
}

function formatCentsToUsd(cents: number): string {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export default function CreditsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const fetchApi = useApiFetch()
  const toast = useToast()
  const { balance, loading: balanceLoading, refresh: refreshBalance } = useCredits()
  
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [transactionsLoading, setTransactionsLoading] = useState(true)
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [filter, setFilter] = useState<'all' | 'deposits' | 'usage'>('all')
  const [syncing, setSyncing] = useState(false)
  const [totalTransactionCount, setTotalTransactionCount] = useState<number>(0)

  // Check for MOR claim success and show toast
  const checkMorClaimSuccess = useCallback(() => {
    const storedData = sessionStorage.getItem('morClaimSuccess')
    if (storedData) {
      try {
        const { amount } = JSON.parse(storedData)
        toast.success(`🎉 MOR Credits Added: ${formatCentsToUsd(amount)}`)
        sessionStorage.removeItem('morClaimSuccess')
      } catch {
        // Ignore parsing errors
      }
    }
  }, [toast])

  useEffect(() => {
    // Wait for auth to finish loading before redirecting
    if (authLoading) return
    
    if (!user) {
      router.push('/login')
      return
    }
    loadTransactions()
    checkMorClaimSuccess()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading])

  const loadTransactions = async () => {
    try {
      setTransactionsLoading(true)
      const result = await fetchApi<{ transactions: Transaction[]; totalCount: number }>('/api/credits/history?limit=100')
      setTransactions(result.transactions || [])
      setTotalTransactionCount(result.totalCount || 0)
    } catch (error) {
      logger.error('CreditsPage', 'Failed to load transactions', { error })
    } finally {
      setTransactionsLoading(false)
    }
  }

  const handleRefresh = async () => {
    await Promise.all([refreshBalance(), loadTransactions()])
  }

  const handleSyncBalance = async () => {
    try {
      setSyncing(true)
      await fetchApi('/api/credits/sync', { method: 'POST' })
      toast.success('Balance synced successfully')
      await handleRefresh()
    } catch (error) {
      toast.error('Failed to sync balance')
      logger.error('CreditsPage', 'Sync error', { error })
    } finally {
      setSyncing(false)
    }
  }

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'deposits') return tx.type === 'deposit' || tx.type === 'refund'
    if (filter === 'usage') return tx.type === 'usage'
    return true
  })

  // Calculate stats from transactions for comparison
  const calculatedDeposits = transactions
    .filter(tx => tx.type === 'deposit')
    .reduce((sum, tx) => sum + tx.amount, 0)
  
  const calculatedUsage = transactions
    .filter(tx => tx.type === 'usage')
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0)
  
  // Calculate what balance should be based on transactions
  const calculatedBalance = calculatedDeposits - calculatedUsage
  
  // Only show balance mismatch warning if we have ALL transactions
  // If totalCount > transactions.length, we only have partial data and can't reliably detect mismatches
  const hasAllTransactions = transactions.length >= totalTransactionCount
  const hasBalanceMismatch = hasAllTransactions && balance && Math.abs(balance.balance - calculatedBalance) > 1

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  const formatCents = (cents: number) => {
    return (cents / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen b-bg-page flex items-center justify-center">
        <div className="b-animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--b-math)]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen b-bg-page">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 b-text-secondary hover:b-text-primary b-mb-lg transition-colors"
        >
          <CaretLeft size={16} weight="bold" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between b-mb-xl">
          <div>
            <h1 className="b-text-3xl b-font-bold b-text-primary b-mb-sm">Credits & Billing</h1>
            <p className="b-text-secondary">Manage your credits and view transaction history</p>
          </div>
          <button
            onClick={handleRefresh}
            className="b-btn b-btn-ghost b-btn-icon"
            title="Refresh"
          >
            <ArrowsClockwise size={20} weight="bold" />
          </button>
        </div>

        {/* Balance Mismatch Warning */}
        {hasBalanceMismatch && !transactionsLoading && (
          <div className="b-card b-p-lg b-mb-lg" style={{ background: 'var(--b-warning-light)', border: '1px solid var(--b-warning)' }}>
            <div className="flex items-start gap-3">
              <Info size={20} weight="fill" className="b-text-warning-dark flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="b-text-sm b-font-medium b-text-warning-dark b-mb-sm">
                  Balance sync issue detected
                </p>
                <p className="b-text-sm b-text-secondary b-mb-md">
                  Stored balance ({balance?.balanceFormatted}) doesn&apos;t match calculated balance ({formatCents(calculatedBalance)}). 
                  Click &quot;Fix Balance&quot; to recalculate from transaction history.
                </p>
                <button
                  onClick={handleSyncBalance}
                  disabled={syncing}
                  className="b-btn b-btn-sm b-btn-warning"
                >
                  {syncing ? 'Syncing...' : 'Fix Balance'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Balance Card */}
        <div className="b-card b-card-elevated b-p-xl b-mb-xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 b-mb-md">
                <div className="b-icon-box b-icon-box-md b-icon-box-logic">
                  <Wallet size={20} weight="fill" />
                </div>
                <span className="b-text-sm b-text-secondary">Current Balance</span>
              </div>
              {balanceLoading || transactionsLoading ? (
                <div className="h-10 w-32 b-bg-muted b-rounded-lg b-animate-pulse" />
              ) : (
                <div className="b-text-4xl b-font-bold b-text-primary">
                  {hasBalanceMismatch ? formatCents(calculatedBalance) : (balance?.balanceFormatted || '$0.00')}
                </div>
              )}
              {!hasBalanceMismatch && balance?.isLowBalance && !balance?.isAtDebtLimit && (
                <div className="flex items-center gap-2 b-mt-md b-text-warning-dark">
                  <Lightning size={16} weight="fill" />
                  <span className="b-text-sm">Low balance - consider adding funds</span>
                </div>
              )}
              {!hasBalanceMismatch && balance?.isAtDebtLimit && (
                <div className="flex items-center gap-2 b-mt-md b-text-danger-dark">
                  <Lightning size={16} weight="fill" />
                  <span className="b-text-sm">Debt limit reached - add funds to continue</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/account/wallets"
                className="b-btn b-btn-lg b-btn-ghost"
                title="Manage linked wallets"
              >
                <Wallet size={18} weight="fill" />
                Wallets
              </Link>
              <button
                onClick={() => setShowDepositModal(true)}
                className="b-btn b-btn-lg b-btn-logic"
              >
                <Plus size={18} weight="bold" />
                Add Funds
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 b-mb-xl">
          <div className="b-card b-p-lg">
            <div className="flex items-center gap-3 b-mb-md">
              <div className="b-icon-box b-icon-box-md b-icon-box-reading">
                <TrendUp size={20} weight="fill" />
              </div>
              <span className="b-text-sm b-text-secondary">Total Deposited</span>
            </div>
            <div className="b-text-2xl b-font-bold b-text-primary">
              {formatCents(calculatedDeposits)}
            </div>
          </div>
          
          <div className="b-card b-p-lg">
            <div className="flex items-center gap-3 b-mb-md">
              <div className="b-icon-box b-icon-box-md b-icon-box-logic">
                <Cpu size={20} weight="fill" />
              </div>
              <span className="b-text-sm b-text-secondary">Total Used</span>
            </div>
            <div className="b-text-2xl b-font-bold b-text-primary">
              {formatCents(calculatedUsage)}
            </div>
          </div>
          
          <div className="b-card b-p-lg">
            <div className="flex items-center gap-3 b-mb-md">
              <div className="b-icon-box b-icon-box-md b-icon-box-math">
                <Clock size={20} weight="fill" />
              </div>
              <span className="b-text-sm b-text-secondary">Transactions</span>
            </div>
            <div className="b-text-2xl b-font-bold b-text-primary">
              {totalTransactionCount}
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="b-card overflow-hidden">
          {/* Filter Tabs */}
          <div className="flex items-center b-border-b">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-3 b-text-sm b-font-medium transition-colors ${
                filter === 'all'
                  ? 'b-text-math-dark b-bg-math-light'
                  : 'b-text-secondary hover:b-text-primary hover:b-bg-muted'
              }`}
              style={filter === 'all' ? { borderBottom: '2px solid var(--b-math)' } : {}}
            >
              All Transactions
            </button>
            <button
              onClick={() => setFilter('deposits')}
              className={`flex-1 py-3 b-text-sm b-font-medium transition-colors ${
                filter === 'deposits'
                  ? 'b-text-math-dark b-bg-math-light'
                  : 'b-text-secondary hover:b-text-primary hover:b-bg-muted'
              }`}
              style={filter === 'deposits' ? { borderBottom: '2px solid var(--b-math)' } : {}}
            >
              <span className="flex items-center justify-center gap-2">
                <CreditCard size={16} weight="fill" />
                Deposits
              </span>
            </button>
            <button
              onClick={() => setFilter('usage')}
              className={`flex-1 py-3 b-text-sm b-font-medium transition-colors ${
                filter === 'usage'
                  ? 'b-text-math-dark b-bg-math-light'
                  : 'b-text-secondary hover:b-text-primary hover:b-bg-muted'
              }`}
              style={filter === 'usage' ? { borderBottom: '2px solid var(--b-math)' } : {}}
            >
              <span className="flex items-center justify-center gap-2">
                <Cpu size={16} weight="fill" />
                AI Usage
              </span>
            </button>
          </div>

          {/* Transaction List */}
          <div className="divide-y" style={{ borderColor: 'var(--b-border-light)' }}>
            {transactionsLoading ? (
              <div className="b-p-xl text-center">
                <div className="b-animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--b-math)] mx-auto b-mb-md"></div>
                <p className="b-text-muted">Loading transactions...</p>
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div className="b-p-xl text-center">
                <div className="w-16 h-16 b-bg-muted b-rounded-full flex items-center justify-center mx-auto b-mb-md">
                  <Clock size={32} className="b-text-muted" />
                </div>
                <p className="b-text-secondary b-mb-sm">No transactions yet</p>
                <p className="b-text-sm b-text-muted">
                  {filter === 'all' 
                    ? 'Add credits to get started'
                    : filter === 'deposits'
                      ? 'No deposits found'
                      : 'No AI usage recorded'}
                </p>
              </div>
            ) : (
              filteredTransactions.map((tx) => (
                <div key={tx.id} className="b-p-lg hover:b-bg-muted transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 b-rounded-full flex items-center justify-center flex-shrink-0 ${
                      isMorDeposit(tx)
                        ? 'b-bg-logic-light'
                        : tx.type === 'deposit' || tx.type === 'refund'
                          ? 'b-bg-reading-light'
                          : 'b-bg-logic-light'
                    }`}>
                      {isMorDeposit(tx) ? (
                        <Coins size={20} weight="fill" className="b-text-logic" />
                      ) : tx.type === 'deposit' || tx.type === 'refund' ? (
                        <ArrowDown size={20} weight="bold" className={
                          tx.type === 'refund' ? 'b-text-math' : 'b-text-reading'
                        } />
                      ) : (
                        <ArrowUp size={20} weight="bold" className="b-text-logic" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="b-font-medium b-text-primary">
                            {isMorDeposit(tx) ? 'MOR Staking Credit' :
                             tx.type === 'deposit' ? 'Credit Deposit' :
                             tx.type === 'refund' ? 'Refund' :
                             getUsageDescription(tx)}
                          </p>
                          <p className="b-text-sm b-text-muted">
                            {formatDate(tx.createdAt)}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className={`b-font-semibold ${
                            tx.isDebit ? 'b-text-logic' : 'b-text-reading'
                          }`}>
                            {tx.isDebit ? '-' : '+'}{tx.amountFormatted}
                          </p>
                          <p className="b-text-xs b-text-muted">
                            Balance: {tx.balanceAfterFormatted}
                          </p>
                        </div>
                      </div>
                      
                      {/* MOR Staking Details */}
                      {isMorDeposit(tx) && tx.metadata && (
                        <div className="b-mt-md flex flex-wrap items-center gap-2">
                          {tx.metadata.walletAddress && (
                            <a
                              href={`https://basescan.org/address/${tx.metadata.walletAddress}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="b-badge b-badge-logic inline-flex items-center gap-1 hover:opacity-80"
                            >
                              <Wallet size={12} />
                              {shortenAddress(tx.metadata.walletAddress)}
                              <ArrowSquareOut size={10} />
                            </a>
                          )}
                          {tx.metadata.stakedMor !== undefined && (
                            <span className="b-badge b-badge-default">
                              {tx.metadata.stakedMor.toLocaleString()} MOR staked
                            </span>
                          )}
                          {tx.metadata.monthKey && (
                            <span className="b-text-xs b-text-muted">
                              {tx.metadata.monthKey}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Usage Details */}
                      {tx.type === 'usage' && tx.metadata && (
                        <div className="b-mt-md flex flex-wrap gap-2">
                          {tx.metadata.model && (
                            <span className="b-badge b-badge-default">
                              {tx.metadata.model}
                            </span>
                          )}
                          {tx.metadata.inputTokens !== undefined && (
                            <span className="b-badge b-badge-math">
                              {tx.metadata.inputTokens.toLocaleString()} in
                            </span>
                          )}
                          {tx.metadata.outputTokens !== undefined && (
                            <span className="b-badge b-badge-logic">
                              {tx.metadata.outputTokens.toLocaleString()} out
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="b-mt-xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Credits Info */}
          <div className="b-bg-math-light b-border b-border-math b-rounded-xl b-p-lg">
            <div className="flex items-start gap-3">
              <Info size={24} className="b-text-math-dark flex-shrink-0" weight="fill" />
              <div>
                <h3 className="b-font-semibold b-text-math-dark b-mb-sm">How Credits Work</h3>
                <ul className="b-text-sm b-text-math-text space-y-1">
                  <li>• Credits are deducted based on AI compute costs</li>
                  <li>• Minimum deposit is $5, with no recurring fees</li>
                  <li>• You can go up to $5 into debt before reloading</li>
                </ul>
              </div>
            </div>
          </div>

          {/* MOR Staking Info */}
          <div className="b-bg-logic-light b-border b-border-logic b-rounded-xl b-p-lg">
            <div className="flex items-start gap-3">
              <Coins size={24} className="b-text-logic flex-shrink-0" weight="fill" />
              <div>
                <h3 className="b-font-semibold b-text-logic-dark b-mb-sm">💎 Stake MOR, Keep Your Money</h3>
                <p className="b-text-sm b-text-logic-text b-mb-sm">
                  <strong>Why pay cash when you can stake?</strong> Stake MOR tokens to earn $1 in credits per MOR per month — 
                  and you keep your MOR. Unstake anytime and get it all back.
                </p>
                <p className="b-text-xs b-text-logic-text b-mb-sm">
                  Example: 100 MOR staked = $1,200/year in credits, with $0 spent.
                </p>
                <Link
                  href="/account/wallets"
                  className="inline-flex items-center gap-1 b-text-sm b-text-logic b-font-medium hover:underline"
                >
                  Link Wallet & Start Earning <ArrowSquareOut size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      <DepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        onSuccess={() => {
          handleRefresh()
          setShowDepositModal(false)
          // Check for MOR claim success toast
          checkMorClaimSuccess()
        }}
      />
    </div>
  )
}
