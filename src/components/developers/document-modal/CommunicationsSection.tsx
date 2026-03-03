'use client'

import { MessageSquare, Send } from 'lucide-react'
import type { DateFormatter } from '@/lib/types/common'
import type { FirestoreTimestamp } from '@/lib/types/timestamp'

interface Communication {
  id: string
  message: string
  sentBy: string
  sentByRole: 'customer' | 'developer' | 'admin'
  sentAt: FirestoreTimestamp
}

interface CommunicationsSectionProps {
  communications?: Communication[]
  assignedTo?: string
  userId?: string | null
  messageText: string
  setMessageText: (s: string) => void
  sendingMessage: boolean
  onSendMessage: () => void
  formatDateTime: DateFormatter
}

export function CommunicationsSection({
  communications,
  assignedTo,
  userId,
  messageText,
  setMessageText,
  sendingMessage,
  onSendMessage,
  formatDateTime,
}: CommunicationsSectionProps) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <MessageSquare className="w-5 h-5" />
        Messages with Customer
      </h3>
      <div className="mb-4 max-h-64 overflow-y-auto space-y-2 bg-gray-50 rounded-lg border border-gray-200 p-4">
        {communications && communications.length > 0 ? (
          communications.map((comm) => (
            <div
              key={comm.id}
              className={`p-3 rounded-lg ${comm.sentByRole === 'developer' ? 'bg-blue-50 ml-8' : 'bg-white mr-8'}`}
            >
              <p className="text-sm text-gray-900 mb-1">{comm.message}</p>
              <p className="text-xs text-gray-500">
                {comm.sentByRole === 'developer' ? 'You' : comm.sentBy} •{' '}
                {formatDateTime(comm.sentAt)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 italic text-center py-4">
            No messages yet
          </p>
        )}
      </div>
      {assignedTo === userId && (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message to the customer..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none mb-3"
          />
          <button
            onClick={onSendMessage}
            disabled={sendingMessage || !messageText.trim()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            {sendingMessage ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
