'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Calendar,
  Video,
  Users,
  Clock,
  Check,
  X,
  ExternalLink,
  Settings,
} from 'lucide-react'
import {
  CalendarEvent,
  isEventStartingSoon,
  isEventHappening,
  formatAttendees,
} from '@/lib/voice-notes/calendar'
import { auth } from '@/lib/firebase/config'
import { logger } from '@/lib/logger'

interface CalendarIntegrationProps {
  onClose?: () => void
}

export function CalendarIntegration({ onClose }: CalendarIntegrationProps) {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loadingEvents, setLoadingEvents] = useState(false)
  const [calendarEmail, setCalendarEmail] = useState('')

  const loadEvents = useCallback(async () => {
    setLoadingEvents(true)
    try {
      const user = auth.currentUser
      if (!user) return

      const token = await user.getIdToken()
      const response = await fetch('/api/voice-notes/calendar/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ days: 7 }),
      })

      if (response.ok) {
        const { events: calendarEvents } = await response.json()
        setEvents(
          calendarEvents.map((e: any) => ({
            ...e,
            startTime: new Date(e.startTime),
            endTime: new Date(e.endTime),
          }))
        )
      }
    } catch {
      // Failed to load events
    } finally {
      setLoadingEvents(false)
    }
  }, [])

  const checkConnection = useCallback(async () => {
    try {
      const user = auth.currentUser
      if (!user) {
        setLoading(false)
        return
      }

      const token = await user.getIdToken()
      const response = await fetch('/api/voice-notes/calendar/status', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const { connected: isConnected, email } = await response.json()
        setConnected(isConnected)
        if (email) setCalendarEmail(email)

        if (isConnected) {
          await loadEvents()
        }
      } else {
        setConnected(false)
      }
    } catch {
      setConnected(false)
    } finally {
      setLoading(false)
    }
  }, [loadEvents])

  useEffect(() => {
    checkConnection()

    // Also check for success parameter in URL
    const params = new URLSearchParams(window.location.search)
    if (params.get('calendar') === 'connected') {
      // Remove the parameter and recheck
      window.history.replaceState({}, '', window.location.pathname)
      setTimeout(() => checkConnection(), 500)
    }
  }, [checkConnection])

  const handleConnect = async () => {
    try {
      const user = auth.currentUser
      if (!user) return

      const token = await user.getIdToken()
      const response = await fetch('/api/voice-notes/calendar/connect', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const { authUrl } = await response.json()

        // Open in popup instead of redirect
        const width = 500
        const height = 600
        const left = window.screen.width / 2 - width / 2
        const top = window.screen.height / 2 - height / 2

        const popup = window.open(
          authUrl,
          'Google Calendar Authorization',
          `width=${width},height=${height},left=${left},top=${top},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
        )

        // Listen for successful connection
        const checkPopup = setInterval(() => {
          try {
            if (popup?.closed) {
              clearInterval(checkPopup)
              // Popup closed, check if connection succeeded
              setTimeout(() => {
                checkConnection()
              }, 1000)
            }
          } catch {
            // Cross-origin error is expected
          }
        }, 500)

        // Also listen for message from popup
        const handleMessage = (event: MessageEvent) => {
          if (event.data?.type === 'calendar-connected') {
            clearInterval(checkPopup)
            popup?.close()
            checkConnection()
            window.removeEventListener('message', handleMessage)
          }
        }
        window.addEventListener('message', handleMessage)
      }
    } catch (error) {
      logger.error('CalendarIntegration', 'Failed to connect calendar', {
        error,
      })
    }
  }

  const toggleAutoJoin = async (event: CalendarEvent) => {
    try {
      const user = auth.currentUser
      if (!user) return

      const token = await user.getIdToken()
      await fetch('/api/voice-notes/calendar/auto-join', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: event.id,
          enabled: !event.autoRecord,
          meetingLink: event.meetingLink,
          eventTitle: event.title,
        }),
      })

      // Refresh events
      await loadEvents()
    } catch (error) {
      logger.error('CalendarIntegration', 'Failed to toggle auto-join', {
        error,
      })
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading calendar...</p>
      </div>
    )
  }

  if (!connected) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Connect Your Calendar
          </h2>

          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Automatically join and record your Google Meet and Zoom meetings.
            Get AI summaries sent to all attendees after each call.
          </p>

          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">
              What you&apos;ll get:
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                Auto-join Google Meet & Zoom calls
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                Automatic recording & transcription
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                AI summary with action items
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                Email summaries to attendees
              </li>
            </ul>
          </div>

          <button
            onClick={handleConnect}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            <Calendar className="w-5 h-5" />
            Connect Google Calendar
          </button>

          <p className="mt-4 text-xs text-gray-500">
            We&apos;ll only access your calendar to detect meetings. You control
            which meetings get recorded.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header - Connected Status */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-sm p-6 border-2 border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center relative">
              <Calendar className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 border-2 border-white rounded-full">
                <Check className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                Calendar Connected
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Active
                </span>
              </h2>
              <p className="text-sm text-gray-600 mt-0.5">
                {calendarEmail || 'Google Calendar'} • Auto-join enabled
              </p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Upcoming Meetings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Upcoming Meetings ({events.length})
          </h3>
          <button
            onClick={loadEvents}
            disabled={loadingEvents}
            className="text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50"
          >
            {loadingEvents ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p>No upcoming meetings with video links</p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className={`border-2 rounded-lg p-4 transition-all ${
                  isEventHappening(event)
                    ? 'border-green-500 bg-green-50'
                    : isEventStartingSoon(event)
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {event.startTime.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                        {' - '}
                        {event.endTime.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      {event.attendees.length > 0 && (
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.attendees.length}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Auto-join toggle */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={event.autoRecord || false}
                      onChange={() => toggleAutoJoin(event)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Auto-join
                    </span>
                  </label>
                </div>

                {/* Meeting type badge */}
                {event.meetingType && (
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        event.meetingType === 'google-meet'
                          ? 'bg-blue-100 text-blue-700'
                          : event.meetingType === 'zoom'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <Video className="w-3 h-3" />
                      {event.meetingType === 'google-meet'
                        ? 'Google Meet'
                        : event.meetingType === 'zoom'
                          ? 'Zoom'
                          : 'Teams'}
                    </span>

                    {isEventHappening(event) && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                        Live now
                      </span>
                    )}

                    {isEventStartingSoon(event) && !isEventHappening(event) && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        <Clock className="w-3 h-3" />
                        Starting soon
                      </span>
                    )}
                  </div>
                )}

                {/* Attendees */}
                {event.attendees.length > 0 && (
                  <p className="text-xs text-gray-500 mb-2">
                    {formatAttendees(event.attendees)}
                  </p>
                )}

                {/* Meeting link */}
                {event.meetingLink && (
                  <a
                    href={event.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Join meeting
                  </a>
                )}

                {/* Auto-join status */}
                {event.autoRecord && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-600 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      AI bot will automatically join and record this meeting
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 rounded-xl p-4">
        <h4 className="font-semibold text-gray-900 mb-2">How it works:</h4>
        <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
          <li>Enable auto-join for any meeting</li>
          <li>Our AI bot joins the call at the scheduled time</li>
          <li>Meeting is recorded and transcribed</li>
          <li>After the meeting, you get instant AI summary</li>
          <li>Summary can be emailed to all attendees</li>
        </ol>
      </div>
    </div>
  )
}
