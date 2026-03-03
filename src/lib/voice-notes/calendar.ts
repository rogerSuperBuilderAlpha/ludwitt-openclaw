// Calendar Integration for Voice Notes

export interface CalendarEvent {
  id: string
  title: string
  startTime: Date
  endTime: Date
  attendees: string[]
  meetingLink?: string
  meetingType?: 'google-meet' | 'zoom' | 'teams' | 'other'
  description?: string
  location?: string
  recordingId?: string
  autoRecord?: boolean
}

export interface CalendarIntegration {
  userId: string
  provider: 'google' | 'microsoft'
  accessToken: string
  refreshToken: string
  expiresAt: Date
  email: string
  calendarId: string
  autoJoinEnabled: boolean
  autoRecordEnabled: boolean
  createdAt: Date
  updatedAt: Date
}

// Detect meeting type from URL
export function detectMeetingType(url: string): CalendarEvent['meetingType'] {
  if (url.includes('meet.google.com')) return 'google-meet'
  if (url.includes('zoom.us')) return 'zoom'
  if (url.includes('teams.microsoft.com')) return 'teams'
  return 'other'
}

// Extract meeting link from event
export function extractMeetingLink(event: any): string | undefined {
  // Google Calendar format
  if (event.hangoutLink) return event.hangoutLink
  if (event.conferenceData?.entryPoints) {
    const videoEntry = event.conferenceData.entryPoints.find((e: any) => e.entryPointType === 'video')
    if (videoEntry) return videoEntry.uri
  }
  
  // Check description and location for Zoom/Teams links
  const text = `${event.description || ''} ${event.location || ''}`
  
  // Zoom
  const zoomMatch = text.match(/https:\/\/[\w-]+\.zoom\.us\/j\/[\w?&=-]+/)
  if (zoomMatch) return zoomMatch[0]
  
  // Teams
  const teamsMatch = text.match(/https:\/\/teams\.microsoft\.com\/l\/meetup-join\/[\w%?&=-]+/)
  if (teamsMatch) return teamsMatch[0]
  
  // Generic meet link
  const meetMatch = text.match(/https:\/\/meet\.google\.com\/[\w-]+/)
  if (meetMatch) return meetMatch[0]
  
  return undefined
}

// Check if event is happening soon (within next 5 minutes)
export function isEventStartingSoon(event: CalendarEvent): boolean {
  const now = new Date()
  const timeDiff = event.startTime.getTime() - now.getTime()
  const minutesUntil = timeDiff / (1000 * 60)
  
  return minutesUntil > 0 && minutesUntil <= 5
}

// Check if event is currently happening
export function isEventHappening(event: CalendarEvent): boolean {
  const now = new Date()
  return now >= event.startTime && now <= event.endTime
}

// Get upcoming events (next 7 days)
export async function getUpcomingEvents(
  token: string,
  days: number = 7
): Promise<CalendarEvent[]> {
  const response = await fetch('/api/voice-notes/calendar/events', {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'POST',
    body: JSON.stringify({ days })
  })

  if (!response.ok) {
    throw new Error('Failed to fetch calendar events')
  }

  const { events } = await response.json()
  return events.map((e: any) => ({
    ...e,
    startTime: new Date(e.startTime),
    endTime: new Date(e.endTime)
  }))
}

// Enable auto-join for specific event
export async function enableAutoJoin(
  eventId: string,
  token: string
): Promise<void> {
  const response = await fetch('/api/voice-notes/calendar/auto-join', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ eventId, enabled: true })
  })

  if (!response.ok) {
    throw new Error('Failed to enable auto-join')
  }
}

// Format meeting attendees for display
export function formatAttendees(attendees: string[], maxShow: number = 3): string {
  if (attendees.length === 0) return 'No attendees'
  if (attendees.length <= maxShow) {
    return attendees.map(email => email.split('@')[0]).join(', ')
  }
  
  const shown = attendees.slice(0, maxShow).map(email => email.split('@')[0])
  const remaining = attendees.length - maxShow
  return `${shown.join(', ')} +${remaining} more`
}

// Generate meeting title for recording
export function generateRecordingTitle(event: CalendarEvent): string {
  const date = event.startTime.toLocaleDateString()
  const time = event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return `${event.title} - ${date} ${time}`
}

