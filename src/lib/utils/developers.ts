/**
 * Utility functions for the developers portal.
 * Pure functions — no React, no 'use client'.
 */

/** Convert a Firestore timestamp, Date, or ISO string to a short locale date. */
export function formatDate(dateValue: Date | string | { seconds: number } | null | undefined): string {
  if (!dateValue) return ''

  let date: Date
  if (dateValue instanceof Date) {
    date = dateValue
  } else if (typeof dateValue === 'string') {
    date = new Date(dateValue)
  } else if ('seconds' in dateValue) {
    date = new Date(dateValue.seconds * 1000)
  } else {
    return ''
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date)
}

/** Format a cent-based credit balance as a USD dollar string. */
export function formatCredits(balanceCents: number | undefined): string {
  if (balanceCents === undefined || balanceCents === null) return '-'
  const dollars = balanceCents / 100
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(dollars)
}

/** Return a CSS colour variable string appropriate for a credit balance. */
export function getCreditColor(balanceCents: number | undefined): string {
  if (balanceCents === undefined || balanceCents === null) return 'var(--dev-text-muted)'
  if (balanceCents <= 0) return 'var(--dev-status-error, #ef4444)'
  if (balanceCents < 500) return 'var(--dev-accent-warning, #f59e0b)' // Less than $5
  return 'var(--dev-status-done, #22c55e)'
}
