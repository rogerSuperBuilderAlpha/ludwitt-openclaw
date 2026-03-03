import { useCallback, useState } from 'react'
import { useCustomerDashboardActions } from '@/lib/hooks/customers/useCustomerDashboardActions'

export function useDocumentMessaging(params?: { setError?: (msg: string) => void }) {
  const setError = params?.setError
  const { sendDocumentMessage } = useCustomerDashboardActions()

  const [messageText, setMessageText] = useState<{ [key: string]: string }>({})
  const [sendingMessageId, setSendingMessageId] = useState<string | null>(null)

  const sendMessage = useCallback(async (documentId: string, customerId: string) => {
    const message = messageText[documentId]?.trim()
    if (!message) return

    setSendingMessageId(documentId)
    try {
      const { ok, data } = await sendDocumentMessage({ documentId, customerId, message })
      if (ok) {
        setMessageText(prev => ({ ...prev, [documentId]: '' }))
      } else {
        const errMsg = data.error || 'Failed to send message'
        setError?.(errMsg)
        throw new Error(errMsg)
      }
    } finally {
      setSendingMessageId(null)
    }
  }, [messageText, sendDocumentMessage, setError])

  return { messageText, setMessageText, sendingMessageId, sendMessage }
}


