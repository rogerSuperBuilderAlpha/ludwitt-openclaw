import type { DayOfWeek } from '@/lib/types/university'

export interface FixedClassSession {
  id: string
  day: DayOfWeek
  startTime: string // HH:mm
  endTime: string   // HH:mm
  title: string
}

export const FIXED_CLASS_SESSIONS: FixedClassSession[] = [
  { id: 'tue-am', day: 'tuesday',  startTime: '09:00', endTime: '11:00', title: 'AI Skills Workshop (Morning)' },
  { id: 'tue-pm', day: 'tuesday',  startTime: '13:00', endTime: '15:00', title: 'AI Skills Workshop (Afternoon)' },
  { id: 'thu-am', day: 'thursday', startTime: '09:00', endTime: '11:00', title: 'AI Skills Workshop (Morning)' },
  { id: 'thu-pm', day: 'thursday', startTime: '13:00', endTime: '15:00', title: 'AI Skills Workshop (Afternoon)' },
]

export const DAY_INDEX: Record<DayOfWeek, number> = {
  sunday: 0, monday: 1, tuesday: 2, wednesday: 3,
  thursday: 4, friday: 5, saturday: 6,
}
