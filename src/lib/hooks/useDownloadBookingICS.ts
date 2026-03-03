'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { logger } from '@/lib/logger'

export function useDownloadBookingICS() {
  const { user } = useAuth()
  const [isDownloadingICS, setIsDownloadingICS] = useState(false)

  async function downloadICS(bookingId: string) {
    if (!user || isDownloadingICS) return
    setIsDownloadingICS(true)
    try {
      const token = await user.getIdToken()
      const res = await fetch(`/api/university/booking-ics?bookingId=${encodeURIComponent(bookingId)}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Failed to download')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `office-hours-${bookingId}.ics`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      logger.error('Usedownloadbookingics', 'ICS download error', { error: err })
    } finally {
      setIsDownloadingICS(false)
    }
  }

  return { downloadICS, isDownloadingICS }
}
