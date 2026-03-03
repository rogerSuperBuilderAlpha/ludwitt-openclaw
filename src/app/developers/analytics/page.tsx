'use client'

import { DevCard, DevBadge, DevProgress } from '@/components/developers/v2/ui'
import { ChartBar, TrendUp, TrendDown, Clock, CheckCircle, Users, Files } from '@phosphor-icons/react'

interface MetricCard {
  label: string
  value: string | number
  change?: number
  trend?: 'up' | 'down' | 'neutral'
  icon: React.ReactNode
}

/**
 * Analytics Page
 * 
 * Overview of portal metrics and performance data.
 * Currently shows placeholder data - will be connected to real metrics.
 */
export default function AnalyticsPage() {
  const metrics: MetricCard[] = [
    { 
      label: 'Documents Completed', 
      value: 47, 
      change: 12, 
      trend: 'up', 
      icon: <CheckCircle size={20} weight="duotone" /> 
    },
    { 
      label: 'Avg. Completion Time', 
      value: '2.4 days', 
      change: -8, 
      trend: 'up', 
      icon: <Clock size={20} weight="duotone" /> 
    },
    { 
      label: 'Active Documents', 
      value: 23, 
      change: 5, 
      trend: 'neutral', 
      icon: <Files size={20} weight="duotone" /> 
    },
    { 
      label: 'Active Customers', 
      value: 12, 
      change: 2, 
      trend: 'up', 
      icon: <Users size={20} weight="duotone" /> 
    },
  ]

  return (
    <div style={{ padding: 'var(--dev-space-6)', maxWidth: 1200 }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--dev-space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-3)', marginBottom: 'var(--dev-space-2)' }}>
          <ChartBar size={24} weight="duotone" style={{ color: 'var(--dev-accent-primary)' }} />
          <h1 style={{ 
            fontSize: 'var(--dev-text-2xl)', 
            fontWeight: 'var(--dev-font-semibold)',
          }}>
            Analytics
          </h1>
          <DevBadge variant="info">Beta</DevBadge>
        </div>
        <p style={{ color: 'var(--dev-text-muted)', fontSize: 'var(--dev-text-sm)' }}>
          Portal performance metrics and insights
        </p>
      </div>

      {/* Metrics Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: 'var(--dev-space-4)',
        marginBottom: 'var(--dev-space-6)',
      }}>
        {metrics.map((metric, i) => (
          <DevCard key={i} padding="lg">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--dev-space-3)' }}>
              <div 
                style={{ 
                  padding: 'var(--dev-space-2)', 
                  background: 'var(--dev-bg-muted)', 
                  borderRadius: 'var(--dev-radius-md)',
                  color: 'var(--dev-text-muted)',
                }}
              >
                {metric.icon}
              </div>
              {metric.change !== undefined && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-1)' }}>
                  {metric.trend === 'up' && metric.change > 0 && (
                    <TrendUp size={14} style={{ color: 'var(--dev-accent-success)' }} />
                  )}
                  {metric.trend === 'up' && metric.change < 0 && (
                    <TrendDown size={14} style={{ color: 'var(--dev-accent-success)' }} />
                  )}
                  {metric.trend === 'down' && (
                    <TrendDown size={14} style={{ color: 'var(--dev-accent-danger)' }} />
                  )}
                  <span 
                    style={{ 
                      fontSize: 'var(--dev-text-xs)', 
                      color: metric.trend === 'up' ? 'var(--dev-accent-success)' : 
                             metric.trend === 'down' ? 'var(--dev-accent-danger)' : 
                             'var(--dev-text-muted)',
                    }}
                  >
                    {Math.abs(metric.change)}%
                  </span>
                </div>
              )}
            </div>
            <div style={{ fontSize: 'var(--dev-text-3xl)', fontWeight: 'var(--dev-font-bold)', marginBottom: 'var(--dev-space-1)' }}>
              {metric.value}
            </div>
            <div style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)' }}>
              {metric.label}
            </div>
          </DevCard>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: 'var(--dev-space-4)',
      }}>
        <DevCard padding="lg">
          <h3 style={{ fontWeight: 'var(--dev-font-semibold)', marginBottom: 'var(--dev-space-4)' }}>
            Completion Trend
          </h3>
          <div 
            style={{ 
              height: 200, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'var(--dev-bg-muted)',
              borderRadius: 'var(--dev-radius-lg)',
              color: 'var(--dev-text-muted)',
              fontSize: 'var(--dev-text-sm)',
            }}
          >
            Chart visualization coming soon...
          </div>
        </DevCard>

        <DevCard padding="lg">
          <h3 style={{ fontWeight: 'var(--dev-font-semibold)', marginBottom: 'var(--dev-space-4)' }}>
            Status Distribution
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dev-space-3)' }}>
            {[
              { label: 'Available', value: 8, total: 23, color: 'var(--dev-status-available)' },
              { label: 'In Progress', value: 10, total: 23, color: 'var(--dev-status-in-progress)' },
              { label: 'Review', value: 5, total: 23, color: 'var(--dev-status-review)' },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--dev-space-1)' }}>
                  <span style={{ fontSize: 'var(--dev-text-sm)' }}>{item.label}</span>
                  <span style={{ fontSize: 'var(--dev-text-sm)', color: 'var(--dev-text-muted)' }}>
                    {item.value}
                  </span>
                </div>
                <div 
                  style={{ 
                    height: 8, 
                    background: 'var(--dev-bg-muted)', 
                    borderRadius: 'var(--dev-radius-full)',
                    overflow: 'hidden',
                  }}
                >
                  <div 
                    style={{ 
                      height: '100%', 
                      width: `${(item.value / item.total) * 100}%`,
                      background: item.color,
                      borderRadius: 'var(--dev-radius-full)',
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </DevCard>
      </div>
    </div>
  )
}
