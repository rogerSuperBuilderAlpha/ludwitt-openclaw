'use client'

import { useState, useMemo } from 'react'
import {
  FileText,
  Download,
  TrendUp,
  CurrencyCircleDollar,
  Clock,
  CheckCircle,
} from '@phosphor-icons/react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { DevCard, DevButton, DevSkeleton } from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import { useSubmissions } from '@/lib/hooks/developers/useSubmissions'
import { toDate } from '@/lib/utils/timestamp'

interface ReportData {
  period: string
  completions: number
  revenue: number
}

type ReportType = 'weekly' | 'monthly' | 'quarterly'

/**
 * Reports Page - Comprehensive analytics reports
 */
export default function ReportsPage() {
  const { user } = useAuth()
  const { isAdminView } = useDevPortalStore()
  const { submissions, loading } = useSubmissions({
    userId: user?.uid || null,
    isAdmin: isAdminView,
  })
  const [reportType, setReportType] = useState<ReportType>('monthly')

  // Calculate real report data from submissions
  const reportData = useMemo(() => {
    const now = new Date()
    const completedDocs = submissions.filter((s) => s.status === 'completed')

    // Group by period
    const data: ReportData[] = []

    if (reportType === 'weekly') {
      // Last 4 weeks
      for (let i = 3; i >= 0; i--) {
        const weekStart = new Date(now)
        weekStart.setDate(now.getDate() - (i + 1) * 7)
        const weekEnd = new Date(now)
        weekEnd.setDate(now.getDate() - i * 7)

        const weekDocs = completedDocs.filter((s) => {
          const completedAt = s.completedAt
            ? toDate(s.completedAt)
            : s.approvedAt
              ? toDate(s.approvedAt)
              : null
          return (
            completedAt && completedAt >= weekStart && completedAt < weekEnd
          )
        })

        const revenue =
          weekDocs.reduce((sum, s) => sum + (s.actualCostCents || 0) * 3, 0) /
          100

        data.push({
          period: `Week ${4 - i}`,
          completions: weekDocs.length,
          revenue,
        })
      }
    } else if (reportType === 'monthly') {
      // Last 6 months
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
      for (let i = 5; i >= 0; i--) {
        const monthDate = new Date(now)
        monthDate.setMonth(now.getMonth() - i)
        const monthStart = new Date(
          monthDate.getFullYear(),
          monthDate.getMonth(),
          1
        )
        const monthEnd = new Date(
          monthDate.getFullYear(),
          monthDate.getMonth() + 1,
          0
        )

        const monthDocs = completedDocs.filter((s) => {
          const completedAt = s.completedAt
            ? toDate(s.completedAt)
            : s.approvedAt
              ? toDate(s.approvedAt)
              : null
          return (
            completedAt && completedAt >= monthStart && completedAt <= monthEnd
          )
        })

        const revenue =
          monthDocs.reduce((sum, s) => sum + (s.actualCostCents || 0) * 3, 0) /
          100

        data.push({
          period: months[monthDate.getMonth()],
          completions: monthDocs.length,
          revenue,
        })
      }
    } else {
      // Quarterly - last 4 quarters
      for (let i = 3; i >= 0; i--) {
        const quarterDate = new Date(now)
        quarterDate.setMonth(now.getMonth() - i * 3)
        const quarter = Math.floor(quarterDate.getMonth() / 3)
        const quarterStart = new Date(quarterDate.getFullYear(), quarter * 3, 1)
        const quarterEnd = new Date(
          quarterDate.getFullYear(),
          (quarter + 1) * 3,
          0
        )

        const quarterDocs = completedDocs.filter((s) => {
          const completedAt = s.completedAt
            ? toDate(s.completedAt)
            : s.approvedAt
              ? toDate(s.approvedAt)
              : null
          return (
            completedAt &&
            completedAt >= quarterStart &&
            completedAt <= quarterEnd
          )
        })

        const revenue =
          quarterDocs.reduce(
            (sum, s) => sum + (s.actualCostCents || 0) * 3,
            0
          ) / 100

        data.push({
          period: `Q${quarter + 1}`,
          completions: quarterDocs.length,
          revenue,
        })
      }
    }

    return data
  }, [submissions, reportType])

  const totalCompletions = reportData.reduce((sum, d) => sum + d.completions, 0)
  const totalRevenue = reportData.reduce((sum, d) => sum + d.revenue, 0)

  // Calculate growth rate (compare last period to previous)
  const growthRate = useMemo(() => {
    if (reportData.length < 2) return 0
    const last = reportData[reportData.length - 1].completions
    const prev = reportData[reportData.length - 2].completions
    if (prev === 0) return last > 0 ? 100 : 0
    return Math.round(((last - prev) / prev) * 100)
  }, [reportData])

  // Distribution data from actual submissions
  const distributionData = useMemo(() => {
    const categoryCount: Record<string, number> = {}
    submissions.forEach((s) => {
      const cat = s.category || 'Other'
      categoryCount[cat] = (categoryCount[cat] || 0) + 1
    })

    const colors = [
      '#6366F1',
      '#8B5CF6',
      '#22C55E',
      '#F59E0B',
      '#9CA3AF',
      '#EC4899',
      '#14B8A6',
    ]
    return Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value], i) => ({
        name,
        value,
        color: colors[i % colors.length],
      }))
  }, [submissions])

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
          justifyContent: 'space-between',
          alignItems: 'center',
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
            Reports
          </h1>
          <p
            style={{
              color: 'var(--dev-text-muted)',
              fontSize: 'var(--dev-text-sm)',
            }}
          >
            Comprehensive analytics and export options
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--dev-space-2)' }}>
          <DevButton
            variant="ghost"
            size="sm"
            leftIcon={<Download size={14} />}
          >
            Export CSV
          </DevButton>
          <DevButton
            variant="ghost"
            size="sm"
            leftIcon={<FileText size={14} />}
          >
            Generate PDF
          </DevButton>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-5)' }}>
        {/* Report Type Selector */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--dev-space-2)',
            marginBottom: 'var(--dev-space-5)',
          }}
        >
          {(['weekly', 'monthly', 'quarterly'] as ReportType[]).map((type) => (
            <DevButton
              key={type}
              variant={reportType === type ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setReportType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </DevButton>
          ))}
        </div>

        {/* Summary Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--dev-space-4)',
            marginBottom: 'var(--dev-space-5)',
          }}
        >
          <DevCard padding="md">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--dev-space-3)',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--dev-radius-md)',
                  background: 'rgba(34, 197, 94, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--dev-accent-success)',
                }}
              >
                <CheckCircle size={20} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 'var(--dev-text-xl)',
                    fontWeight: 'var(--dev-font-bold)',
                  }}
                >
                  {totalCompletions}
                </div>
                <div
                  style={{
                    fontSize: 'var(--dev-text-xs)',
                    color: 'var(--dev-text-muted)',
                  }}
                >
                  Total Completions
                </div>
              </div>
            </div>
          </DevCard>

          <DevCard padding="md">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--dev-space-3)',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--dev-radius-md)',
                  background: 'rgba(99, 102, 241, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--dev-accent-primary)',
                }}
              >
                <CurrencyCircleDollar size={20} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 'var(--dev-text-xl)',
                    fontWeight: 'var(--dev-font-bold)',
                  }}
                >
                  ${totalRevenue.toLocaleString()}
                </div>
                <div
                  style={{
                    fontSize: 'var(--dev-text-xs)',
                    color: 'var(--dev-text-muted)',
                  }}
                >
                  Total Revenue
                </div>
              </div>
            </div>
          </DevCard>

          <DevCard padding="md">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--dev-space-3)',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--dev-radius-md)',
                  background: 'rgba(245, 158, 11, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--dev-status-available)',
                }}
              >
                <Clock size={20} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 'var(--dev-text-xl)',
                    fontWeight: 'var(--dev-font-bold)',
                  }}
                >
                  {submissions.filter((s) => s.status === 'in-progress').length}
                </div>
                <div
                  style={{
                    fontSize: 'var(--dev-text-xs)',
                    color: 'var(--dev-text-muted)',
                  }}
                >
                  In Progress
                </div>
              </div>
            </div>
          </DevCard>

          <DevCard padding="md">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--dev-space-3)',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--dev-radius-md)',
                  background: 'rgba(139, 92, 246, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#8B5CF6',
                }}
              >
                <TrendUp size={20} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 'var(--dev-text-xl)',
                    fontWeight: 'var(--dev-font-bold)',
                  }}
                >
                  {growthRate >= 0 ? '+' : ''}
                  {growthRate}%
                </div>
                <div
                  style={{
                    fontSize: 'var(--dev-text-xs)',
                    color: 'var(--dev-text-muted)',
                  }}
                >
                  Growth Rate
                </div>
              </div>
            </div>
          </DevCard>
        </div>

        {/* Charts */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: 'var(--dev-space-5)',
            marginBottom: 'var(--dev-space-5)',
          }}
        >
          {/* Line Chart */}
          <DevCard padding="md">
            <h3
              style={{
                fontSize: 'var(--dev-text-base)',
                fontWeight: 'var(--dev-font-semibold)',
                marginBottom: 'var(--dev-space-4)',
              }}
            >
              Performance Trend
            </h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={reportData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--dev-border-subtle)"
                  />
                  <XAxis
                    dataKey="period"
                    stroke="var(--dev-text-muted)"
                    fontSize={12}
                  />
                  <YAxis stroke="var(--dev-text-muted)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--dev-bg-elevated)',
                      border: '1px solid var(--dev-border-default)',
                      borderRadius: 8,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="completions"
                    stroke="#6366F1"
                    strokeWidth={2}
                    dot={{ fill: '#6366F1', strokeWidth: 0 }}
                    name="Completions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </DevCard>

          {/* Pie Chart */}
          <DevCard padding="md">
            <h3
              style={{
                fontSize: 'var(--dev-text-base)',
                fontWeight: 'var(--dev-font-semibold)',
                marginBottom: 'var(--dev-space-4)',
              }}
            >
              Document Types
            </h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'var(--dev-bg-elevated)',
                      border: '1px solid var(--dev-border-default)',
                      borderRadius: 8,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </DevCard>
        </div>

        {/* Revenue Bar Chart */}
        <DevCard padding="md">
          <h3
            style={{
              fontSize: 'var(--dev-text-base)',
              fontWeight: 'var(--dev-font-semibold)',
              marginBottom: 'var(--dev-space-4)',
            }}
          >
            Revenue by Period
          </h3>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--dev-border-subtle)"
                />
                <XAxis
                  dataKey="period"
                  stroke="var(--dev-text-muted)"
                  fontSize={12}
                />
                <YAxis
                  stroke="var(--dev-text-muted)"
                  fontSize={12}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--dev-bg-elevated)',
                    border: '1px solid var(--dev-border-default)',
                    borderRadius: 8,
                  }}
                  formatter={(value) => [`$${value}`, 'Revenue']}
                />
                <Bar
                  dataKey="revenue"
                  fill="#6366F1"
                  radius={[4, 4, 0, 0]}
                  name="Revenue"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DevCard>
      </div>
    </div>
  )
}
