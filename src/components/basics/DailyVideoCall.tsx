/**
 * Daily.co Video Call Component
 * Embedded video conferencing for study rooms
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import DailyIframe, { DailyCall } from '@daily-co/daily-js'
import { Video, Loader } from 'lucide-react'
import { logger } from '@/lib/logger'

interface DailyVideoCallProps {
  roomUrl: string
  userName: string
}

export function DailyVideoCall({ roomUrl, userName }: DailyVideoCallProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const callRef = useRef<DailyCall | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!roomUrl || !containerRef.current) return

    const initializeCall = async () => {
      try {
        setLoading(true)
        setError(null)

        // Create Daily call object
        const call = DailyIframe.createFrame(containerRef.current!, {
          iframeStyle: {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            border: '0',
            borderRadius: '12px',
          },
          showLeaveButton: true,
          showFullscreenButton: true,
        })

        callRef.current = call

        // Join the call
        await call.join({
          url: roomUrl,
          userName: userName,
        })

        setLoading(false)
      } catch (err) {
        logger.error('DailyVideoCall', 'Error initializing Daily call', {
          error: err,
        })
        setError('Failed to connect to video call')
        setLoading(false)
      }
    }

    initializeCall()

    // Cleanup on unmount
    return () => {
      if (callRef.current) {
        callRef.current.destroy()
        callRef.current = null
      }
    }
  }, [roomUrl, userName])

  if (error) {
    return (
      <div
        className="w-full h-full rounded-xl flex items-center justify-center"
        style={{ backgroundColor: 'var(--b-logic-dark)' }}
      >
        <div className="text-center text-white">
          <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-b-danger">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="w-full h-full relative rounded-xl overflow-hidden"
      style={{ backgroundColor: 'var(--b-logic-dark)' }}
      role="region"
      aria-label="Study room video call"
    >
      {loading && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ backgroundColor: 'var(--b-logic-dark)' }}
        >
          <div className="text-center text-white">
            <Loader className="w-12 h-12 mx-auto mb-4 animate-spin" />
            <p>Connecting to video call...</p>
          </div>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  )
}
