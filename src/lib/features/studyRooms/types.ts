/**
 * Study Rooms - Type Definitions
 */

export interface StudyRoom {
  id: string
  name: string
  creatorId: string
  creatorName: string
  type: 'math_focus' | 'reading_focus' | 'coding_project' | 'mixed'
  maxParticipants: number
  currentParticipants: number
  isPublic: boolean
  status: 'active' | 'ended'
  createdAt: string
  endedAt?: string
}

export interface RoomParticipant {
  userId: string
  userName: string
  userPhotoURL?: string
  joinedAt: string
  status: 'active' | 'idle' | 'away'
  lastActivity: string
  currentActivity?: {
    type: 'solving_math' | 'reading_exercise' | 'coding' | 'break'
    description: string
  }
}

export interface RoomMessage {
  id: string
  roomId: string
  userId: string
  userName: string
  message: string
  type: 'text' | 'celebration' | 'help_request' | 'system'
  timestamp: string
}

export interface RoomActivity {
  id: string
  roomId: string
  userId: string
  userName: string
  type: 'joined' | 'left' | 'solved_problem' | 'level_up' | 'completed_challenge'
  description: string
  timestamp: string
  celebratory: boolean
}

export type RoomType = StudyRoom['type']

export const ROOM_TYPE_INFO: Record<RoomType, { label: string; icon: string; description: string }> = {
  math_focus: {
    label: 'Math Focus',
    icon: '🔢',
    description: 'Work on math problems together',
  },
  reading_focus: {
    label: 'Reading Focus',
    icon: '📚',
    description: 'Practice reading comprehension',
  },
  coding_project: {
    label: 'Coding Project',
    icon: '💻',
    description: 'Build projects and help each other',
  },
  mixed: {
    label: 'Mixed Learning',
    icon: '🎯',
    description: 'Work on anything you want',
  },
}

