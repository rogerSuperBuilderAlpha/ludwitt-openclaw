/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

import { useState, useEffect } from 'react'
import {
  CurrencyCircleDollar,
  TrendUp,
  ArrowRight,
  CaretDown,
} from '@phosphor-icons/react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {
  DevStatCard,
  DevCard,
  DevButton,
  DevSkeleton,
  DevBadge,
} from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'

interface RevenueData {
  period: number
  summary: {
    totalComputeCost: number
    totalCustomerCharge: number
    totalDocuments: number
    averagePerDocument: number
  }
  dailyRevenue: {
    date: string
    computeCost: number
    customerCharge: number
    count: number
  }[]
  byCustomer: {
    customerId: string
    customerName: string
    totalCharge: number
    documentCount: number
  }[]
  byCategory: {
    category: string
    totalCharge: number
    count: number
  }[]
}

const COLORS = [
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
  '#f97316',
  '#eab308',
]

/**
 * Revenue Analytics Page
 */
export default function RevenuePage() {
  const { user } = useAuth()
  const [data, setData] = useState<RevenueData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [period, setPeriod] = useState<number>(30)
  const [showPeriodMenu, setShowPeriodMenu] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return
      setLoading(true)

      try {
        const token = await user.getIdToken()
        const res = await fetch(
          `/api/developers/analytics/revenue?period=${period}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        if (!res.ok) throw new Error('Failed to fetch data')

        const json = await res.json()
        if (json.success) {
          setData(json.data)
        } else {
          throw new Error(json.error || 'Failed to fetch data')
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user, period])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value)
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return ''
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  if (loading) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            padding: 'var(--dev-space-4) var(--dev-space-5)',
            borderBottom: '1px solid var(--dev-border-subtle)',
          }}
        >
          <DevSkeleton width={200} height={32} />
        </div>
        <div style={{ flex: 1, padding: 'var(--dev-space-5)' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'var(--dev-space-4)',
              marginBottom: 'var(--dev-space-6)',
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <DevSkeleton key={i} height={100} />
            ))}
          </div>
          <DevSkeleton height={300} />
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div
        style={{
          padding: 'var(--dev-space-4) var(--dev-space-5)',
          borderBottom: '1px solid var(--dev-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 'var(--dev-text-xl)',
              fontWeight: 'var(--dev-font-semibold)',
              marginBottom: 'var(--dev-space-1)',
            }}
          >
            Revenue Analytics
          </h1>
          <p
            style={{
              color: 'var(--dev-text-muted)',
              fontSize: 'var(--dev-text-sm)',
            }}
          >
            Track earnings and billing across all documents
          </p>
        </div>

        {/* Period Selector */}
        <div style={{ position: 'relative' }}>
          <DevButton
            variant="secondary"
            size="sm"
            onClick={() => setShowPeriodMenu(!showPeriodMenu)}
          >
            Last {period} days
            <CaretDown size={12} style={{ marginLeft: 4 }} />
          </DevButton>
          {showPeriodMenu && (
            <>
              <div
                style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                onClick={() => setShowPeriodMenu(false)}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: 4,
                  background: 'var(--dev-bg-elevated)',
                  border: '1px solid var(--dev-border-default)',
                  borderRadius: 'var(--dev-radius-lg)',
                  boxShadow: 'var(--dev-shadow-lg)',
                  zIndex: 50,
                  overflow: 'hidden',
                  minWidth: 120,
                }}
              >
                {[7, 14, 30, 60, 90].map((days) => (
                  <button
                    key={days}
                    onClick={() => {
                      setPeriod(days)
                      setShowPeriodMenu(false)
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: 'var(--dev-space-2) var(--dev-space-3)',
                      textAlign: 'left',
                      background:
                        period === days ? 'var(--dev-bg-hover)' : 'transparent',
                      border: 'none',
                      color: 'var(--dev-text-primary)',
                      fontSize: 'var(--dev-text-sm)',
                      cursor: 'pointer',
                    }}
                  >
                    Last {days} days
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-5)' }}>
        {error && (
          <div
            style={{
              padding: 'var(--dev-space-4)',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: 'var(--dev-radius-lg)',
              color: 'var(--dev-accent-danger)',
              marginBottom: 'var(--dev-space-4)',
            }}
          >
            {error}
          </div>
        )}

        {/* Summary Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--dev-space-4)',
            marginBottom: 'var(--dev-space-6)',
          }}
        >
          <DevStatCard
            title="Total Revenue"
            value={formatCurrency(data?.summary.totalCustomerCharge || 0)}
            icon={<CurrencyCircleDollar size={20} />}
            color="success"
          />
          <DevStatCard
            title="Compute Cost"
            value={formatCurrency(data?.summary.totalComputeCost || 0)}
            icon={<TrendUp size={20} />}
          />
          <DevStatCard
            title="Documents"
            value={data?.summary.totalDocuments || 0}
          />
          <DevStatCard
            title="Avg per Document"
            value={formatCurrency(data?.summary.averagePerDocument || 0)}
          />
        </div>

        {/* Revenue Chart */}
        <DevCard padding="md" style={{ marginBottom: 'var(--dev-space-5)' }}>
          <h2
            style={{
              fontSize: 'var(--dev-text-base)',
              fontWeight: 'var(--dev-font-semibold)',
              marginBottom: 'var(--dev-space-4)',
            }}
          >
            Revenue Over Time
          </h2>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.dailyRevenue || []}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--dev-border-subtle)"
                />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  stroke="var(--dev-text-muted)"
                  fontSize={12}
                />
                <YAxis
                  tickFormatter={(v) => `$${v}`}
                  stroke="var(--dev-text-muted)"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--dev-bg-elevated)',
                    border: '1px solid var(--dev-border-default)',
                    borderRadius: 8,
                  }}
                  formatter={(value: number) => [
                    formatCurrency(value),
                    'Revenue',
                  ]}
                  labelFormatter={formatDate}
                />
                <Area
                  type="monotone"
                  dataKey="customerCharge"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </DevCard>

        {/* Two Column Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--dev-space-5)',
          }}
        >
          {/* By Customer */}
          <DevCard padding="md">
            <h2
              style={{
                fontSize: 'var(--dev-text-base)',
                fontWeight: 'var(--dev-font-semibold)',
                marginBottom: 'var(--dev-space-4)',
              }}
            >
              Top Customers
            </h2>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data?.byCustomer?.slice(0, 5) || []}
                  layout="vertical"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--dev-border-subtle)"
                  />
                  <XAxis
                    type="number"
                    tickFormatter={(v) => `$${v}`}
                    stroke="var(--dev-text-muted)"
                    fontSize={12}
                  />
                  <YAxis
                    type="category"
                    dataKey="customerName"
                    width={100}
                    stroke="var(--dev-text-muted)"
                    fontSize={11}
                    tickFormatter={(v) =>
                      v.length > 12 ? v.slice(0, 12) + '...' : v
                    }
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--dev-bg-elevated)',
                      border: '1px solid var(--dev-border-default)',
                      borderRadius: 8,
                    }}
                    formatter={(value: number) => [
                      formatCurrency(value),
                      'Revenue',
                    ]}
                  />
                  <Bar
                    dataKey="totalCharge"
                    fill="#6366f1"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DevCard>

          {/* By Category */}
          <DevCard padding="md">
            <h2
              style={{
                fontSize: 'var(--dev-text-base)',
                fontWeight: 'var(--dev-font-semibold)',
                marginBottom: 'var(--dev-space-4)',
              }}
            >
              By Category
            </h2>
            <div
              style={{
                height: 250,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {data?.byCategory && data.byCategory.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.byCategory}
                      dataKey="totalCharge"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ category, percent }) =>
                        `${category} (${(percent * 100).toFixed(0)}%)`
                      }
                      labelLine={false}
                    >
                      {data.byCategory.map((entry, index) => (
                        <Cell
                          key={entry.category}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: 'var(--dev-bg-elevated)',
                        border: '1px solid var(--dev-border-default)',
                        borderRadius: 8,
                      }}
                      formatter={(value: number) => [
                        formatCurrency(value),
                        'Revenue',
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p
                  style={{
                    color: 'var(--dev-text-muted)',
                    fontSize: 'var(--dev-text-sm)',
                  }}
                >
                  No category data available
                </p>
              )}
            </div>
          </DevCard>
        </div>
      </div>
    </div>
  )
}
