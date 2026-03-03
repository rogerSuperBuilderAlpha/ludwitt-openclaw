'use client'

import { createContext, useContext, useCallback, useState, ReactNode } from 'react'

interface Notification {
  id: number
  message: string
}

interface NotificationContextType {
  showNotification: (message: string) => void
}

const NotificationContext = createContext<NotificationContextType>({
  showNotification: () => {},
})

export const useNotification = () => useContext(NotificationContext)

let nextId = 0

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const showNotification = useCallback((message: string) => {
    const id = nextId++
    setNotifications(prev => [...prev, { id, message }])
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 4000)
  }, [])

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none"
      >
        {notifications.map(({ id, message }) => (
          <div
            key={id}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg shadow-lg font-medium animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}
