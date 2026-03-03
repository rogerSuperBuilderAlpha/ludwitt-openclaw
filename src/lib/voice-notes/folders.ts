// Folders and Categories system for Voice Notes

export interface Folder {
  id: string
  name: string
  icon: string
  color: string
  userId: string
  recordingIds: string[]
  createdAt: Date
  updatedAt: Date
}

export const DEFAULT_FOLDERS = [
  {
    id: 'all',
    name: 'All Recordings',
    icon: '📁',
    color: 'gray'
  },
  {
    id: 'starred',
    name: 'Starred',
    icon: '⭐',
    color: 'yellow'
  },
  {
    id: 'recent',
    name: 'Recent',
    icon: '🕐',
    color: 'blue'
  }
]

// Create folder in Firestore
export async function createFolder(
  userId: string,
  name: string,
  icon: string = '📁',
  color: string = 'blue',
  token: string
): Promise<string> {
  const response = await fetch('/api/voice-notes/folders/create', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, icon, color })
  })

  if (!response.ok) {
    throw new Error('Failed to create folder')
  }

  const { folderId } = await response.json()
  return folderId
}

// Add recording to folder
export async function addToFolder(
  folderId: string,
  recordingId: string,
  token: string
): Promise<void> {
  const response = await fetch('/api/voice-notes/folders/add-recording', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ folderId, recordingId })
  })

  if (!response.ok) {
    throw new Error('Failed to add to folder')
  }
}

// Remove recording from folder
export async function removeFromFolder(
  folderId: string,
  recordingId: string,
  token: string
): Promise<void> {
  const response = await fetch('/api/voice-notes/folders/remove-recording', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ folderId, recordingId })
  })

  if (!response.ok) {
    throw new Error('Failed to remove from folder')
  }
}

// Get user's folders
export async function getUserFolders(token: string): Promise<Folder[]> {
  const response = await fetch('/api/voice-notes/folders/list', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error('Failed to load folders')
  }

  const { folders } = await response.json()
  return folders
}

// Auto-categorize recording based on content
export function suggestFolder(recording: any): string {
  const content = `${recording.transcript} ${recording.summary} ${recording.tags?.join(' ')}`.toLowerCase()
  
  // Client-related
  if (content.includes('client') || content.includes('customer') || recording.template === 'client-call') {
    return 'client-meetings'
  }
  
  // Team meetings
  if (content.includes('team') || content.includes('standup') || recording.template === 'team-meeting') {
    return 'team-meetings'
  }
  
  // Interviews
  if (content.includes('interview') || content.includes('candidate') || recording.template === 'interview') {
    return 'interviews'
  }
  
  // 1-on-1s
  if (recording.template === 'one-on-one' || content.includes('1-on-1') || content.includes('one on one')) {
    return 'one-on-ones'
  }
  
  // Brainstorming
  if (content.includes('brainstorm') || content.includes('ideas') || recording.template === 'brainstorm') {
    return 'brainstorming'
  }
  
  return 'general'
}

// Folder color options
export const FOLDER_COLORS = [
  { name: 'Gray', value: 'gray', class: 'bg-gray-100 text-gray-700' },
  { name: 'Red', value: 'red', class: 'bg-red-100 text-red-700' },
  { name: 'Blue', value: 'blue', class: 'bg-blue-100 text-blue-700' },
  { name: 'Green', value: 'green', class: 'bg-green-100 text-green-700' },
  { name: 'Yellow', value: 'yellow', class: 'bg-yellow-100 text-yellow-700' },
  { name: 'Purple', value: 'purple', class: 'bg-purple-100 text-purple-700' },
  { name: 'Pink', value: 'pink', class: 'bg-pink-100 text-pink-700' },
  { name: 'Indigo', value: 'indigo', class: 'bg-indigo-100 text-indigo-700' },
]

// Folder icons
export const FOLDER_ICONS = ['📁', '📂', '🗂️', '📊', '💼', '👥', '💡', '🎓', '📝', '⭐', '🎯', '🚀']

