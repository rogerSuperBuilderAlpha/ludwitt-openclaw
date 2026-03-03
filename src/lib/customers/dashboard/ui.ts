export type PriorityConfig = { label: string; bg: string; text: string; border: string }

export function getPaymentStatusColor(status: string): string {
  switch (status) {
    case 'paid':
      return 'text-green-600'
    case 'partial':
      return 'text-yellow-600'
    case 'pending':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}

export function getPriorityConfig(priority?: string): PriorityConfig | null {
  switch (priority) {
    case 'urgent':
      return { label: 'Urgent', bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' }
    case 'high':
      return { label: 'High', bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' }
    case 'medium':
      return { label: 'Medium', bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' }
    case 'low':
      return { label: 'Low', bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' }
    default:
      return null
  }
}


