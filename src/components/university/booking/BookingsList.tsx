'use client'

import { CircleNotch, CalendarBlank } from '@phosphor-icons/react'
import { useMyBookings } from '@/lib/hooks/useMyBookings'
import { useCancelBooking } from '@/lib/hooks/useCancelBooking'
import { useDownloadBookingICS } from '@/lib/hooks/useDownloadBookingICS'
import { BookingCard } from './BookingCard'

interface BookingsListProps {
  role: 'student' | 'professor'
}

export function BookingsList({ role }: BookingsListProps) {
  const { bookings, loading, error, refetch } = useMyBookings(role)
  const { cancelBooking, isCancelling } = useCancelBooking()
  const { downloadICS, isDownloadingICS } = useDownloadBookingICS()

  async function handleCancel(bookingId: string) {
    const result = await cancelBooking(bookingId)
    if (result.success) {
      refetch()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <CircleNotch size={24} className="text-gray-400 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <CalendarBlank size={28} weight="duotone" className="text-gray-300 mx-auto mb-2" />
        <p className="text-sm text-gray-500">No upcoming bookings.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-900">
        Upcoming Bookings ({bookings.length})
      </h3>
      {bookings.map(booking => (
        <BookingCard
          key={booking.id}
          booking={booking}
          role={role}
          onCancel={handleCancel}
          isCancelling={isCancelling}
          onDownloadICS={downloadICS}
          isDownloadingICS={isDownloadingICS}
        />
      ))}
    </div>
  )
}
