'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, X, Clock, AlertCircle, Info } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastMessage {
  id: string
  type: ToastType
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ConfirmationToastProps {
  toasts: ToastMessage[]
  onRemove: (id: string) => void
}

export function ConfirmationToast({
  toasts,
  onRemove,
}: ConfirmationToastProps) {
  useEffect(() => {
    toasts.forEach((toast) => {
      if (toast.duration !== 0) {
        const timer = setTimeout(() => {
          onRemove(toast.id)
        }, toast.duration || 5000)

        return () => clearTimeout(timer)
      }
    })
  }, [toasts, onRemove])

  const getToastConfig = (type: ToastType) => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          iconColor: 'text-green-600',
        }
      case 'error':
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          iconColor: 'text-red-600',
        }
      case 'warning':
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          textColor: 'text-amber-800',
          iconColor: 'text-amber-600',
        }
      case 'info':
        return {
          icon: <Info className="w-5 h-5" />,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          iconColor: 'text-blue-600',
        }
      default:
        return {
          icon: <Info className="w-5 h-5" />,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800',
          iconColor: 'text-gray-600',
        }
    }
  }

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => {
        const config = getToastConfig(toast.type)

        return (
          <div
            key={toast.id}
            className={`max-w-sm w-full ${config.bgColor} border ${config.borderColor} rounded-lg shadow-lg p-4 animate-in slide-in-from-right-full duration-300`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 ${config.iconColor}`}>
                {config.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className={`font-semibold text-sm ${config.textColor}`}>
                  {toast.title}
                </h4>
                <p className={`text-sm mt-1 ${config.textColor} opacity-90`}>
                  {toast.message}
                </p>

                {toast.action && (
                  <button
                    onClick={toast.action.onClick}
                    className={`mt-2 text-xs font-medium ${config.textColor} hover:underline`}
                  >
                    {toast.action.label}
                  </button>
                )}
              </div>

              <button
                onClick={() => onRemove(toast.id)}
                className={`flex-shrink-0 ${config.textColor} opacity-50 hover:opacity-100`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Hook for managing toasts
export function useToasts() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const showSuccess = (
    title: string,
    message: string,
    action?: ToastMessage['action']
  ) => {
    addToast({ type: 'success', title, message, action })
  }

  const showError = (
    title: string,
    message: string,
    action?: ToastMessage['action']
  ) => {
    addToast({ type: 'error', title, message, action })
  }

  const showInfo = (
    title: string,
    message: string,
    action?: ToastMessage['action']
  ) => {
    addToast({ type: 'info', title, message, action })
  }

  const showWarning = (
    title: string,
    message: string,
    action?: ToastMessage['action']
  ) => {
    addToast({ type: 'warning', title, message, action })
  }

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  }
}
