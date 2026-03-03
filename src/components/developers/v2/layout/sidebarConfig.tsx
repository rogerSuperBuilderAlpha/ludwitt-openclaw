'use client'

import {
  Files,
  FolderOpen,
  Star,
  Queue,
  ChartPieSlice,
  CurrencyCircleDollar,
  TrendUp,
  Lightning,
  Users,
  Trophy,
  Warning,
  ChatCircle,
  Target,
  Timer,
  ClockCountdown,
  CheckSquare,
  Calendar,
  CalendarBlank,
  UsersThree,
  ChartBar,
  Medal,
  Broadcast,
  Bell,
  Pulse,
  ClockCounterClockwise,
  Gear,
  Keyboard,
  PaintBrush,
  UserCircle,
  Sparkle,
  Plugs,
  Download,
} from '@phosphor-icons/react'

export interface SidebarItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
  badge?: number | 'dot'
  isNew?: boolean
}

export interface SidebarSection {
  id: string
  title: string
  items: SidebarItem[]
  collapsible?: boolean
  defaultCollapsed?: boolean
}

export const sidebarSections: SidebarSection[] = [
  {
    id: 'work',
    title: 'Work',
    items: [
      { id: 'profile', label: 'Profile', href: '/developers/profile', icon: <UserCircle weight="duotone" size={18} />, isNew: true },
      { id: 'documents', label: 'Documents', href: '/developers', icon: <Files weight="duotone" size={18} /> },
      { id: 'projects', label: 'Projects', href: '/developers/projects', icon: <FolderOpen weight="duotone" size={18} /> },
      { id: 'starred', label: 'Starred', href: '/developers/starred', icon: <Star weight="duotone" size={18} />, isNew: true },
      { id: 'my-queue', label: 'My Queue', href: '/developers/queue', icon: <Queue weight="duotone" size={18} />, isNew: true },
    ],
  },
  {
    id: 'insights',
    title: 'Insights',
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '/developers/dashboard', icon: <ChartPieSlice weight="duotone" size={18} />, isNew: true },
      { id: 'revenue', label: 'Revenue', href: '/developers/revenue', icon: <CurrencyCircleDollar weight="duotone" size={18} />, isNew: true },
      { id: 'performance', label: 'Performance', href: '/developers/performance', icon: <TrendUp weight="duotone" size={18} />, isNew: true },
      { id: 'velocity', label: 'Velocity', href: '/developers/velocity', icon: <Lightning weight="duotone" size={18} />, isNew: true },
      { id: 'reports', label: 'Reports', href: '/developers/reports', icon: <ChartPieSlice weight="duotone" size={18} />, isNew: true },
    ],
  },
  {
    id: 'customers',
    title: 'Customers',
    items: [
      { id: 'all-customers', label: 'All Customers', href: '/developers/customers', icon: <Users weight="duotone" size={18} />, isNew: true },
      { id: 'top-customers', label: 'Top Customers', href: '/developers/customers/top', icon: <Trophy weight="duotone" size={18} />, isNew: true },
      { id: 'at-risk', label: 'At-Risk', href: '/developers/customers/at-risk', icon: <Warning weight="duotone" size={18} />, isNew: true },
      { id: 'messages', label: 'Messages', href: '/developers/messages', icon: <ChatCircle weight="duotone" size={18} />, isNew: true },
    ],
  },
  {
    id: 'productivity',
    title: 'Productivity',
    collapsible: true,
    items: [
      { id: 'focus', label: 'Focus Mode', href: '/developers/focus', icon: <Target weight="duotone" size={18} />, isNew: true },
      { id: 'time-tracking', label: 'Time Tracking', href: '/developers/time', icon: <Timer weight="duotone" size={18} />, isNew: true },
      { id: 'sessions', label: 'Work Sessions', href: '/developers/sessions', icon: <ClockCountdown weight="duotone" size={18} />, isNew: true },
      { id: 'goals', label: 'Daily Goals', href: '/developers/goals', icon: <CheckSquare weight="duotone" size={18} />, isNew: true },
    ],
  },
  {
    id: 'calendar',
    title: 'Calendar',
    collapsible: true,
    items: [
      { id: 'deadlines', label: 'Deadlines', href: '/developers/deadlines', icon: <Calendar weight="duotone" size={18} />, isNew: true },
      { id: 'schedule', label: 'Schedule', href: '/developers/schedule', icon: <CalendarBlank weight="duotone" size={18} />, isNew: true },
    ],
  },
  {
    id: 'team',
    title: 'Team',
    collapsible: true,
    items: [
      { id: 'team-members', label: 'Team Members', href: '/developers/team', icon: <UsersThree weight="duotone" size={18} /> },
      { id: 'workload', label: 'Workload', href: '/developers/workload', icon: <ChartBar weight="duotone" size={18} />, isNew: true },
      { id: 'leaderboard', label: 'Leaderboard', href: '/developers/leaderboard', icon: <Medal weight="duotone" size={18} />, isNew: true },
      { id: 'achievements', label: 'Achievements', href: '/developers/achievements', icon: <Sparkle weight="duotone" size={18} />, isNew: true },
      { id: 'online', label: "Who's Online", href: '/developers/online', icon: <Broadcast weight="duotone" size={18} />, isNew: true },
    ],
  },
  {
    id: 'activity',
    title: 'Activity',
    collapsible: true,
    items: [
      { id: 'notifications', label: 'Notifications', href: '/developers/notifications', icon: <Bell weight="duotone" size={18} />, badge: 'dot' },
      { id: 'feed', label: 'Activity Feed', href: '/developers/activity', icon: <Pulse weight="duotone" size={18} />, isNew: true },
      { id: 'history', label: 'History', href: '/developers/history', icon: <ClockCounterClockwise weight="duotone" size={18} />, isNew: true },
    ],
  },
  {
    id: 'settings',
    title: 'Settings',
    collapsible: true,
    defaultCollapsed: true,
    items: [
      { id: 'preferences', label: 'Preferences', href: '/developers/settings', icon: <Gear weight="duotone" size={18} /> },
      { id: 'shortcuts', label: 'Shortcuts', href: '/developers/shortcuts', icon: <Keyboard weight="duotone" size={18} />, isNew: true },
      { id: 'appearance', label: 'Appearance', href: '/developers/appearance', icon: <PaintBrush weight="duotone" size={18} />, isNew: true },
      { id: 'integrations', label: 'Integrations', href: '/developers/integrations', icon: <Plugs weight="duotone" size={18} />, isNew: true },
      { id: 'export', label: 'Export Data', href: '/developers/export', icon: <Download weight="duotone" size={18} />, isNew: true },
    ],
  },
]
