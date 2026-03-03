import { Inbox, Calendar, LogOut } from 'lucide-react'

type SidebarFooterProps = {
  onOpenInbox: () => void
  onBookMeetingUrl: string
  onLogout: () => void
}

export function SidebarFooter({
  onOpenInbox,
  onBookMeetingUrl,
  onLogout,
}: SidebarFooterProps) {
  return (
    <div className="p-4 border-t border-gray-200 space-y-2">
      <button
        onClick={onOpenInbox}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Inbox className="w-4 h-4" />
        Inbox
      </button>
      <a
        href={onBookMeetingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Calendar className="w-4 h-4" />
        Book Meeting
      </a>
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </div>
  )
}
